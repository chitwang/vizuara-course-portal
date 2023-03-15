import React from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function App() {
  let history = useHistory();
  const params = useParams();
  const courseId = params.id; // replace with the actual course ID
                    console.log(courseId)
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/api/payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_oh9lOH7URWO3MH", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "vizuara",
            description: "Test Transaction",

            order_id: order_id,
            handler: async function (response) {
                try {
                  const paymentId = response.razorpay_payment_id;
                  const orderId = response.razorpay_order_id;
                  const signature = response.razorpay_signature;
        
                  const result = await axios.post(
                    "http://localhost:5000/api/payment/verify",
                    { paymentId, orderId, signature }
                  );
        
                  if (result.data.status === "success") {
                    alert("Payment successful");
                    
                    
                    try {
                      const response = await fetch(
                        `http://localhost:5000/api/auth/add`,
                        {
                          method:'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            "auth-token": localStorage.getItem("token"),
                          },
                          body:JSON.stringify({id:courseId})
                        }
                      );
                      const json = await response.json();
                        alert("Course added successfully");
                        console.log(json.msg)
                        if(json.success){
                          history.push("/details");
                        }
                    } catch (error) {
                      console.error(error);
                      alert("Error adding course to user's list");
                    }
                  } else {
                    alert("Payment failed");
                  }
                } catch (error) {
                  console.error(error);
                  alert("Error");
                }
              },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹1
                </button>
            </header>
        </div>
    );
}

export default App;

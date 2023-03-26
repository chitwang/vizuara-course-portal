// // import React from 'react'
// // import Course from './Course'
// // import CourseData from "./Coursedata";
// // // const fastText = require("fasttext.js");
// // const natural = require('natural');

// // const About = () => {

// //     function searchCourses(query) {
// //         // Load the course data from coursedata.js
// //         const courses = require('./Coursedata');

// //         // Tokenize the search query
// //         const queryTokens = natural.WordTokenizer().tokenize(query);

// //         // Filter the courses based on relevance
// //         const relevantCourses = courses.filter(course => {
// //           // Concatenate all the tags of the course
// //           const tags = course.tags.join(' ');

// //           // Tokenize the tags
// //           const tagTokens = natural.WordTokenizer().tokenize(tags);

// //           // Calculate the Jaccard index between the query tokens and tag tokens
// //           const jaccardIndex = natural.JaroWinklerDistance(queryTokens.join(' '), tagTokens.join(' '));

// //           // Return true if the Jaccard index is greater than 0.7 (i.e., the courses are considered relevant)
// //           return jaccardIndex > 0.7;
// //         });

// //         // Return the relevant courses
// //         return relevantCourses;
// //       }
// //       // Get the search query from the search bar
// // const searchQuery = document.getElementById('search-input').value;

// // // Filter the courses based on the search query
// // const relevantCourses = searchCourses(searchQuery);

// // // Display the relevant courses on the page
// // relevantCourses.forEach(course => {
// //   // Display the course on the page
// //   // ...
// // });

// //     return (
// //         <div>
// //             {!(localStorage.getItem('token')) ? <h2>You are not authorized to access the page. Kindly Login/Signup and try again.</h2> :
// //                 <div>
// //                     <div className="input-group">
// //                         <div className="form-outline">
// //                             <input id="search-input" type="search" className="form-control" />
// //                             <label className="form-label" for="form1">Search</label>
// //                         </div>
// //                         <button id="search-button" type="button" className="btn btn-primary">
// //                             <i className="fas fa-search"></i>
// //                         </button>
// //                     </div>
// //                     {CourseData.map((cour, key) => {
// //                         return <Course id={cour.id} name={cour.name}></Course>
// //                     })}
// //                 </div>
// //             }
// //         </div>
// //     )
// // }

// // export default About



// import React, { useState } from 'react';
// import Course from './Course';
// import CourseData from './Coursedata';
// const natural = require('natural');

// const About = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   function handleSearch(e) {
//     setSearchQuery(e.target.value);
//   }

//   function searchCourses(query) {
//     // Load the course data from coursedata.js
//     const courses = CourseData;

//     // Tokenize the search query
//     const queryTokens = natural.WordTokenizer()?.tokenize(query);

//     // Filter the courses based on relevance
//     const relevantCourses = courses.filter((course) => {
//       // Concatenate all the tags of the course
//       const tags = course.tags.join(' ');

//       // Tokenize the tags
//       const tagTokens = natural.WordTokenizer()?.tokenize(tags);

//       // Calculate the Jaccard index between the query tokens and tag tokens
//       const jaccardIndex = natural.JaroWinklerDistance(
//         queryTokens?.join(' '),
//         tagTokens?.join(' ')
//       );

//       // Return true if the Jaccard index is greater than 0.7 (i.e., the courses are considered relevant)
//       return jaccardIndex > 0.7;
//     });

//     // Return the relevant courses
//     return relevantCourses;
//   }

//   // Filter the courses based on the search query
//   const relevantCourses = searchCourses(searchQuery);
//   console.log(relevantCourses);
//   return (
//     <div>
//       {!localStorage.getItem('token') ? (
//         <h2>
//           You are not authorized to access the page. Kindly Login/Signup and try
//           again.
//         </h2>
//       ) : (
//         <div>
//             <form onSubmit={handleSearch}>
//           <div className="input-group">
//             <div className="form-outline">
//               <input
//                 id="search-input"
//                 type="search"
//                 className="form-control"
//                 value={searchQuery}
//                 onChange={event => setSearchQuery(event.target.value)}
//               />
//               <label className="form-label" htmlFor="search-input">
//                 Search
//               </label>
//             </div>
//             <button id="search-button" type="button" className="btn btn-primary">
//               <i className="fas fa-search"></i>
//             </button>
//             </div>
//           </form>
//           {relevantCourses.map((cour) => {
//             return <Course key={cour.id} id={cour.id} name={cour.name} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default About;



import React, { useState } from 'react';
import Course from './Course';
import CourseData from './Coursedata';
// import Embeddings from './Embeddings';
var stringSimilarity = require("string-similarity");
// require('@tensorflow/tfjs');
// const use = require('@tensorflow-models/universal-sentence-encoder');
// var similarity = require('cosine-similarity');


const About = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleSearch = async () => {
    // const model = await use.load();
    // for (let i = 0; i < courses.length; i++) {
    //   const queryembed = await model.embed(searchQuery);
    //   const queryembedarray = queryembed.arraySync()[0];
    //   const correlationscore = similarity(Embeddings[i], queryembedarray);
    //   if (correlationscore > 0.6) {
    //     relevantCourses.push(courses[i]);
    //   }
    // }
    const searchQuery = document.getElementById('search-input').value;

    const courses = CourseData;
    const relevantCourses = [];
    const map1 = new Map();
    for(let i=0;i<courses.length;i++)
    {
      map1.set(i, stringSimilarity.findBestMatch(searchQuery, courses[i].tags).bestMatch.rating);
    }
    const mapSort1 = new Map([...map1.entries()].sort((a, b) => b[1] - a[1]));
    for(let [id,rating] of mapSort1.entries()){
      if(rating > 0.6 && relevantCourses.length< 5){
        relevantCourses.push(courses[id]);
      }
    }
    setFilteredCourses(relevantCourses);
  };

  return (
    <div>
      {!localStorage.getItem('token') ? (
        <h2>You are not authorized to access the page. Kindly Login/Signup and try again.</h2>
      ) : (
        <div>
          <div className='input-group'>
            <div className='form-outline'>
              <input id='search-input' type='search' className='form-control' />
              <label className='form-label' htmlFor='form1'>
                Search
              </label>
            </div>
            <button id='search-button' type='button' className='btn btn-primary' onClick={handleSearch}>
              <i className='fas fa-search'></i>
            </button>
          </div>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((cour, key) => {
              return <Course key={key} id={cour.id} name={cour.name}></Course>;
            })
          ) : (
            <div>
              <h4>Displaying the list of all courses. Search to filter</h4>
              {CourseData.map((cour, key) => {
                return <Course key={key} id={cour.id} name={cour.name}></Course>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;

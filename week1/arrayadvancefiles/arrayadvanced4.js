//ASSIGNMENT 4: 
//------------
//Movie Streaming Platform

//You are working on a movie recommendation system.

//Test data:
//const movies = [
//  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
//  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
//  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
//  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
//];


//Tasks:
//    1. filter() only "Sci-Fi" movies
//    2. map() to return:
//            "Inception (8.8)"
//
//    3. reduce() to find average movie rating
//    4. find() movie "Joker"
//    5. findIndex() of "Avengers"

const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
    { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
    { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
    { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

//    1. filter() only "Sci-Fi" movies

let result1 = movies.filter(function(element){
    return element.genre==="Sci-Fi" 
})
console.log(result1)

//    2. map() to return:
//            "Inception (8.8)"

let result2 =  movies.map(function(element){
    return element.title==="Inception",element.rating==="(8.8)"

 })
console.log(result2)

//    3. reduce() to find average movie rating

let result3 = movies.reduce((total, element) => total + element.rating,0);
let averagerating = result3 / movies.length;
console.log("Average Movie rating:", averagerating);

//    4. find() movie "Joker"

let result4 = movies.find(function(element){
    return element.title==="Joker"

})
console.log(result4)

//    5. findIndex() of "Avengers"

let result5 = movies.findIndex(function(element){
    return element.title==="Avengers"
})
console.log(result5)
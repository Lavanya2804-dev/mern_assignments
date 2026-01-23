/*MODULE 2: COURSE CATALOG ENGINE
  -> Get published courses
  -> Sort courses by price (high → low)
  -> Extract { title, price } only
  -> Calculate total value of published courses
  -> Add a new course immutably  */

import {courses} from './data.js'

//-> Get published courses
let publishedUsers = courses.filter(user => user.published);
console.log(publishedUsers)

//-> Sort courses by price (high → low)
let pricesort = courses.sort((a,b)=>b.price - a.price);
console.log(pricesort)

//-> Extract { title, price } only
let Coursestitleprice = courses.map(({title ,price} ) => ({ title,price}));
console.log(Coursestitleprice)

//-> Calculate total value of published courses
let totalPublishedValue = courses.reduce(
  (sum, course) => sum + course.price,0);
  console.log(totalPublishedValue)

// -> Add a new course immutably
let newCourse = { id: 104, title: "Python", price: 1199, published: true };
let addCourse = (courses, newCourse) => [courses, newCourse];
let updatedCourses = addCourse(courses, newCourse);
console.log(updatedCourses);


/*MODULE 3: SHOPPING CART ENGINE 
  -> Merge cart with courses to get full course info
  -> Calculate total cart amount
  -> Increase quantity of a course (immutably)
  -> Remove a course from cart
  -> Check if all cart items are paid courses*/

  import {users,courses,cart } from './data.js'
//-> Merge cart with courses to get full course info
  let mergedCart = cart.map(item => {
  let course = courses.find(c => c.id === item.courseId);
  return {...course, qty: item.qty };
});
console.log(mergedCart)

//-> Calculate total cart amount
let totalCartAmount = mergedCart.reduce(
  (total, item) => total + item.price * item.qty,0);
console.log(totalCartAmount)

//-> Increase quantity of a course (immutably)
let increaseQty = (cart, courseId) => cart.map(item => item.courseId === courseId
      ? { ...item, qty: item.qty + 1 }
      : item
  );

// Call the function
let updatedCart = increaseQty(cart, 101);
console.log(updatedCart)

//-> Remove a course from cart
let removeFromCart = (courseId) =>
  cart.filter(item => item.courseId !== courseId);
let Updatedremovedcart = removeFromCart()
console.log(Updatedremovedcart)

//-> Check if all cart items are paid courses
let allPaidCourses = mergedCart.every(item => item.price > 0);
console.log(allPaidCourses)


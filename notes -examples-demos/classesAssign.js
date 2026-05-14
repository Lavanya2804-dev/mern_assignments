//Problem Statement: Library Book Management System
//-------------------------------------------------
//Objective : Create a Book class and use it to manage a collection of books in a library.

//Requirements:
//  Create a Book class with the following:

//  Properties:
//      title (string)
//      author (string)
//      pages (number)
//      isAvailable (boolean, default: true)


//  Methods:
//      borrow() - Marks the book as not available
//      returnBook() - Marks the book as available
//      getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//      isLongBook() - Returns true if pages > 300, false otherwise




// 1. Create at least 5 book objects using the class:
//      Example: "Harry Potter", "1984", "The Hobbit", etc.


//  2. Perform the following operations:

//      i. Display info of all books
//      ii. Borrow 2 books and show their availability status
//      iii. Return 1 book and show updated status
//      iv. Count how many books are "long books" (more than 300 pages)
//      v. List all available books

class book{
    constructor(title,authour,pages,isavailable=true){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isavailable=isavailable;

}
}

borrow(){
    isavailable=false;
}

returnbook(){
    isavailble=true;
}

getinfo(){

}

islongbook(){
    if(pages>300)
        return false
    else
        return true
}

let book1 = new book1("hobbies","henry",300 , true)
let book2 = new book2("the girl","hamsa",400 , true)
let book3 = new book3("the boy","herry",600 , true)
let book4 = new book4("hyderabad","govind",350 , true)
let book5 = new book5("god","narayana",200 , true)

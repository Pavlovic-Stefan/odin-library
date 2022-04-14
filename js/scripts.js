let myLibrary = [];

function Book(title, author, pages, read, leftAt = 0) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.leftAt = leftAt
}
  
function addBookToLibrary(object) {
    // do stuff here
    myLibrary.push(object)
}
let myLibrary = [];

function Book(title, author, pages, read, leftAt = 0, note='') {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = read;
    this.leftAt = leftAt;
    this.note = note;
}
  
function addBookToLibrary(object) {
    // do stuff here
    myLibrary.push(object)
}

const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const numPages = document.querySelector('#pages');
const readingStatus = document.querySelector('#reading-status');
const leftAtPage = document.querySelector('#left-at');
const notes = document.querySelector('#notes');


const submit = document.querySelector('.submit');
submit.addEventListener('click', ()=>{
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = numPages.value;
    let read = readingStatus.value;
    let leftAt = leftAtPage.value;
    let note = notes.value;


    let newBook = new Book(title, author, pages, read, leftAt, note);
    addBookToLibrary(newBook);
})
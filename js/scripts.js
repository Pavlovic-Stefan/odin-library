let myLibrary = [];

function Book(title, author, pages, read, leftAt = 0, note='') {
    // the constructor...
    this.title = title;
    this.author = author;
    this['number of pages'] = pages;
    this['reading status'] = read;
    this['left at'] = leftAt;
    this.notes = note;
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

const middle = document.querySelector('.middle');


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
    createItem()
})

function createItem(){
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    let book = document.createElement('div');
    book.classList.add('book');
    wrapper.appendChild(book);
    for (let [keys, values] of Object.entries(myLibrary.at(-1))){
        if (keys == 'left at' && myLibrary.at(-1)['reading status'] != 'Reading'){
        }else{
            let div = document.createElement('div');
            book.appendChild(div);
            let h4 = document.createElement('h4');
            h4.textContent = keys.toUpperCase();
            div.appendChild(h4);
            if (keys == 'notes'){
                let textArea = document.createElement('textarea');
                textArea.textContent = values;
                div.appendChild(textArea);
            } else {
                let p = document.createElement('p');
                p.textContent = values;
                div.appendChild(p);
            }
        }
    }
    
    console.log(myLibrary.indexOf(myLibrary.at(-1)))

    // create buttons

    let remove = document.createElement('img');
    remove.setAttribute('src', './img/close.png');
    remove.addEventListener('click', () => {
        // removeBook();
        console.log('removeBook')
    })
    let edit = document.createElement('img');
    edit.setAttribute('src', './img/pencil.png');
    edit.addEventListener('click', () => {
        // editBook();
        console.log("editBook")
    })
    let imgDiv = document.createElement('div');
    imgDiv.appendChild(remove)
    imgDiv.appendChild(edit)
    wrapper.appendChild(imgDiv)
        
    middle.appendChild(wrapper);
}
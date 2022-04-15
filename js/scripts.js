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

// clear user input
function clear(){
    bookTitle.value = '';
    bookAuthor.value = '';
    numPages.value = '';
    readingStatus.value = 'Plan to read';
    leftAtPage.value = '';
    notes.value = '';
}

// field validation

bookTitle.addEventListener('change', () => {
    bookTitle.classList.remove('invalid');
});
bookAuthor.addEventListener('change', () => {
    bookAuthor.classList.remove('invalid');
});
numPages.addEventListener('change', () => {
    numPages.classList.remove('invalid');
});

function validate(){
    if (!leftAtPage.disabled){
        if (leftAtPage.value=='' || leftAtPage.value == 0){
            console.log('cancer', leftAtPage.value)
            readingStatus.value = 'Plan to read'
            leftAtTextField.value = '';
            leftAtStatus()
        }
    }
    if (bookTitle.value==''){
        bookTitle.classList.add('invalid')
    }
    if (bookAuthor.value==''){
        bookAuthor.classList.add('invalid')
    }
    if (numPages.value=='' || numPages.value <= 0){
        numPages.classList.add('invalid')
        numPages.value = '';
    }
    if(bookTitle.classList == ('invalid') || bookAuthor.classList == ('invalid') || numPages.classList == ('invalid')){
        return false
    } else {
        return true
    }
}


const add = document.querySelector('.add');
add.addEventListener('click', ()=>{
    if (validate()){
        let title = bookTitle.value;
        let author = bookAuthor.value;
        let pages = numPages.value;
        let read = readingStatus.value;
        let leftAt = leftAtPage.value;
        let note = notes.value;


        let newBook = new Book(title, author, pages, read, leftAt, note);
        addBookToLibrary(newBook);
        createItem()
    }
})

function createItem(){
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    
    let book = document.createElement('div');
    book.classList.add('book');
    wrapper.appendChild(book);

    for (let [keys, values] of Object.entries(myLibrary.at(-1))){
        // if reading status isn't Reading skip Left At section
        if (keys == 'left at' && myLibrary.at(-1)['reading status'] != 'Reading'){
        }else{
            let div = document.createElement('div');
            book.appendChild(div);
            let h4 = document.createElement('h4');
            h4.textContent = keys.toUpperCase();
            div.appendChild(h4);
            if (keys == 'notes'){
                let textArea = document.createElement('textarea');
                textArea.setAttribute('cols', '25');
                textArea.setAttribute('rows', '6');
                textArea.readOnly=true;
                textArea.textContent = values;
                div.appendChild(textArea);
            } else {
                let p = document.createElement('p');
                p.textContent = values;
                div.appendChild(p);
            }
        }
    }

    // create buttons

    let remove = document.createElement('img');
    remove.setAttribute('src', './img/close.png');
    remove.classList.add('remove-button');
    remove.addEventListener('click', () => {
        let wrappers = document.querySelectorAll('.wrapper');
        wrappers.forEach(wrap => {
            if(wrap.getAttribute('data-pos')==remove.getAttribute('data-pos')){
                myLibrary.splice(wrap.getAttribute('data-pos'), 1);
                wrap.remove();
            }
        })
        wrappers = document.querySelectorAll('.wrapper');
        let track = 0;
        wrappers.forEach(wrap => {
            wrap.setAttribute('data-pos', track)
            track++
        })
        track = 0;
        let removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.setAttribute('data-pos', track)
            track++
        })
        track = 0;
        let editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.setAttribute('data-pos', track)
            track++
        })
    })

    let edit = document.createElement('img');
    edit.setAttribute('src', './img/pencil.png');
    edit.classList.add('edit-button');
    edit.addEventListener('click', () => {
        // editBook();
        console.log("editBook")
    })

    let imgDiv = document.createElement('div');
    imgDiv.appendChild(remove)
    imgDiv.appendChild(edit)
    wrapper.appendChild(imgDiv)

    wrapper.setAttribute('data-pos', myLibrary.indexOf(myLibrary.at(-1)));
    remove.setAttribute('data-pos', myLibrary.indexOf(myLibrary.at(-1)));
    edit.setAttribute('data-pos', myLibrary.indexOf(myLibrary.at(-1)));
        
    statistics()

    middle.appendChild(wrapper);
    clear();
    leftAtStatus();
}

// right side of the page / Statistics

const bookFin = document.querySelector('.books-finished')
const bookUnfin = document.querySelector('.books-unfinished')
const bookNotStart = document.querySelector('.books-not-started')
const totPages = document.querySelector('.pages-read-total')
const favAuth = document.querySelector('.favorite-author')
const pageMost = document.querySelector('.most-pages')
const pageLeast = document.querySelector('.least-pages')

function statistics(){
    let finishedBooks=0
    let unfinishedBooks=0
    let notStartedBooks=0
    let totalPagesRead=0
    let favoriteAuthor={}
    let mostPages={}
    let leastPages={}

    myLibrary.forEach(item => {
        if(item['reading status']=='Finished'){
            finishedBooks+=1;
            totalPagesRead+=Number(item['number of pages']);
        }
        if(item['reading status']=='Reading'){
            unfinishedBooks+=1;
            totalPagesRead+=Number(item['left at']);
        }
        if(item['reading status']=='Plan to read'){
            notStartedBooks+=1;
        }

        // Keeps track of how many authors books are added
        if (item.author in favoriteAuthor){
            favoriteAuthor[item.author]+=1;
        } else {
            favoriteAuthor[item.author]=1;
        }

        // Keeps track of which book and made by whom has most pages
        if (item['number of pages'] in mostPages){
            mostPages[item.title + ' by ' + item.author + ': ' + item['number of pages'] + ' pages'] = item['number of pages'];
        } else {
            mostPages[item.title + ' by ' + item.author + ': ' + item['number of pages'] + ' pages'] = item['number of pages'];
        }

        // Keeps track of which book and made by whom has least pages
        leastPages[item.title + ' by ' + item.author + ': ' + item['number of pages'] + ' pages'] = item['number of pages'];
        
    })
    bookFin.textContent = finishedBooks;
    bookUnfin.textContent = unfinishedBooks;
    bookNotStart.textContent = notStartedBooks;
    totPages.textContent = totalPagesRead;
    favAuth.textContent = Object.keys(favoriteAuthor).reduce((a, b) => favoriteAuthor[a] > favoriteAuthor[b] ? a : b);
    pageMost.textContent = Object.keys(mostPages).reduce((a, b) => mostPages[a] > mostPages[b] ? a : b);
    pageLeast.textContent = Object.keys(leastPages).reduce((a, b) => leastPages[a] < leastPages[b] ? a : b);
    console.log(leastPages)
    
}

// Left at field, enable/disable

const readingStatusEvent = document.querySelector('#reading-status')
const leftAtTextField = document.querySelector('#left-at')
function leftAtStatus(){
    leftAtTextField.disabled = true;
    readingStatusEvent.addEventListener('change', (event)=>{
        if (event.target.value != 'Reading'){
            leftAtTextField.value = '';
            leftAtTextField.disabled = true;
        } else {
            leftAtTextField.disabled = false;
        }
    })
}
leftAtStatus()
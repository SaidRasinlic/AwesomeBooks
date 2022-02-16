const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const theForm = document.querySelector('form');
class Book {  
  constructor(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
  }
  addBook(){
   Book.books.push(this);
   localStorage.setItem('bookInfo',JSON.stringify(Book.books));
  }
  removeBook(){
    let removeBookID = parseInt(this.id, 10);
    let listSection = Book.books;
    listSection = listSection.filter((element, index) => {
      return index !== removeBookID;
    });
    Book.books = listSection;
    localStorage.setItem('bookInfo', JSON.stringify(listSection));
    window.location.reload();
  }
}

static displayUI () {
  let bookDIV = '';
  Book.books = JSON.parse(localStorage.getItem('bookInfo'));
  if(Book.books === null){
    Book.books = [];
  }
  Book.books.forEach((item, index) => {
    bookDIV += `<div class="bookDIV">
    <p class='button-info'>"${item.title}" by "${item.author}"</p>
    <button type="button" class="remove-btn" id="${index}">Remove</button>
    </div>`;
  });
  bookList.innerHTML = bookDIV;
}
}
theForm.addEventListener('submit', () => {
const newBook = new Book(bookTitle.value, bookAuthor.value);
newBook.addBook();
});
Book.displayUI();
let removeButton = document.querySelectorAll('.remove-btn');
removeButton.forEach((item) => item.addEventListener('click',function(){
let deleteBook = new Book (bookTitle.value, bookAuthor.value, this.id);
deleteBook.removeBook();
}));
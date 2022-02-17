const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const theForm = document.querySelector('form');
const listBtn = document.querySelectorAll('.listBtn');
const addActive = document.querySelectorAll('.section');
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook() {
    Book.books.push(this);
    localStorage.setItem('bookInfo', JSON.stringify(Book.books));
  }

  removeBook() { 
    const removeBookID = parseInt(this.id, 10);
    let listSection = Book.books;
    listSection = listSection.filter((element, index) => index !== removeBookID);
    Book.books = listSection;
    localStorage.setItem('bookInfo', JSON.stringify(listSection));
    window.location.reload();
  }

  static displayUI() {
    let bookDIV = '';
    Book.books = JSON.parse(localStorage.getItem('bookInfo'));
    if (Book.books === null) {
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
const removeButton = document.querySelectorAll('.remove-btn');
removeButton.forEach((item) => item.addEventListener('click', function () {
  const deleteBook = new Book(bookTitle.value, bookAuthor.value, this.id);
  deleteBook.removeBook();
}));



const timeBox = document.querySelector('#date');

function time() {
  const date = new Date();
  const locale = navigator.language;
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: 'false',
  };
  timeBox.textContent = `${date.toLocaleTimeString(locale, options)}`;
}

setInterval(time, 1000);

listBtn.forEach((btn, i) => {
  btn.onclick = () => {
    listBtn.forEach(oldBtn => {
      oldBtn.classList.remove('active');
    });
    btn.classList.add('active');

    addActive.forEach((sec, index) => {
      if (i === index) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
  };
});
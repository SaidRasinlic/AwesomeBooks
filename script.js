let books;

class UpdateDisplay {
  
  constructor(author, title) {
    this.title = title;
    this.author = author;
  }

  static listSection = document.querySelector('.book-list');

  static bookTitle = document.querySelector('#title');

  static formBtn = document.querySelector('.btn-submit');

  static bookAuthor = document.querySelector('#author');

  static listBtn = document.querySelectorAll('.listBtn');

  static addActive= document.querySelectorAll('.section');

  static addBooks() {
    const bookItem = new UpdateDisplay(
      UpdateDisplay.bookTitle.value,
      UpdateDisplay.bookAuthor.value,
    );

    if(UpdateDisplay.bookTitle.value && UpdateDisplay.bookAuthor.value != '') {
      books.push(bookItem);
      localStorage.setItem('books', JSON.stringify(books));
  
      UpdateDisplay.bookAuthor.value = '';
      UpdateDisplay.bookTitle.value = '';
      UpdateDisplay.addBookItem(bookItem, books.length - 1);
    }
  }

  static delBook(bookItem, pos) {
    const bookBlock = document.getElementById(pos);
    books = books.filter((item) => item !== bookItem);
    localStorage.setItem('books', JSON.stringify(books));
    UpdateDisplay.listSection.removeChild(bookBlock);
  }

  static updateUi() {
    if (localStorage.getItem('books')) {
      books = JSON.parse(localStorage.getItem('books'));
      books.forEach((bookItem, pos) => {
        UpdateDisplay.addBookItem(bookItem, pos);
      });
    } else {
      localStorage.setItem('books', '');
      books = [];
    }
  }

  static addBookItem(bookItem, pos) {
    const bookBlock = document.createElement('div');
    bookBlock.classList.add('bookDIV');
    bookBlock.id = pos;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');

    bookBlock.innerHTML = `
      <p class='book-title'>'${bookItem.author}'  by ${bookItem.title} </p>`;

    removeBtn.innerText = 'Remove';

    removeBtn.onclick = () => {
      UpdateDisplay.delBook(bookItem, pos);
    };

    bookBlock.appendChild(removeBtn);
    UpdateDisplay.listSection.appendChild(bookBlock);
  }
}

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

UpdateDisplay.listBtn.forEach((btn, i) => {
  btn.onclick = () => {
    UpdateDisplay.listBtn.forEach((oldBtn) => {
      oldBtn.classList.remove('active');
    });
    btn.classList.add('active');
    UpdateDisplay.addActive.forEach((sec, index) => {
      if (i === index) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
  };
});

UpdateDisplay.updateUi();
UpdateDisplay.formBtn.addEventListener('click', UpdateDisplay.addBooks);

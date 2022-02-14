let books = [];
const listSection = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const theForm = document.querySelector('form');

function removeBook(bookitem, i) {
  const bookBlock = document.getElementById(i);
  books = books.filter((item) => item !== bookitem);
  localStorage.setItem('bookInfo', JSON.stringify(books));
  listSection.removeChild(bookBlock);
}

function addBookitem(bookitem, i) {
  const bookBlock = document.createElement('div');
  bookBlock.classList.add('bookBlock');
  bookBlock.id = i;

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerText = 'Remove';

  const underLine = document.createElement('hr');

  bookBlock.innerHTML = `<p class="book-title">${bookitem.title}</p>
    <p class="book-Author">${bookitem.author}</p> `;
  bookBlock.appendChild(removeBtn);
  bookBlock.appendChild(underLine);
  listSection.appendChild(bookBlock);

  removeBtn.onclick = () => {
    removeBook(bookitem, i);
  };
}

function addBook(item) {
  books.push({
    title: bookTitle.value,
    author: bookAuthor.value,
  });

  localStorage.setItem('bookInfo', JSON.stringify(books));
  bookTitle.value = '';
  bookAuthor.value = '';
  addBookitem(item, (books.length - 1));
}

function updateUI() {
  if (localStorage.getItem('bookInfo')) {
    books = JSON.parse(localStorage.getItem('bookInfo'));
    books.forEach((bookitem, i) => {
      addBookitem(bookitem, i);
    });
  } else {
    localStorage.setItem('bookInfo', '');
    books = [];
  }
}

updateUI();

theForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook({
    title: bookTitle.value,
    author: bookAuthor.value,
  });
});
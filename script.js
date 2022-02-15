const listSection = document.querySelector('.book-list');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const theForm = document.querySelector('form');

class Books {
  constructor () {
    this.title = title;
    this.author = author;
  }

  save() {
    title = JSON.parse(bookTitle.value);
    author = JSON.parse(bookAuthor.value);
  }

  store() {
    let boolList = [];
    boolList.push([title,author]);
  }

  show () {
    let titleShow = JSON.stringify(title);
    let authorShow = JSON.stringify(author);

    const bookShow = document.createElement('ul');
    bookShow.innerHTML = `
      <li class="bookRow">
        <p>"${titleShow}" by ${authorShow}</p>
        <button id="remove">Remove</button>
      </li>
    `
  }

  remove () {
    boolList = boolList.filter(item => )

  }

}

let book = new Books;

// Add book //
// event listner =>  click on add : book.store; book.show

// Remove a book //
// event listner =>  click on remove : book.remove
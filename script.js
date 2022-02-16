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

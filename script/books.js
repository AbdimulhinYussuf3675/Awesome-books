const BooksId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const booksSection = document.getElementById('store');
const form = document.getElementById('form-id');
const empty = document.getElementById('empty-id');

function displayEmpty() {
  empty.classList.toggle('hide');
}

let store = [];

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    store.push(this);
  };

  removeBook = () => {
    store = store.filter((book) => book.id !== this.id);
  };
}

const addRemoveListener = (book) => {
  document.getElementById(`remove-${book.id}`).addEventListener('click', (e) => {
    e.preventDefault();
    book.removeBook();
    localStorage.setItem('store', JSON.stringify(store));
    if (!store.length) {
      displayEmpty();
    }
    const bookID = document.getElementById(`book-${book.id}`);
    if (bookID.parentNode) {
      bookID.parentNode.removeChild(bookID);
    }
  });
};

const appendBook = (book) => {
  const bookElement = document.createElement('div');
  bookElement.id = `book-${book.id}`;
  bookElement.className = 'book';
  bookElement.innerHTML = `
    <div class="content">
    <p>"${book.title}"</p>
    <p>By ${book.author}</p>
    <button id="remove-${book.id}" class="remove">Remove</button>
    <hr>
    <div/>
    
  `;

  booksSection.appendChild(bookElement);
  if (store.length === 1) {
    displayEmpty();
  }
};

if (localStorage.getItem('store')) {
  const storeData = JSON.parse(localStorage.getItem('store'));
  storeData.forEach((book) => {
    const newBook = new Book(book.id, book.title, book.author);
    store.push(newBook);
    appendBook(newBook);
    addRemoveListener(newBook);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const book = new Book(BooksId(), bookTitle.value, bookAuthor.value);
  book.addBook();
  localStorage.setItem('store', JSON.stringify(store));
  appendBook(book);
  addRemoveListener(book);
  localStorage.removeItem('formData');
  bookAuthor.value = '';
  bookTitle.value = '';
});

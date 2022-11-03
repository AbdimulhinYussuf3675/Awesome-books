const formData = {
  title: '',
  author: '',
};

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

titleInput.addEventListener('input', () => {
  formData.title = titleInput.value;
  localStorage.setItem('formData', JSON.stringify(formData));
});

authorInput.addEventListener('input', () => {
  formData.author = authorInput.value;
  localStorage.setItem('formData', JSON.stringify(formData));
});

if (localStorage.getItem('formData')) {
  const formValue = localStorage.getItem('formData');
  const formValueObj = JSON.parse(formValue);
  titleInput.value = formValueObj.title;
  authorInput.value = formValueObj.author;
}

const bookLink = document.getElementById('library');
const bookStore = document.getElementById('bookStore');
const addBook = document.getElementById('addBook');
const addLink = document.getElementById('addLink');
const contactLink = document.getElementById('contactLink');
const contact = document.getElementById('contact');

bookLink.addEventListener('click', () => {
  bookStore.style.display = 'block';
  addBook.style.display = 'none';
  contact.style.display = 'none';
});

bookStore.addEventListener('click', () => {
  addBook.style.display = 'block';
  contact.style.display = 'none';
  bookStore.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  contact.style.display = 'block';
  bookStore.style.display = 'none';
  addBook.style.display = 'none';
});

addLink.addEventListener('click', () => {
  addBook.style.display = 'block';
  contact.style.display = 'none';
  bookStore.style.display = 'none';
});

const dateAndTime = document.getElementById('dateDisplay');
const timeSet = function () {
  dateAndTime.innerHTML = window.luxon.DateTime.local().toFormat('dd LLL, yyyy | t');
};

timeSet();

setInterval(() => { timeSet(); }, 1000);
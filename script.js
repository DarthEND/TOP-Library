const addBookTitle  = document.getElementById('title');
const addBookAuthor  = document.getElementById('author');
const addBookPages  = document.getElementById('pages');
const addBookReadStatus  = document.getElementById('readStatusModal');
const addBookBtn = document.getElementById('addBookBtn');
const confirmBookEdit = document.getElementById('editBookBtn');
const editBookModal = document.querySelector('.editBookModal');
const editTitle = document.getElementById('editTitle');
const editAuthor = document.getElementById('editAuthor');
const editPages = document.getElementById('editPages');
const editReadStatusModal = document.getElementById('editReadStatusModal');

let currentEditIndex;

// Library array
const myLibrary = [];

// Book constructor
function Book(title, author, pages, readStatus){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Adding book to library
function addBookToLibrary(title, author, pages, readStatus){
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
  displayBooks();
}

// Display book in library
function displayBooks(){
  const bookShelf = document.querySelector('.bookShelf');
  bookShelf.innerHTML = '';
  
  myLibrary.forEach((book, index) => {
      
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.innerHTML = 
    `
    <div class="info">
      <p>Title:</p>
      <h2 class="bookTitle">${book.title}</h2>
      <p>Author:</p>
      <p class="bookAuthor">${book.author}</p>
      <p>Pages:</p>
      <p class="bookPages">${book.pages}</p>
    <div class="bookRead">
      <input type="checkbox" id="checkbox-${index}" ${book.readStatus ? "checked" : ''}>
    </div>
    </div>
    <div class="btn">
      <button 
      class="bookEdit" data-index="${index}">Edit</button>
      <button 
      class="bookDelete" data-index="${index}">Delete</button>
    </div>
    `;
    bookShelf.appendChild(bookCard);

    document.getElementById(`checkbox-${index}`).addEventListener('click', () => changeReadStatus(index));
    bookCard.querySelector('.bookEdit').addEventListener('click', () => editBookBtn(index));
    bookCard.querySelector('.bookDelete').addEventListener('click', () => deleteBookBtn(index));
  })
}

// Modal toggle
function toggleModal(modalName){
  const modal = document.getElementById(modalName);

  if(modal.style.display === 'flex'){
    modal.style.display = 'none';
    formReset();
  }else{
    modal.style.display = 'flex';
    formReset();
  }

}

// Reset the form
function formReset(){
  addBookTitle.value = '';
  addBookAuthor.value = '';
  addBookPages.value = '';
  addBookReadStatus.checked = false;
}

addBookBtn.addEventListener('click', () => {
  
  if(addBookTitle.value === '' ||
      addBookAuthor.value === '' || 
      addBookPages.value === ''){
        alert('Fields are empty! Please fill the fileds.')
      }else{
        addBookToLibrary(addBookTitle.value, addBookAuthor.value, addBookPages.value, addBookReadStatus.checked);
        toggleModal('addBookModal');
        formReset();
      }
})

function deleteBookBtn(index){
  myLibrary.splice(index, 1);
  displayBooks();
}

function changeReadStatus(index){
  myLibrary[index].readStatus = !myLibrary[index].readStatus;
  displayBooks();
}

function editBookBtn(index){
  currentEditIndex = index;

  editTitle.value = myLibrary[index].title;
  editAuthor.value = myLibrary[index].author;
  editPages.value = myLibrary[index].pages;
  editReadStatusModal.checked = myLibrary[index].readStatus;

  toggleModal('editBookModal');
}

confirmBookEdit.addEventListener('click', function(){
  
  if(editTitle.value === '' ||
      editAuthor.value === '' ||
      editPages.value === ''){
      alert('Fields are empty! Please fill the fileds.')
  }else{
  const updateBook = {
   title: editTitle.value,
   author:  editAuthor.value,
   pages: editPages.value,
   readStatus: editReadStatusModal.checked
  }

    myLibrary[currentEditIndex] = updateBook;
    displayBooks();
    toggleModal('editBookModal');
  }
})

// Book's Example
addBookToLibrary(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  "223",
  false);

addBookToLibrary(
  "JavaScript: The Definitive Guide",
  "David Flanagan",
  "667",
  true)
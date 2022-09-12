// keep books tidy


const Library = {
    inventory: [],
    takeStock: function(){
      for (let i = 0; i < this.inventory.length; i++) {
        console.log(this.inventory[i].title);
      }
    }
    
  }
  
// book object constructor  
function Book(title, pages, author = 'unknown', readStatus = 'unread') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus
};
 
// books gotta be in the library, right?
function addBook(title, pages, author) {
  let book = new Book(title,pages, author);
  Library.inventory.push(book);
}

addBook('Lord of the Example', 987, 'Frenso Ulson');



const title = document.querySelector('#form-title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const button = document.querySelector('.addtolibrary');

const booklist = document.querySelector('.example-booklist');
const authorlist = document.querySelector('.author-list');
const pagelist = document.querySelector('.page-list');

function addBookFromLibrary(){
  const table = document.querySelector('.book-info-table');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);

  for (let i = 0; i < Library.inventory.length; i++){
    cell1.innerHTML = Library.inventory[i].title;
    cell2.innerHTML = Library.inventory[i].author;
    cell3.innerHTML = Library.inventory[i].pages;
  }
};

button.addEventListener('click', (event) => {
  addBook(title.value, pages.value, author.value);
  addBookFromLibrary();
  // clear the fields
  title.value = ''; 
  author.value = '';
  pages.value = '';

  // tracking the Library inventory while debugging
for(let i = 0; i < Library.inventory.length; i++) {
  console.log(Library.inventory[i]);
}
})


//addBookFromLibrary();

/*button.addEventListener('click', (event) => {
  const table = document.querySelector('.book-info-table');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);

  cell1.innerHTML = title.value;
  cell2.innerHTML = author.value;
  cell3.innerHTML = pages.value;
})*/

// tracking the Library inventory while debugging
for(let i = 0; i < Library.inventory.length; i++) {
  console.log(Library.inventory[i]);
}
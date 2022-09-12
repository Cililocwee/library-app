// Library object literal, no need for a constructor
const Library = {
    inventory: [],
    takeStock: function(){
      for (let i = 0; i < this.inventory.length; i++) {
        console.log(this.inventory[i].title);
      }
    }
    
  }

// populating the inventory with some dummy books 
addBookToLibrary('The Bible', 'A lot', 'JeSuS', 'read');
addBookToTable();
addBookToLibrary('The Hobbit', 345, 'JRR Tolkien','unread');
addBookToTable();
addBookToLibrary('The Wheel of Time', 766,'Robert Jordan', 'unread');
addBookToTable();
  
// book object constructor, libraries need many books, right?
function Book(title, pages, author, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus
};
 
// books gotta be in the library, right?
function addBookToLibrary(title, pages, author, status) {
  let book = new Book(title,pages,author, status);
  Library.inventory.push(book);
}

// grab the values from the open form
const title = document.querySelector('#form-title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#readStatus');
const button = document.querySelector('.addtolibrary');

// takes a book in the inventory and puts it on the table
function addBookToTable(){
  const table = document.querySelector('.book-info-table');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);

  for (let i = 0; i < Library.inventory.length; i++){
    cell1.innerHTML = Library.inventory[i].title;
    cell2.innerHTML = Library.inventory[i].author;
    cell3.innerHTML = Library.inventory[i].pages;
    cell4.innerHTML = Library.inventory[i].readStatus;
  }
};

// waits to hear a click on the add button
button.addEventListener('click', (event) => {
  addBookToLibrary(title.value, pages.value, author.value, readStatus.value);
  addBookToTable();
  // clear the fields
  title.value = ''; 
  author.value = '';
  pages.value = '';
  readStatus.value = '';

  // tracking the Library inventory while debugging
  for(let i = 0; i < Library.inventory.length; i++) {
    console.log(Library.inventory[i]);
  }
  closeForm();
})

// WIP to remove a book from the table and/or inventory
function removeBook(title){
  for (let i = 0; i < Library.inventory; i++){
    if (Library.inventory[i].title === title){
      Library.inventory.splice(i, 1);
    }
  }
}

//removeBook('The Hobbit');
console.log(Library.inventory)

// for manipulating the input form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
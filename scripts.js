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
addBookToLibrary('The Adventures of Huckleberry Finn', 366, 'Twain, Mark', 'read');
addBookToTable();
addBookToLibrary('The Hobbit', 304, 'Tolkien, JRR','unread');
addBookToTable();
addBookToLibrary('The Wheel of Time', 782,'Jordan, Robert', 'unread');
addBookToTable();
addBookToLibrary('Interview with the Vampire', 371, 'Rice, Anne', 'read');
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
  if (title.value === ''){
    console.log("Error: Must have a title");
    closeForm();
    return;
  }
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

// closes the open pop-up form
const popupForm = document.getElementById("myForm");
const closeButton = document.querySelector('#close-button');

closeButton.addEventListener('click', (event) => {
  closeForm();
});

/*if (popupForm.style.display = "block"){
  document.addEventListener('click', (event) => {
    var isClickInsideElement = popupForm.contains(event.target);
    if (!isClickInsideElement) {
      closeForm();
    } 
  })
}*/

function openForm() {
  popupForm.style.display = "block";
}

function closeForm() {
  popupForm.style.display = "none";
}

// WIP to remove a book from the table and/or inventory
function removeBook(title){
  for (let i = 0; i < Library.inventory; i++){
    if (Library.inventory[i].title === title){
      Library.inventory.splice(i, 1);
    }
  }
}

//removeBook('The Hobbit'); **DEBUG
console.log(Library.inventory)

// sorting by headers (only title and author)
const titleAnchor = document.querySelector('#title-anchor');
titleAnchor.addEventListener('click', (event) => {
  sortTable(0);
})

const authorAnchor = document.querySelector('#author-anchor');
authorAnchor.addEventListener('click', (event) =>{
  sortTable(1);
})

// continuous sorting via W3
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("book-info-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
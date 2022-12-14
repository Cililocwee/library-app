// Library object literal, no need for a constructor
const Library = {
  inventory: [],
  takeStock: function () {
    for (let i = 0; i < this.inventory.length; i++) {
      console.log(this.inventory[i].title);
    }
    },
  removeBook: function(title) {
    for (let i = 0; i < Library.inventory.length; i++) {
      if (Library.inventory[i].title === title){
        console.log(`Removing ${title}...`);
        Library.inventory.splice(i,1);
        console.log(`${title} removed from Library.inventory`)
        }
      }
    }
}

// populating the inventory with some dummy books 
// input on pages is out of intuitive order due to development of system
// needs to be optomized later (Title, Author, Pages, Status)
addBookToLibrary('The Adventures of Huckleberry Finn', 366, 'Twain, Mark', 'read');
addBookToTable();
addBookToLibrary('The Hobbit', 304, 'Tolkien, JRR', 'unread');
addBookToTable();
addBookToLibrary('The Wheel of Time', 782, 'Jordan, Robert', 'unread');
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
  let book = new Book(title, pages, author, status);
  Library.inventory.push(book);
}

// grab the values from the open form
const title = document.querySelector('#form-title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#readStatus');
const button = document.querySelector('.addtolibrary');

// takes a book in the inventory and puts it on the table
function addBookToTable() {
  const table = document.querySelector('.book-info-table');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);


  // Constructs the cells dynamically
  for (let i = 0; i < Library.inventory.length; i++) {
    cell1.innerHTML = Library.inventory[i].title;
    cell1.classList.add('book-title-cell');
    cell2.innerHTML = Library.inventory[i].author;
    cell3.innerHTML = Library.inventory[i].pages;
    cell4.innerHTML = Library.inventory[i].readStatus;
    switch (Library.inventory[i].readStatus){
      case 'read':
        cell4.innerHTML = `<select class="read-status-select">
        <option value="read" selected>read</option>
        <option value="in-progress">in progress</option>
        <option value="unread">unread</option>`;
        break;
      case 'in progress':
        cell4.innerHTML = `<select class="read-status-select">
        <option value="read">read</option>
        <option value="in-progress" selected>in progress</option>
        <option value="unread">unread</option>`
        break;
      case 'unread':
        cell4.innerHTML = `<select class="read-status-select">
        <option value="read">read</option>
        <option value="in-progress">in progress</option>
        <option value="unread" selected>unread</option>`
        break;
      default:
        cell4.innerHTML = `<select class="read-status-select">
                      <option value="read">read</option>
                      <option value="in-progress">in progress</option>
                      <option value="unread">unread</option>`
    }
    cell4.classList.add('book-read-status-cell');
    cell5.innerHTML = '<button class="removal-button">Remove</button>';
  }

  // Adds remove functionality to remove button 
  // Removes row from the DOM and Book from Library.inventory
  const removeButtonList = document.querySelectorAll('.removal-button');  
  removeButtonList.forEach(item => {
    table.lastChild.lastChild.lastChild.lastChild.onclick = function () {
      if(confirm("Are you sure?")){
        Library.removeBook(item.parentNode.parentNode.firstChild.textContent);
        item.parentNode.parentNode.remove();
      }
    };
  })
};

// simulate add
function addData() {
 if(title.value === '') {
  closeForm();
  return;
 }
 addBookToLibrary(title.value, pages.value, author.value, displayRadioValue());
 addBookToTable();
 clearAllFields();
 closeForm();
}

// clear fields
function clearAllFields() {
  title.value = '';
  author.value = '';
  pages.value = '';
}

// waits to hear a click on the ADD button
button.addEventListener('click', (event) => {
  addData();
  clearAllFields();
})

// Adds ENTER functionality in form
const input = document.querySelectorAll('input');

input.forEach(item => {
  item.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addData();
    }
  })

// closes form on escape
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeForm();
    }
  })
});

// closes the open pop-up form
const popupForm = document.getElementById("myForm");
const closeButton = document.querySelector('#close-button');

closeButton.addEventListener('click', (event) => {
  closeForm();
});

// opening and closing the form using display
function openForm() {
  popupForm.style.display = "block";
}

function closeForm() {
  popupForm.style.display = "none";
}

// sort by title
const titleAnchor = document.querySelector('#title-anchor');
titleAnchor.addEventListener('click', (event) => {
  sortTable(0);
})

// sort by author
const authorAnchor = document.querySelector('#author-anchor');
authorAnchor.addEventListener('click', (event) => {
  sortTable(1);
})

// main sort function (via W3)
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
      switchcount++;
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

// get value from radio buttons
function displayRadioValue() {
  var radioButtonGroup = document.getElementsByName('optradio');
  var checkedRadio = Array.from(radioButtonGroup).find((radio) => radio.checked);
  return checkedRadio.value;
}


// form validation

const titleInput = document.getElementById('form-title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');

const newBookForm = document.getElementById('new-book-entry');

newBookForm.addEventListener('submit', (event)=>{
  if (titleInput.value.length < 5) {
    event.preventDefault();
  }
})


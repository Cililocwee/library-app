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


//alert function for testing


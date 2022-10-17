// this is the beignning of pulling this app apart. However, as it's unbundled
// I'm running into import problems. TBF in a future update.

const BookFactory = (() => {
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
            switch (Library.inventory[i].readStatus) {
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
                if (confirm("Are you sure?")) {
                    Library.removeBook(item.parentNode.parentNode.firstChild.textContent);
                    item.parentNode.parentNode.remove();
                }
            };
        })
    };


    return { addBookToTable }
})();


export default BookFactory
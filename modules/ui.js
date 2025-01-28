import { Storage } from './storage.js';

export class UI {
    static displayBooks() {
        const books = Storage.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list tbody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="actions">
                <button class="edit" data-isbn="${book.isbn}">Edit</button>
                <button class="delete" data-isbn="${book.isbn}">Delete</button>
            </td>
        `;

        list.appendChild(row);
    }

    static deleteBook(target) {
        target.closest('tr').remove();
    }

    static editBook(target) {
        const row = target.closest('tr');
        const title = row.children[0].textContent;
        const author = row.children[1].textContent;
        const isbn = row.children[2].textContent;
        
        // Setting the update and cancel update buttons
        let updateButton = row.children[3].children[0];
        updateButton.innerHTML = "Update";
        updateButton.classList.remove("edit");
        updateButton.classList.add("update");
        
        let cancelButton = row.children[3].children[1];
        cancelButton.innerHTML = "Cancel";
        cancelButton.classList.remove("delete");
        cancelButton.classList.add("cancel");


        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('isbn').value = isbn;
    }

    static resetButtons(target) {
        const row = target.closest('tr');
        
        let updateButton = row.children[3].children[0];
        updateButton.innerHTML = "Edit";
        updateButton.classList.add("edit");
        updateButton.classList.remove("update");
        
        let cancelButton = row.children[3].children[1];
        cancelButton.innerHTML = "Delete";
        cancelButton.classList.add("delete");
        cancelButton.classList.remove("cancel");
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// app.js
import { Storage } from './modules/storage.js';
import { UI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') {
        alert('Please fill in all fields');
        return;
    }

    // Check unique isbn
    const existingIsbn = Storage.getBooks().filter((book) => isbn == book.isbn);

    if(existingIsbn) {
        alert("Please enter unique ISBN");
        UI.clearFields();
        return;
    }

    const book = { title, author, isbn };

    UI.addBookToList(book);
    Storage.addBook(book);
    UI.clearFields();
});

document.getElementById('book-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const isbn = e.target.dataset.isbn;
        UI.deleteBook(e.target);
        Storage.removeBook(isbn);
    } else if (e.target.classList.contains('edit')) {
        UI.editBook(e.target);
    }
    else if (e.target.classList.contains('update')) {
        // Storage.updateBook();
    }
    else {
        UI.clearFields();
        UI.resetButtons(e.target);
    }
});

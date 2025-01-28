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

    if(existingIsbn.length) {
        alert("Please enter unique ISBN");
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
        UI.disableButtons();
    }
    else if (e.target.classList.contains('update')) {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = e.target.dataset.isbn;

        if (title === '' || author === '') {
            alert('Please fill in all fields');
            return;
        }
        
        Storage.updateBook(title, author, isbn);
        UI.updateBook(e.target, title, author);
    }
    else {
        UI.clearFields();
        UI.enableButtons();
        UI.resetButtons(e.target);
    }
});

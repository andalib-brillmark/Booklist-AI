export class Storage {
    static getBooks() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();
        const filteredBooks = books.filter(book => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
    }

    // Index of book and the book to be updated
    static updateBook(ind, book) {
        const books = Storage.getBooks();
        books[ind] = book;
        localStorage.setItem('books', JSON.stringify(books));
    }
}

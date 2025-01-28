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
    static updateBook(title, author, isbn) {
        const books = Storage.getBooks();
        const updatedBook = books.filter(book => book.isbn == isbn);
        updatedBook[0].title = title;
        updatedBook[0].author = author;

        const ind = books.findIndex(book => book.isbn == isbn);
        books[ind] = updatedBook[0];
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

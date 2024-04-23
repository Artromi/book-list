const bookContainer = document.getElementById("book-container");
const btnAllBooks = document.getElementById("btn-all-books");
const btnFavoriteBooks = document.getElementById("btn-favorites-books");
const urlApi = "http://localhost:4730/books?_limit=6";
//#### state ####
let state = {
  books: [],
};
//#### initial render ####
getBooksFromApi();
//#### functions ####
function getBooksFromApi() {
  fetch(urlApi)
    .then((response) => response.json())
    .then((books) => {
      state.books = books;
      loadBooks();
    })
    .catch((error) => alert.apply(error));
}
//
function loadBooks() {
  for (const book of state.books) {
    const singleBook = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookLink = document.createElement("a");
    const bookAuthor = document.createElement("p");
    const btn = document.createElement("button");
    //
    singleBook.setAttribute("id", "single-book");
    bookLink.textContent = book.title;
    bookLink.setAttribute(
      "href",
      "http://127.0.0.1:5500/detail/?id=" + book.id
    );
    // bookLink.addEventListener("click", function (e) {
    //   e.preventDefault();
    //   console.log("this worked!");
    // });
    bookAuthor.textContent = "von: " + book.author;
    btn.textContent = "Favorisieren";
    bookTitle.appendChild(bookLink);
    singleBook.append(bookTitle, bookAuthor, btn);
    bookContainer.append(singleBook);
  }
}
// let param = new URL(document.location).searchParams;
// params.get("id");

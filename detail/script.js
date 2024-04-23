const param = new URL(document.location).searchParams;
const id = param.get("id");
const bookContainer = document.getElementById("book-container");
const urlApi = "http://localhost:4730/books/";
const btnAllBooks = document.getElementById("btn-all-books");
// state
let singleBook = {};
// initial call
getBookFromApi();
// functions
function getBookFromApi() {
  fetch(urlApi + id)
    .then((response) => response.json())
    .then((book) => {
      singleBook = book;
      loadBook();
      console.log(singleBook);
    })
    .catch((error) => alert.apply(error));
}

function loadBook() {
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookISBN = document.createElement("p");
  const bookAbstract = document.createElement("p");
  const bookCover = document.createElement("img");
  const textContainer = document.createElement("div");
  bookCover.setAttribute("src", singleBook.cover);
  textContainer.setAttribute("id", "book-description");
  bookAuthor.setAttribute("class", "details");
  bookISBN.setAttribute("class", "details");
  bookTitle.textContent = singleBook.title;
  bookAuthor.textContent = singleBook.author;
  bookISBN.textContent = "ISBN: " + singleBook.isbn;
  bookAbstract.textContent = singleBook.abstract;
  // append
  textContainer.append(bookTitle, bookAuthor, bookISBN, bookAbstract);
  bookContainer.append(bookCover, textContainer);
}
// eventListener
btnAllBooks.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/";
});

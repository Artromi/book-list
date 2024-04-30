const bookContainer = document.getElementById("book-container");
const btnAllBooks = document.getElementById("btn-all-books");
const btnFavorites = document.getElementById("btn-favorites");
const url = "http://localhost:4730/books?_limit=6";
//#### state ####
let state = {
  books: [],
};
//#### initial render ####
getBooksFromApi();

//#### functions ####
function getBooksFromApi() {
  fetch(url)
    .then((response) => response.json())
    .then((books) => {
      state.books = books;
      loadBooks();
    })
    .catch((error) => alert(error));
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
      "http://127.0.0.1:5500/detail/book.html?id=" + book.id
    );

    bookAuthor.textContent = "von: " + book.author;
    if (book.isFav == true) {
      btn.textContent = "favorisiert";
    } else {
      btn.textContent = "favorisieren";
    }

    btn.setAttribute("class", "btn-fav");
    if (book.isFav == true) {
      btn.classList.add("favorite");
    }
    btn.addEventListener("click", () => {
      btn.classList.toggle("favorite");
      // send patch request to add key:value for favorite / isFav: true
      if (book.isFav == false) {
        fetch("http://localhost:4730/books/" + book.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ isFav: true }),
        })
          .then(() => {
            bookContainer.innerHTML = "";
            getBooksFromApi();
            console.log(book);
          })
          .catch((error) => window.alert(error));
      } else {
        fetch("http://localhost:4730/books/" + book.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ isFav: false }),
        })
          .then(() => {
            bookContainer.innerHTML = "";
            getBooksFromApi();
            console.log(book);
          })
          .catch((error) => window.alert(error));
      }
    });
    bookTitle.appendChild(bookLink);
    singleBook.append(bookTitle, bookAuthor, btn);
    bookContainer.append(singleBook);
  }
}
// eventListener
btnFavorites.addEventListener("click", () => {
  console.log("klick");
  window.location.href = "http://127.0.0.1:5500/Favoriten/favorites.html";
});

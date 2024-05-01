const btnAllBooks = document.getElementById("btn-all-books");
btnAllBooks.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/";
});
const main = document.querySelector("main");
const url = "http://localhost:4730/books?_limit=6";
//#### state ####
const state = {
  books: [],
};
//#### initial call ####
getBooksFromApi();
//#### functions ####
function getBooksFromApi() {
  fetch(url)
    .then((response) => response.json())
    .then((items) => {
      state.books = items;
      loadBooks();
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
}

function loadBooks() {
  main.innerHTML = "";
  for (const book of state.books.filter(
    (book) => book.isFav && book.isFav === true
  )) {
    const bookContainer = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
    const btn = document.createElement("button");
    //
    bookContainer.setAttribute("id", "single-book");
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    if (book.isFav == true) {
      btn.textContent = "favorisiert";
      btn.classList.add("favorite");
    } else {
      btn.textContent = "favorisieren";
    }
    btn.setAttribute("class", "btn-fav");

    btn.addEventListener("click", () => {
      book.isFav = !book.isFav;
      handleFavState(book);
    });
    bookContainer.append(bookTitle, bookAuthor, btn);
    main.append(bookContainer);
  }
}

function handleFavState(book) {
  fetch("http://localhost:4730/books/" + book.id, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ isFav: book.isFav }),
  })
    .then(() => {
      getBooksFromApi();
      console.log(book);
    })
    .catch((error) => window.alert(error));
}

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

const addButton = document.querySelector(".btn-add-book");
const dialog = document.querySelector("dialog");
const closedButton = document.querySelector(".btn-close-dialog");
const addBook = document.querySelector(".dialog-add-book");
const form = document.querySelector("form");
const bookContain = document.querySelector(".books-contain");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector('input[name="read"]:checked');

  addBookToLibrary(title.value, author.value, pages.value, read.value);
  renderBooks();
  dialog.close();
  form.reset();
});

addButton.addEventListener("click", () => {
  dialog.showModal();
});

closedButton.addEventListener("click", () => {
  dialog.close();
});

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.id = book.id;
  const title = document.createElement("h2");
  title.textContent = book.title;
  card.append(title);
  const author = document.createElement("p");
  author.textContent = book.author;
  card.append(author);
  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  card.append(pages);
  const readStatusButton = document.createElement("button");
  readStatusButton.classList.add("btn-status");

  if (book.read === "Read") {
    readStatusButton.classList.add("read");
  } else {
    readStatusButton.classList.add("unread");
  }

  readStatusButton.textContent = book.read;
  card.append(readStatusButton);

  readStatusButton.addEventListener("click", () => {
    if (book.read === "Read") {
      book.read = "Unread";
      readStatusButton.classList.remove("read");
      readStatusButton.classList.add("unread");
    } else {
      book.read = "Read";
      readStatusButton.classList.remove("unread");
      readStatusButton.classList.add("read");
    }

    renderBooks();
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("btn-remove");
  card.append(removeButton);

  removeButton.addEventListener("click", () => {
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    renderBooks();
  });

  return card;
}

function renderBooks() {
  bookContain.textContent = "";

  for (const book of myLibrary) {
    const card = createBookCard(book);
    bookContain.append(card);
  }
}

addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1200, "Read");
addBookToLibrary("1984", "George Orwell", 328, "Unread");
addBookToLibrary("Dune", "Frank Herbert", 500, "Read");

renderBooks();

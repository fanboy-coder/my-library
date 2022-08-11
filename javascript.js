let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let hobbit = new Book("The Hobbit", "JRR Tolkien", 310, "Read");
let silmarillion = new Book("The Silmarillion", "JRR Tolkien", 365, "Read");
let lotr = new Book("The Lord of the Rings", "JRR Tolkien", 1000, "Read");

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    clear();
    display();
}

function removeBookFromLibrary(remove) {
    myLibrary.splice(remove, 1);
    clear();
    display();
}

function display() {
    for (let i = 0; i < myLibrary.length; i++) {
        const container = document.getElementById("library");
        let tr = document.createElement("tr");
        tr.setAttribute("class", "new-row");
        container.appendChild(tr);
        let td = tr.appendChild(document.createElement("td"));
        let btn = td.appendChild(document.createElement("button"));
        btn.innerText = "X";
        btn.setAttribute("id", [i]);
        btn.setAttribute("class", "delete-button");
        btn.addEventListener("click", () => {
            let remove = btn.id;
            removeBookFromLibrary(remove);
        })
        for (let elem in myLibrary[i]) {
            let td = tr.appendChild(document.createElement("td"));
            td.setAttribute("class", [elem]);
            if ([elem] == "author" || [elem] == "title" || [elem] == "pages") {
                td.innerHTML = myLibrary[i][elem];
            }
            else {
                let btn = td.appendChild(document.createElement("button"));
                btn.innerText = myLibrary[i][elem];
                if (myLibrary[i]["read"] === "Read") {
                    btn.setAttribute("class", "green");
                }
                else {
                    btn.setAttribute("class", "red");
                };
                btn.addEventListener("click", () => {
                    if (myLibrary[i]["read"] === "Read") {
                        myLibrary[i]["read"] = "Unread";
                    }
                    else {
                        myLibrary[i]["read"] = "Read";
                    }
                    clear();
                    display();
                })
            }
        }
    }
}

function clear() {
    const rows = document.querySelectorAll(".new-row");
    rows.forEach(row => {
        row.remove();
    })
}

window.onload = function () {
    myLibrary.push(hobbit, silmarillion, lotr);
    display();
    const submit = document.querySelector("#submit");
    submit.addEventListener("click", () => {
        let title = document.getElementById("ftitle").value;
        let author = document.getElementById("fauthor").value;
        let pages = document.getElementById("fpages").value;
        let read = document.querySelector("input[name=radio]:checked").value;
        if (title != "" && author != "" && pages != "") {
            addBookToLibrary(title, author, pages, read);
        }
        const inputs = document.querySelectorAll("#ftitle, #fauthor, #fpages");
        inputs.forEach(input => {
            input.value = "";
        });
        document.getElementById("read").checked = false;
        document.getElementById("not-read").checked = false;
    })
}
import { TODO } from "./util.js";

export class Terminal {
  constructor(element) {
    this.element = element;
    this.element.classList.add("terminal");
    this.newLine();
  }

  currentLine() {
    return this.element.lastChild;
  }

  newLine() {
    const line = document.createElement("p");
    this.element.appendChild(line);
  }

  print(message) {
    this.currentLine().textContent += message;
  }

  println(message) {
    this.currentLine().textContent += message;
    this.newLine();
  }

  readLine() {
    return new Promise((resolve) => {
      let input = this.currentLine().appendChild(
        document.createElement("input"),
      );
      input.focus();
      new Promise((resolve) => {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            input.disabled = true;
            resolve(input.value);
          }
        });
      }).then((inputText) => {
        this.newLine();
        resolve(inputText);
      });
    });
  }
}

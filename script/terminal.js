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
    const [first, ...rest] = message.split("\n");
    this._print(first);
    if (rest.length > 0) {
      for (const msg of rest) {
        this.newLine();
        this._print(msg);
      }
    }
  }

  _print(message) {
    const messageElem = document.createElement("span");
    this.currentLine().appendChild(messageElem);
    messageElem.textContent += message;
  }

  println(message) {
    this.print(message);
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
          input.style.width = "auto";
          input.style.width = `${input.scrollWidth + 10}px`;
          if (event.key === "Enter") {
            event.preventDefault();
            input.disabled = true;
            scrollY = 0;
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

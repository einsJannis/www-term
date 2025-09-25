export class Shell {
  constructor(terminal) {
    this.shouldExit = false;
    this.terminal = terminal;
    this.path = "/home/einsjannis/";
    this.user = "guest";
  }

  async run() {
    while (!this.shouldExit) {
      this.terminal.print(this.user + "@website:" + this.path + "> ");
      const input = await this.terminal.readLine();
      this.parseCommand(input);
    }
  }

  parseCommand(input) {
    const [command, ...args] = input.split(" ");
    switch (command) {
      case "cd":
        this.cd(args[0]);
        break;
      case "exit":
        this.exit();
        break;
      default:
        this.terminal.println("Unknown command");
    }
  }

  cd(path) {
    function is_absolute(path) {
      return path.startsWith("/");
    }

    function simplify(path) {
      const parts = path.split("/");
      const stack = [];

      for (const part of parts) {
        if (part === "..") {
          stack.pop();
        } else if (part !== "." && part !== "") {
          stack.push(part);
        }
      }

      return "/" + stack.join("/");
    }

    if (is_absolute(path)) {
      this.path = path;
    } else {
      this.path = this.path + "/" + path;
      this.path = simplify(this.path);
    }
  }

  exit() {
    this.shouldExit = true;
  }
}

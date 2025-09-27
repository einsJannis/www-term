import { commands, parseParts } from "./command.js";

export class Shell {
  constructor(terminal, root, currentDirectory) {
    this.shouldExit = false;
    this.terminal = terminal;
    this.user = "guest";
    this.root = root;
    this.currentDirectory = currentDirectory;
  }

  async run() {
    while (!this.shouldExit) {
      this.terminal.print(
        this.user + "@website:" + this.currentDirectory.getPath() + "> ",
      );
      const input = await this.terminal.readLine();
      this.runCommand(parseParts(input));
    }
  }

  runCommand(args) {
    const command = args[0];
    switch (command) {
      case "su":
        this.su(args[1]);
        break;
      case "cd":
        if (args.length != 2) {
          this.terminal.println("Usage: cd <directory>");
          return;
        }
        this.cd(args[1]);
        break;
      case "exit":
        this.exit();
        break;
      default:
        commands[command]
          ? commands[command](this.terminal, this.currentDirectory, args)
          : this.terminal.println("Unknown command");
    }
  }

  su(user) {
    this.user = user;
  }

  cd(path) {
    if (path.length === 0) return;
    if (path.startsWith("/")) {
      this.currentDirectory = this.root;
      cd(path.substring(1));
      return;
    }
    const [current, ...rest] = path.split("/");
    switch (current) {
      case "..":
        if (!this.currentDirectory.parent) {
          this.terminal.println("cd: cannot go up from root");
          return;
        }
        this.currentDirectory = this.currentDirectory.parent;
        break;
      case ".":
        break;
      default:
        const next = this.currentDirectory.getChild(current);
        if (!next) {
          this.terminal.println("cd: directory not found");
          return;
        }
        this.currentDirectory = next;
    }
    this.cd(rest.join("/"));
  }

  exit() {
    this.terminal.println("[Connection closed]");
    this.shouldExit = true;
  }
}

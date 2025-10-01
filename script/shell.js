import { commands, parseParts } from "./command.js";
import { root } from "./filesystem.js";

export class Shell {
  constructor(terminal, currentDirectory) {
    this.shouldExit = false;
    this.terminal = terminal;
    this.user = "guest";
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
    const next = this.currentDirectory.navigate(path);
    if (!next) {
      this.terminal.println("cd: invalid path");
      return;
    }
    this.currentDirectory = next;
  }

  exit() {
    this.terminal.println("[Connection closed]");
    this.shouldExit = true;
  }
}

export function createRoot() {
  return new Directory(null);
}

export class INode {
  parent = null;
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  getPath() {
    if (!this.parent) return "/";
    if (!this.parent.parent) return `/${this.name}`;
    return `${this.parent.getPath()}/${this.name}`;
  }
}

export class Directory extends INode {
  constructor(name) {
    super(name, "Directory");
    this.children = [];
  }
  addChild(child) {
    child.parent = this;
    this.children.push(child);
    this.children.sort((a, b) => a.name.localeCompare(b.name));
  }
  children(builder) {
    builder(this);
  }
}

export class File extends INode {
  constructor(name) {
    super(name, "File");
    this.content = "";
  }
  write(content) {
    this.content = content;
  }
  read() {
    return this.content;
  }
}

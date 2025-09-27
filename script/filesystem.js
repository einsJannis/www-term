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
  getChild(name) {
    return this.children.find((child) => child.name === name);
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

export function getDefaultFileSystem() {
  const root = new Directory(null);
  root.addChild(getHomeDirectory());
  return root;
}

function getHomeDirectory() {
  const home = new Directory("home");
  home.addChild(getGuestDirectory());
  home.addChild(geteinsjannisDirectory());
  return home;
}

function getGuestDirectory() {
  const guest = new Directory("guest");
  return guest;
}

function geteinsjannisDirectory() {
  const einsjannis = new Directory("einsjannis");
  einsjannis.addChild(getAboutMeFile());
  einsjannis.addChild(getProjectsDirectory());
  einsjannis.addChild(getEducationDirectory());
  return einsjannis;
}

function getAboutMeFile() {
  const aboutme = new File("ABOUTME.md");
  aboutme.write(
    "I'm a programmer and aspiring software engineer from Switzerland.\nCurrently I am doing a bachelor's degree in computer science at ETH Zurich.\nMy main interests are:\n - Systems Design and Programming\n - Language and Compiler Design\n - Formal Methods",
  );
  return aboutme;
}

function getProjectsDirectory() {
  const projects = new Directory("projects");
  home.addChild(projects);
  const uIndex = new File("uIndex.md");
  uIndex.write(
    '# uIndex\n\nA minimalistic android launcher which I created because I was annoyed that the Niagara Launcher has a "Pro" subscription.\n\n[You can find out more about it here](https://github.com/einsjannis/uIndex)',
  );
  projects.addChild(uIndex);
  const crabtype = new File("crabtype.md");
  crabtype.write(
    "# CrabType\n\nA command line based type racer game written in Rust\n\n[You can find out more about it here](https://github.com/einsjannis/crabtype)",
  );
  projects.addChild(crabtype);
  return projects;
}

function getEducationDirectory() {
  const education = new Directory("education");
  const csBachelor = new File("BSc_Computer_Science.md");
  csBachelor.write(
    "# Bachelor's Degree in Computer Science\n\nI am currently pursuing a bachelor's degree in computer science at ETH Zurich.",
  );
  education.addChild(csBachelor);
  return education;
}

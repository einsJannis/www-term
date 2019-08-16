let user = "user";
let path = "~";
let listeningForInput = false;
let inputID = 0;
let history = [];
let historyPointer = 0;
let entry = "";
let intervalCount = 0;

const helpPages = [
    "<b>Help page</b><br><br>" +
    "Welcome on my Website.<br>" +
    "You can use the command <i>help --cmd --list</i> to get an quick overview <br>" +
    "An detailed helping page is coming soon.<br>" +
    "<br>LG <b>einsJannis</b><br>"
];
const commandHelp = {
    help: "A little tutorial and a overview of all commands [usage: 'help --page <i>pageNumber</i>' or 'help --cmd <i>commandName</i>']",
    echo: "Prints what you've typed [usage: 'echo <i>message</i>']",
    su: "Changes user [usage: 'su <i>newUsername</i>']",
    clear: "Clears visual history [usage: 'clear']",
    imprint: "Shows the sites imprint and privacy [usage: 'imprint']",
    socialmedia: "Shows all social media sites [usage: 'socialmedia']",
    contact: "Shows all contact methods [usage: 'contact']",
    about: "Shows information about myself [usage: 'about']"
};

const help = function (args) {
    if (args[0] === "--page") {
        if (args[1] <= helpPages.length) {
            print("<br>" + helpPages[args[1]-1] + "<br>");
        } else {
            print("Page out of range. Please enter a number between 1 and " + helpPages.length.toString() + ".");
        }
    } else if (args[0] === "--cmd") {
        if (args[1] === "--list") {
            print("<br><b>List of all commands</b>");
            Object.keys(commandHelp).map(function (k) {
                let v = commandHelp[k];
                print(k + " | " + v);
            });
            print("<br>")
        }
        if (commands[args[1]] !== undefined) {
            print(commandHelp[args[1]-1]);
        }
    } else {
        print("<br>" + helpPages[0] + "<br>");
    }
};
const echo = function (args) {
    let message = "";
    args.forEach(function (v) {
        message += " " + v;
    });
    message = message.substr(1);
    print(message);
};
const su = function (args) {
    user = args[0];
};
const clear = function (args) {
    document.body.innerHTML = "";
};
const imprint = function (args) {
    print(
        "<br>" +
        "<b>Imprint</b><br>" +
        "<br>" +
        "<b>Contact</b><br>" +
        "Jannis Piekarek<br>" +
        "Imfangstrasse 1<br>" +
        "6005 Luzern | Schweiz<br>" +
        "<a href='mailto:contact@einsjannis.dev'>contact@einsjannis.dev</a><br>" +
        "<br>" +
        "<b>Privacy policy</b><br>" +
        "This site does not store any user data besides server logs, which are only used to detect bugs and fix them.<br>" +
        "If you want us to erase your data, just contact the admin of this site by the email address provided above.<br>" +
        "<br>"
    )
};
const socialMedia = function (args) {
    print(
        "<br>" +
        "<b>Social Media</b><br>" +
        "Discord: einsJannis#0001<br>" +
        "Twitter: <a href='https://twitter.com/einsJannis'>@einsJannis</a><br>" +
        "Instagram: <a href='https://instagram.com/einsjannis'>@einsjannis</a><br>" +
        "Youtube: <a href='https://youtube.com/channel/UCr571QxoqSbAofmq_lXlpoA'>einsJannis</a><br>" +
        "Steam: <a href='https://steamcommunity.com/id/einsJannis'>einsJannis</a><br>" +
        "Reddit: <a href='https://reddit.com/u/einsJannis'>u/einsJannis</a><br>" +
        "<br>"
    );
};
const contact = function (args) {
    print(
        "<br>" +
        "<b>Contact</b><br>" +
        "E-Mail: <a href='mailto:contact@einsjannis.dev'>contact@einsjannis.dev</a><br>" +
        "<br>"
    )
};
const about = function (args) {
    print(
        "<br>" +
        "<b>About me</b><br>" +
        "I'm a 16 year old freelancing developer.<br>" +
        "I've been developing now for 2 years and my first contact with programming was 4 years ago.<br>" +
        "I can develop in those languages (Sorted by experience):<br>" +
        "- Java<br>" +
        "- <i>php</i> (+ html&css)<br>" +
        "- JavaScript<br>" +
        "- Python<br>" +
        "- C++<br>" +
        "I also like designing things and can speak english and german<br>" +
        "<br>"
    )
};
const pricing = function (args) {
    print(
        "<br>" +
        "<b>Pricing</b><br>" +
        "+--------------------------------------------------------------------------+-------------------+<br>" +
        "¦ Product/Service                                                          ¦ Pricing           ¦<br>" +
        "+--------------------------------------------------------------------------+-------------------+<br>" +
        "¦ IT-Support                                                               ¦      10$/hour     ¦<br>" +
        "+--------------------------------------------------------------------------+-------------------+<br>" +
        "¦ Website                                                                  ¦ min 100$          ¦<br>" +
        "+--------------------------------------------------------------------------+-------------------+<br>" +
        "¦ Application                                                              ¦ min 800$          ¦<br>" +
        "+--------------------------------------------------------------------------+-------------------+<br>" +
        "Request those things from above by sending me a e-mail (you can find my email address by using the command <i>contact</i>)"
    )
};

let commands = {
    help: help,
    echo: echo,
    su: su,
    clear: clear,
    imprint: imprint,
    socialmedia: socialMedia,
    contact: contact,
    about: about,
    pricing: pricing
};

function print(message) {
    document.body.innerHTML += "<p>" + message + "</p>\n";
}

function initTerminal() {
    window.addEventListener("keydown", keydownEvent);
    setInterval(function () {
        intervalCount++;
        if (intervalCount % 2 === 0) {
            document.getElementsByClassName("cursor").item(0).style.borderRight = "1px solid rgba(0,0,0,0)";
        } else {
            document.getElementsByClassName("cursor").item(0).style.borderRight = "1px solid greenyellow";
        }
    }, 500);
    listenForNewInput();
}

function listenForNewInput() {
    inputID++;
    entry = "";
    document.body.innerHTML += "\n" +
        "<p id=\"" + inputID + "\" class=\"console-input\">\n" +
        "   <span class=\"su\">" + user + "@einsjannis.dev" + path + "$</span>\n" +
        "   <span class=\"input cursor\"></span>\n" +
        "</p>";
    listeningForInput = true;
}

function keydownEvent(e) {
    if (listeningForInput) {
        e.preventDefault();
        if (e.key === "Enter") {
            document.getElementsByClassName("cursor").item(0).style.borderRight = "1px solid rgba(0,0,0,0)";
            executeCommand();
        } else if (e.key === "Backspace") {
            entry = entry.substr(0, entry.length - 1);
        } else if (e.key === "ArrowUp") {
            if (history.length > 0) {
                if (historyPointer > 0) {
                    historyPointer--;
                    if (historyPointer === 0) {
                        historyPointer = inputID;
                        entry = "";
                    } else {
                        entry = history[historyPointer-1];
                    }
                } else {
                    historyPointer = inputID-1;
                    entry = history[historyPointer-1];
                }
            }
        } else if (e.key === "ArrowDown") {
            if (history.length > 0) {
                if (historyPointer > 0) {
                    historyPointer++;
                    if (historyPointer >= history.length + 1) {
                        historyPointer = 0;
                        entry = "";
                    } else {
                        entry = history[historyPointer - 1];
                    }
                } else {
                    historyPointer = 1;
                    entry = history[historyPointer - 1];
                }
            }
        } else if (e.key === "Tab") {

        } else if (e.key.length === 1) {
            entry += e.key;
        }
        document.getElementById(inputID.toString()).getElementsByClassName("input").item(0).innerHTML = entry;
    }
}

function executeCommand() {
    listeningForInput = false;
    document.getElementById(inputID.toString()).getElementsByClassName("input").item(0).setAttribute("class", "input");
    history.push(entry);
    let cmd;
    let args;
    if (entry.includes(" ")) {
        cmd = entry.substr(0, entry.indexOf(" ")).toLowerCase();
        args = entry.substr(entry.indexOf(" ") + 1).split(" ");
    } else {
        cmd = entry.toLowerCase();
        args = [];
    }
    if (commands[cmd] !== undefined) {
        if (args[0] === "--help") {
            help(["--cmd", cmd]);
        }
        commands[cmd](args);
    } else {
        print("Bash: Command not found. Please enter '<i>help</i>' for help.");
    }
    listenForNewInput();
}

export const commands = {
  ls: function (terminal, currentDirectory, args) {
    if (args.length > 1) {
      terminal.println("Usage: ls");
      return;
    }
    currentDirectory.children.forEach((file) => {
      terminal.println(file.name);
    });
  },
  echo: function (terminal, currentDirectory, args) {
    if (args.length > 2) {
      terminal.println("Usage: echo <message>");
    } else {
      terminal.println(args[1]);
    }
  },
  cat: function (terminal, currentDirectory, args) {
    if (args.length > 2) {
      terminal.println("Usage: cat <file>");
    } else {
      const file = currentDirectory.children.find(
        (child) => child.name === args[1] && child.type === "File",
      );
      if (file) {
        for (const line of file.read().split("\n")) {
          terminal.println(line);
        }
      } else {
        terminal.println(`File not found: ${args[1]}`);
      }
    }
  },
};

function parseQuote(input, type = null) {
  const char = input[0];
  if (type !== null) {
    switch (char) {
      case type:
        return [[char], input.substring(1)];
      default:
        return [[], input];
    }
  }
  switch (char) {
    case '"':
    case "'":
      return [[char], input.substring(1)];
    default:
      return [[], input];
  }
}

function parseQuotedString(input) {
  const start = parseQuote(input);
  if (start[0].length === 0) return [[], input];
  var result = "";
  var end = parseQuote(start[1], start[0][0]);
  while (end[0].length === 0) {
    result += end[1][0];
    end = parseQuote(end[1].substring(1), start[0][0]);
  }
  return [[result], end[1]];
}

/*
function parseInline(input) {
  const start = parseBackticks(input);
  if (start[0] == []) return [[], input];
  var result = "";
  var end = parseBackticks(start[1]);
  while (end[0] == []) {
    end = parseBackticks(end[1].substring(1));
    result += end[1][0];
  }
  return [result, start[1]];
}
*/

function parseArgumentChar(input) {
  if (input.length === 0) return [[], input];
  const char = input[0];
  if (char === " ") return [[], input.substring(1)];
  if (char === '"' || char === "'" /* || char === "`"*/) return [[], input];
  return [[char], input.substring(1)];
}

function parseArgument(input) {
  var result = "";
  var char = parseArgumentChar(input);
  while (char[0].length > 0) {
    result += char[0][0];
    char = parseArgumentChar(char[1]);
  }
  return [[result], char[1]];
}

export function parseParts(input) {
  var results = [];
  var rest = input;
  do {
    const quoted = parseQuotedString(rest);
    if (quoted[0].length === 0) {
      const arg = parseArgument(rest);
      if (arg[0].length === 0) {
        rest = rest.substring(1);
      } else {
        results.push(arg[0][0]);
        rest = arg[1];
      }
    } else {
      results.push(quoted[0][0]);
      rest = quoted[1];
    }
  } while (rest.length > 0);
  return results;
}

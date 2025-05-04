const singleLines = ["┌", "─", "┐", "│", "┘", "└"];
const doubleLines = ["╔", "═", "╗", "║", "╝", "╚"];

export function drawBox(text, double = false) {
  const symbols = double ? doubleLines : singleLines;
  const lines = text.split("\n");
  const maxLength = Math.max(...lines.map((line) => line.length));

  const horizontal = symbols[1].repeat(maxLength + 2);
  console.log(`${symbols[0]}${horizontal}${symbols[2]}`);

  for (const line of lines) {
    const padding = " ".repeat(maxLength - line.length);
    console.log(`${symbols[3]} ${line}${padding} ${symbols[3]}`);
  }

  console.log(`${symbols[5]}${horizontal}${symbols[4]}`);
}

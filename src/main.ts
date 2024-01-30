// DOM elements
const screenEl = document.querySelector("#screen") as HTMLDivElement;
const buttonElems = document.querySelectorAll("button");

// Event Listeners
buttonElems.forEach((button) => button.addEventListener("click", handleClick));

// Variables
let screenValueString = "0.00";
let expressionString = "0.00";
let lastChar = "";
let result = "";

// Initial screen value
screenEl.textContent = screenValueString;

// Calculate and display result based on button click ( + | - | / | * )
function calc(char: string) {
  screenEl.textContent = result;
  return (expressionString = result + char);
}

// Handle button click event
function handleClick(e: MouseEvent) {
  const button = (e.target as HTMLInputElement).value;

  // Clear everything
  if (button === "C") return resetCalc();

  // Accept only number as a first character
  if (
    (expressionString === "0.00" && button === "/") ||
    (expressionString === "0.00" && button === "*") ||
    (expressionString === "0.00" && button === "=") ||
    (expressionString === "0.00" && button === "-") ||
    (expressionString === "0.00" && button === "=") ||
    (expressionString === "0.00" && button === "+")
  )
    return;

  // If not a number, calculate and show result
  if (
    button === "/" ||
    button === "*" ||
    button === "-" ||
    button === "+" ||
    button === "="
  ) {
    // Does not accept subsequent arithmetic opartion signs
    if (button === lastChar) return;
    lastChar = button;

    // evaluate the math expression string
    result = eval(expressionString).toFixed(2).toString();

    if (button === "=") {
      updateScreenValue(result);
      expressionString = result;
    } else {
      calc(button);
    }
  }

  // If a number, add to the math expression string
  else {
    lastChar = button;

    // Do not add extra 0 to 0.00 value
    if (expressionString === "0.00" && button === "0") return;

    if (expressionString === "0.00") {
      expressionString = button;
      updateScreenValue(button);
    } else {
      expressionString += button;
      updateScreenValue(expressionString);
    }
  }
}

// Reset the calculator to initial state
function resetCalc(): void {
  expressionString = "0.00";
  screenValueString = "0.00";
  updateScreenValue(screenValueString);
}

// Set screen value and update the DOM
function updateScreenValue(value: string): void {
  screenValueString = value;
  screenEl.textContent = screenValueString;
}

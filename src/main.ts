const buttonElems = document.querySelectorAll("button");

buttonElems.forEach((button) =>
  button.addEventListener("click", (e) => handleClick(e))
);

function handleClick(e: Event): void {
  console.log((e.target as HTMLInputElement).value);
}

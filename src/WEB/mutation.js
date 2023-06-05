function log(state) {
  console.log(state);
}

const button = document.getElementById("button");
const header = document.getElementById("header");

let count = 0;

button.addEventListener("click", () => {
  count += 1;
  header.innerText = count.toString();
  header.appendChild(document.createElement("div"));
  log("click after change");

  Promise.resolve().then(() => log("promise after change"));

  setTimeout(() => log("timeout after change"), 0);
});

const mutation = new MutationObserver((mutation) => {
  log(mutation);
});

mutation.observe(header, {
  attributes: true,
  subtree: true,
  childList: true,
});

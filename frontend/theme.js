// Light mode / dark mode

let body = document.querySelector("body");

if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
}

// Add a click event listener to the button
let toggleButton = document.querySelector("#toggle-button");
toggleButton.addEventListener("click", function() {
    // Toggle the "dark-mode" class on the body
    body.classList.toggle("dark-mode");
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', null);
    }
  });

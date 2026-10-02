/*
@media screen and (min-width: 700px) {

}
*/

/*
Get the elements that we want to modify

Figure out when the modification should happen

For each element
    figure out which one it is
    output that number

Figure out where we will display the message...get a reference
*/

function displayWelcome() {
    const headerEl = document.querySelector("header");
    const dayIndex = new Date().getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const message = `Happy ${dayNames[dayIndex]}!`;
    const messageEl = document.createElement("p");
    messageEl.textContent = message;
    headerEl.append(messageEl);
}

function renderNumber(element, index) {
    const Number = document.createElement("span");
    Number.textContent = index + 1;
    element.prepend(Number);
}

function addIndex() {
    const scriptureElements =document.querySelectorAll(".scripture");
    scriptureElements.forEach(renderNumber);
}

function toggleMenu() {
    const navEl = document.querySelector("nav");
    navEl.classList.toggle("open");
}
document.querySelector(".menu-button").addEventListener("click", toggleMenu);

addIndex();
displayWelcome();
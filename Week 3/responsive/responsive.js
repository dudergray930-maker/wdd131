const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("hide");
    menuButton.classList.toggle("change");

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isOpen);
});
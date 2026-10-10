const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector(".main-nav");
const gallery = document.querySelector(".gallery");
const viewer = document.querySelector(".viewer");
const fullImage = document.querySelector(".full-image");
const closeButton = document.querySelector(".close-viewer");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("change");

    const menuIsOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", menuIsOpen);
});

gallery.addEventListener("click", (event) => {
    if (event.target.tagName !== "IMG") {
        return;
    }

    const thumbnail = event.target;
    const imageUrl = new URL(thumbnail.src);

    imageUrl.searchParams.set("w", "1600");
    imageUrl.searchParams.set("h", "1200");

    fullImage.src = imageUrl.href;
    fullImage.alt = thumbnail.alt;
    viewer.showModal();
});

closeButton.addEventListener("click", () => {
    viewer.close();
});

viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
        viewer.close();
    }
});
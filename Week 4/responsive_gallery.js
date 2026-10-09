const gallery = document.querySelector(".gallery");
const viewer = document.querySelector(".viewer");
const fullImage = document.querySelector(".full-image");
const closeButton = document.querySelector(".close-viewer");

gallery.addEventListener("click", openImage);

function openImage(event) {
    if (event.target.tagName !== "IMG") {
        return;
    }

    const smallImage = event.target;
    const largeImage = smallImage.src.replace("-sm", "-full");

    fullImage.src = largeImage;
    fullImage.alt = smallImage.alt;
    viewer.showModal();
}

closeButton.addEventListener("click", () => {
    viewer.close();
});

viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
        viewer.close();
    }
});
const theForm = document.querySelector("#myForm");

function processForm(event) {
    event.preventDefault();
    console.log("event:", event);
    console.log("this:", this);
}    

theForm.addEventListener("submit", processForm);
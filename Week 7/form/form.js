const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const choosingManyCampuses = travelRange.value === "many";

  notesContainer.hidden = !choosingManyCampuses;
  notes.required = choosingManyCampuses;

  if (!choosingManyCampuses) {
    notes.value = "";
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Return true when the selected date is today or earlier.
function isPastDate(value) {
  if (!value) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const chosen = new Date(`${value}T00:00:00`);
  return chosen <= today;
}

function getSelectedCampuses() {
  // Convert the NodeList into an array so filter and map can be used.
  return Array.from(campusBoxes)
    .filter((box) => box.checked)
    .map((box) => box.value);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return replacements[character];
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  // Use the browser's built-in checks for required fields and email format.
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (selectedCampuses.length === 0) {
    output.innerHTML = '<p class="error">Please select at least one campus.</p>';
    return;
  }

  if (type === "one" && selectedCampuses.length !== 1) {
    output.innerHTML =
      '<p class="error">You chose one campus. Please select exactly one campus.</p>';
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    output.innerHTML =
      '<p class="error">You chose two or more campuses. Please select at least two campuses.</p>';
    return;
  }

  if (type === "many" && note === "") {
    output.innerHTML =
      '<p class="error">Please add a travel note when choosing multiple campuses.</p>';
    notes.focus();
    return;
  }

  if (isPastDate(availableDate)) {
    output.innerHTML =
      '<p class="error">Please choose a start date later than today.</p>';
    return;
  }

  const safeCampuses = selectedCampuses.map(escapeHTML).join(", ");

  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${escapeHTML(firstName)} ${escapeHTML(lastName)}</p>
    <p>Email: ${escapeHTML(email)}</p>
    <p>Availability: ${escapeHTML(availableDate)}</p>
    <p>Campuses: ${safeCampuses}</p>
    <p>Preference Level: ${escapeHTML(type)}</p>
    ${note ? `<p>Travel Notes: ${escapeHTML(note)}</p>` : ""}
  `;

  form.reset();
  updateNotesField();
});
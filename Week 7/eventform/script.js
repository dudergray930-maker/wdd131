const form = document.querySelector('#event-form');
const typeSelect = document.querySelector('#attendee-type');
const codeField = document.querySelector('#code-field');
const codeInput = document.querySelector('#attendee-code');
const codeLabel = document.querySelector('#code-label');
const codeHint = document.querySelector('#code-hint');
const dateInput = document.querySelector('#event-date');
const messagePanel = document.querySelector('#form-messages');
const messageTitle = document.querySelector('#message-title');
const messageContent = document.querySelector('#message-content');

const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');

dateInput.min = localToday;

function updateAttendeeField() {
  const type = typeSelect.value;
  const showField = type === 'student' || type === 'guest';

  codeField.hidden = !showField;
  codeInput.disabled = !showField;
  codeInput.required = showField;
  codeInput.value = '';

  if (type === 'student') {
    codeLabel.textContent = 'Student I#';
    codeInput.inputMode = 'numeric';
    codeInput.maxLength = 9;
    codeInput.minLength = 9;
    codeInput.pattern = '[0-9]{9}';
    codeInput.placeholder = 'Enter your 9-digit student I number';
    codeHint.textContent = 'Enter exactly 9 digits.';
  } else if (type === 'guest') {
    codeLabel.textContent = 'Access Code';
    codeInput.removeAttribute('inputmode');
    codeInput.maxLength = 8;
    codeInput.minLength = 8;
    codeInput.pattern = 'EVENT131';
    codeInput.placeholder = 'Enter the event access code';
    codeHint.textContent = 'Enter the event code provided to you.';
  }
}

function showErrors(errors) {
  messagePanel.hidden = false;
  messagePanel.className = 'message-panel error';
  messageTitle.textContent = 'Please fix the following:';

  const list = document.createElement('ul');

  errors.forEach((error) => {
    const item = document.createElement('li');
    item.textContent = error;
    list.append(item);
  });

  messageContent.replaceChildren(list);
  messagePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

typeSelect.addEventListener('change', updateAttendeeField);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = [];

  if (!form.elements.fullName.value.trim()) {
    errors.push('Enter your full name.');
  }

  if (!form.elements.email.validity.valid || !form.elements.email.value.trim()) {
    errors.push('Enter a valid email address.');
  }

  if (!dateInput.value) {
    errors.push('Choose an event date.');
  } else if (dateInput.value <= localToday) {
    errors.push('Choose a date later than today.');
  }

  if (!typeSelect.value) {
    errors.push('Select Student or Guest.');
  }

  if (typeSelect.value === 'student') {
    if (!/^\d{9}$/.test(codeInput.value.trim())) {
      errors.push('Student I# must contain exactly 9 digits.');
    }
  } else if (typeSelect.value === 'guest') {
    if (codeInput.value.trim() !== 'EVENT131') {
      errors.push('Guest access code must be EVENT131.');
    }
  }

  if (errors.length) {
    showErrors(errors);
    return;
  }

  const ticketId = `EVENT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const displayDate = new Date(`${dateInput.value}T12:00:00`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const ticketType = typeSelect.value === 'student' ? 'Student' : 'Guest';

  messagePanel.hidden = false;
  messagePanel.className = 'message-panel success';
  messageTitle.textContent = 'You’re registered!';
  messageContent.replaceChildren();

  const intro = document.createElement('p');
  intro.textContent = `Your event ticket is ready. A confirmation has been prepared for ${form.elements.email.value.trim()}.`;

  const details = document.createElement('div');
  details.className = 'ticket-details';

  const ticket = document.createElement('span');
  ticket.className = 'ticket-number';
  ticket.textContent = `Ticket: ${ticketId}`;

  const name = document.createElement('span');
  name.textContent = `Name: ${form.elements.fullName.value.trim()}`;

  const date = document.createElement('span');
  date.textContent = `Event date: ${displayDate}`;

  const kind = document.createElement('span');
  kind.textContent = `Type: ${ticketType}`;

  details.append(ticket, name, date, kind);
  messageContent.append(intro, details);
  messagePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
// .forEach(): runs a function for every array item
const numbers = [65, 44, 12, 4];
const forEachResults = [];

numbers.forEach(function (number) {
  forEachResults.push(number * 10);
});

document.getElementById("forEach-output").textContent =
  forEachResults.join(", ");

console.log(".forEach() results:", forEachResults);


// .map(): makes a new array by changing each item
const mapResults = numbers.map(function (number) {
  return number * 10;
});

document.getElementById("map-output").textContent =
  mapResults.join(", ");

console.log(".map() results:", mapResults);


// .filter(): makes a new array with items that pass a test
const ages = [32, 33, 16, 40];

const adults = ages.filter(function (age) {
  return age >= 18;
});

document.getElementById("filter-output").textContent =
  adults.join(", ");

console.log(".filter() results:", adults);


// .reduce(): combines array items into one value
const prices = [125, 20, 5];

const reducedTotal = prices.reduce(function (total, number) {
  return total - number;
});

document.getElementById("reduce-output").textContent = reducedTotal;

console.log(".reduce() result:", reducedTotal);


// .indexOf(): finds the first position of a value
const fruits = ["Banana", "Orange", "Apple", "Mango"];
const appleIndex = fruits.indexOf("Apple");

document.getElementById("indexOf-output").textContent = appleIndex;

console.log(".indexOf() result:", appleIndex);


// Template literal: inserts values into a string using backticks
const movie = {
  title: "Finding Nemo",
  genre: "Animation"
};
const stars = 5;

const movieSummary = `
  <h3>${movie.title}</h3>
  <p>${movie.genre} - ${stars} stars</p>
`;

document.getElementById("movie-list").innerHTML = movieSummary;


// JavaScript object: stores related name/value pairs
const car = {
  type: "Fiat",
  model: "500",
  color: "white"
};

document.getElementById("car-output").textContent =
  car.color + " " + car.type + " " + car.model;


// Practice code: convert a letter grade into points
function convert(grade) {
  switch (grade) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case "F":
      return 0;
    default:
      return "Not a valid grade";
  }
}

const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const students = [
  { last: "Andrus", first: "Aaron", grade: "A" },
  { last: "Masa", first: "Manny", grade: "B" },
  { last: "Tanda", first: "Tamanda", grade: "C" }
];

const studentCards = students.map(function (student) {
  return `
    <p>
      ${student.first} ${student.last}:
      ${convert(student.grade)} points
    </p>
  `;
});

document.getElementById("students-output").innerHTML =
  studentCards.join("");

console.log("Words:", words);
console.log("Students:", students);
console.log("Aaron's grade points:", convert("A"));
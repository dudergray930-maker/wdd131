const recipes = [
  {
    name: "Sweet Potato Waffles",
    tags: ["Waffles", "Sweet Potato", "Side"],
    description: "Savory waffles made with sweet potato and a hint of ginger.",
    image: "sweet-potato-waffle-md.jpg",
    rating: 4
  },
  {
    name: "Escalope de Poulet a la Creme",
    tags: ["Chicken", "Entree"],
    description:
      "A creamy chicken dish with mushrooms, mustard, lemon, rice, and green beans.",
    image: "escalopes-de-poulet-a-la-creme.webp",
    rating: 4.5
  },
  {
    name: "Oven Roasted Potato Slices",
    tags: ["Potatoes", "Side"],
    description: "Easy, delicious oven-roasted potatoes that go with almost anything.",
    image: "roasted-potatoes.webp",
    rating: 4
  },
  {
    name: "Black Beans and Rice",
    tags: ["Southwest", "Entree"],
    description:
      "Black beans and tomatoes served over rice with cheese and tortilla chips.",
    image: "black-beans-and-rice.jpg",
    rating: 3
  },
  {
    name: "Chicken Curry",
    tags: ["Chicken", "Entree", "Indian"],
    description: "A quick and easy chicken curry made with easy-to-find ingredients.",
    image: "chicken-curry.webp",
    rating: 5
  },
  {
    name: "Chocolate Chip Cookies",
    tags: ["Dessert"],
    description: "Delicious soft chocolate chip cookies with coconut.",
    image: "chocolate-chip-cookies.jpg",
    rating: 5
  },
  {
    name: "Gooseberry Cake with Vanilla Cream and Crumble",
    tags: ["Dessert", "German"],
    description:
      "A slightly tart gooseberry cake with vanilla cream and a crumble topping.",
    image: "german-gooseberry-cake.jpg",
    rating: 5
  },
  {
    name: "Apple Crisp",
    tags: ["Dessert"],
    description:
      "A simple fall dessert that's great served warm with vanilla ice cream.",
    image: "apple-crisp.jpg",
    rating: 4
  }
];

const recipeList = document.querySelector("#recipe-list");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#recipe-search");

function makeStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "⭐" : "☆";
  }

  return stars;
}

function createRecipeCard(recipe) {
  const article = document.createElement("article");
  article.className = "recipe";

  const image = document.createElement("img");
  image.className = "recipe-image";
  image.src = `images/${recipe.image}`;
  image.alt = recipe.name;

  // Use the provided Apple Crisp photo if a recipe photo is missing.
  image.onerror = function () {
    image.onerror = null;
    image.src = "images/apple-crisp.jpg";
  };

  const details = document.createElement("div");
  details.className = "recipe-details";

  recipe.tags.forEach(function (tagName) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagName;
    details.append(tag);
  });

  const title = document.createElement("h2");
  title.textContent = recipe.name;

  const rating = document.createElement("span");
  rating.className = "rating";
  rating.setAttribute("role", "img");
  rating.setAttribute("aria-label", `Rating: ${recipe.rating} out of 5 stars`);
  rating.textContent = makeStars(recipe.rating);

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = recipe.description;

  details.append(title, rating, description);
  article.append(image, details);

  return article;
}

function showRecipes(recipeArray) {
  recipeList.replaceChildren();

  if (recipeArray.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No recipes found. Try another search.";
    recipeList.append(message);
    return;
  }

  recipeArray.forEach(function (recipe) {
    recipeList.append(createRecipeCard(recipe));
  });
}

function searchRecipes(event) {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  const matches = recipes
    .filter(function (recipe) {
      const nameMatches = recipe.name.toLowerCase().includes(query);
      const descriptionMatches = recipe.description.toLowerCase().includes(query);
      const tagMatches = recipe.tags.some(function (tag) {
        return tag.toLowerCase().includes(query);
      });

      return nameMatches || descriptionMatches || tagMatches;
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

  showRecipes(matches);
}

searchForm.addEventListener("submit", searchRecipes);

const randomIndex = Math.floor(Math.random() * recipes.length);
showRecipes([recipes[randomIndex]]);
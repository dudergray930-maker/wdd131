const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: "https://andejuli.github.io/wdd131/character_card/snortleblat.webp",

  attacked() {
    if (this.health === 0) {
      return;
    }

    this.health = Math.max(0, this.health - 20);
    updateCard();

    if (this.health === 0) {
      alert("Character Died");
    }
  },

  levelUp() {
    this.level += 1;
    updateCard();
  }
};

const nameElement = document.querySelector("#character-name");
const classElement = document.querySelector("#character-class");
const levelElement = document.querySelector("#character-level");
const healthElement = document.querySelector("#character-health");
const imageElement = document.querySelector("#character-image");

function updateCard() {
  nameElement.textContent = character.name;
  classElement.textContent = character.class;
  levelElement.textContent = character.level;
  healthElement.textContent = character.health;
  imageElement.src = character.image;
}

document.querySelector("#attacked-button").addEventListener("click", () => {
  character.attacked();
});

document.querySelector("#level-up-button").addEventListener("click", () => {
  character.levelUp();
});

updateCard();
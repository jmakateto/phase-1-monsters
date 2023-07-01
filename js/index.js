document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterForm = document.getElementById('create-monster');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    let page = 1;
  
    // Load the first 50 monsters
    fetchMonsters();
  
    // Event listeners
    createMonsterForm.addEventListener('submit', createMonster);
    backButton.addEventListener('click', () => loadMonsters(-1));
    forwardButton.addEventListener('click', () => loadMonsters(1));
  
    // Functions
    function fetchMonsters() {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => {
            renderMonster(monster);
          });
        });
    }
  
    function renderMonster(monster) {
      const monsterCard = document.createElement('div');
      monsterCard.innerHTML = `
        <h3>${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
    }
  
    function createMonster(event) {
      event.preventDefault();
      const nameInput = document.querySelector('input[name="name"]');
      const ageInput = document.querySelector('input[name="age"]');
      const descriptionInput = document.querySelector('input[name="description"]');
  
      const monster = {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descriptionInput.value
      };
  
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(monster)
      })
        .then(response => response.json())
        .then(newMonster => {
          renderMonster(newMonster);
          nameInput.value = '';
          ageInput.value = '';
          descriptionInput.value = '';
        });
    }
  
    function loadMonsters(direction) {
      page += direction;
      monsterContainer.innerHTML = '';
      fetchMonsters();
    }
  });
  
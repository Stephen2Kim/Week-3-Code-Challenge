document.addEventListener('DOMContentLoaded', () => {
    //DOMContentLoaded as per my understanding is for ensuring the code waits for the entire DOM to be loaded before it starts executing functions
    // Lets declare variabes and assign them to values gotten by id from the HTML file for use in our js code.
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingList = document.getElementById('shopping-list');
    const clearButton = document.getElementById('clear-button');
  
    //JSON.parse enables us to retrieve data from the browsers local storage. Read it online while looking at array management, understood how it operates but in layman's terms a bit blank. 
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  
    // Lets render the shopping list
    function renderList() {
      shoppingList.innerHTML = ''; // The empty string means clear the list
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (item.purchased) {
          li.classList.add('purchased');
        }
        // eventlistener using click to show purchased. 
        li.addEventListener('click', () => {
          items[index].purchased = !items[index].purchased;
          updateList();
        });
        shoppingList.appendChild(li);
      });
    }
  
    // Function to update the list in local storage and re-render the list
    function updateList() {
      localStorage.setItem('shoppingList', JSON.stringify(items)); // Did not quite understand the concept of local storage and importation in this particular line. But used it anyway. 
      renderList();
    }
  
    // Add eventListener for add
    addButton.addEventListener('click', () => {
      const itemName = itemInput.value.trim();
      if (itemName) {
        items.push({ name: itemName, purchased: false });
        updateList();
        itemInput.value = ''; // empty string means clear
      }
    });
  
    // Add eventListener for clear list
    clearButton.addEventListener('click', () => {
      items = [];
      updateList();
    });
  
    // Call the function renderList
    renderList();
  });
  
// Controllers are esentially classes / prototypes

// --------------- Storage Controller ---------------
const StorageCtrl = (function() {
  return {
    storeItem: function(item) {
      let items;
      
      if(localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;

      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, i) => {
        if(updatedItem.id === item.id) {
          item.splice(i, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, i) => {
        if(id === item.id) {
          item.splice(i, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();

// --------------- Item Controller ---------------
const ItemCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function() {
      return data;
    },
    addItem: function(name, calories) {
      calories = parseInt(calories);
      let id = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;
      let newItem = new Item(id, name, calories);
      
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      
      data.items.forEach(item => {
        if(item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function(name, calories) {
      calories = parseInt(calories);
      let found = null;

      data.items.forEach(item => {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      
      return found;
    },
    deleteItem: function(id) {
      const ids = data.items.map(item => item.id);
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      })

      data.totalCalories = total;

      return data.totalCalories;
    },
    getItems: function() {
      return data.items;
    }
  }
})();

// --------------- UI Controller ---------------
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li',
    clearBtn: '.clear-btn'
  };
  
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(item => {
        html += `<li id="item-${item.id}" class="collection-item">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>`;
      })

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      const li = document.createElement('li');

      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItem = document.querySelectorAll(UISelectors.listItems);
      listItem = Array.from(listItem);

      listItem.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');

        if(itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);

      listItems.forEach(item => {
        item.remove();
      });
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(evt) {
      try {
        evt.preventDefault();
      } catch(err) { }

      UICtrl.clearInput();

      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

// --------------- App Controller ---------------
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
  const loadEvtListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.addEventListener('keydown', function(evt) {
      if(evt.key === 'enter') {
        evt.preventDefault();
        return false;
      }
    });
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  }

  const itemAddSubmit = function(evt) {
    evt.preventDefault();
    const input = UICtrl.getItemInput();

    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      
      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      StorageCtrl.storeItem(newItem);
      
      UICtrl.clearInput();
    }
  }

  const itemEditClick = function(evt) {
    evt.preventDefault();

    if(evt.target.classList.contains('edit-item')) {
      const listId = evt.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);

      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
    }
  }

  const itemUpdateSubmit = function(evt) {
    evt.preventDefault();

    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);
    
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();
  }

  const itemDeleteSubmit = function(evt) {
    evt.preventDefault();

    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
  }

  const clearAllItemsClick = function(evt) {
    evt.preventDefault();

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);
    ItemCtrl.clearAllItems();
    UICtrl.removeItems();
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
  }

  return {
    init: function() {
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();

      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      loadEvtListeners();
    }
  }  
})(ItemCtrl, StorageCtrl, UICtrl);

// App Init
AppCtrl.init();
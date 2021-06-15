// Controllers are esentially classes

// Storage Controller ---------------

// Item Controller ---------------
const ItemCtrl = (function() {
  // Constructor
  const Item = function(id, name, calorie) {
    this.id = id;
    this.name = name;
    this.calorie = calorie;
  }

  // Data Structure or State (similar to what happen with ReactJS)
  const data = {
    items: [
      { id: 0, name: 'Carrot', calories: 50 },
      { id: 1, name: 'Apple', calories: 60 },
      { id: 2, name: 'Grape', calories: 30 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function() {
      return data;
    }
  }
})();

// UI Controller ---------------
const UICtrl = (function() {
  
})();

// App Controller ---------------
const AppCtrl = (function(ItemCtrl, UICtrl) {
  
})(ItemCtrl, UICtrl);
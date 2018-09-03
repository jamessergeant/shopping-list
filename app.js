
var state = {
  items: []

  // // state populated with original values for testing
  // items: {name: 'apple', checked: false},
  //        {name: 'orange', checked: false},
  //        {name: 'milk', checked: true},
  //        {name: 'bread', checked: false}]
};

// item object with name and checked properties
function Item(item) {
  console.log('addItem');
  return {name: item, checked: false};
};

function addItem(state, item) {
  state.items.push(Item(item));
}

function deleteItem(state,ind) {
  state.items.splice(ind,1);
}

function toggleItem(state,ind) {
  state.items[ind].checked = !state.items[ind].checked;
}

// global strings
var checkedClass = 'shopping-item__checked';
var itemIdAtrr = 'item-id'

function checkButtonHandling() {
  // on click of delete button
  $('.shopping-list').on('click','.shopping-item-toggle', function(event) {
      // find closest list item to the Check button and get the item id
      var index = $(event.currentTarget).closest('li').attr(itemIdAtrr)

      // toggle the checked property
      toggleItem(state,index);
      $(event.currentTarget).closest('li span').toggleClass(checkedClass);
      // render list
      // renderList(state);
    });
}

function deleteButtonHandling() {
  // on click of delete button
  $('.shopping-list').on('click','.shopping-item-delete', function(event) {
      // find closest list item to the Delete button and get the item id
      var index = $(event.currentTarget).closest('li').attr(itemIdAtrr)

      // pop the item
      deleteItem(state,index);

      // render list (updates item ids)
      renderList(state);
    });
}


// currently inefficient as it renders everything everytime
function renderList(state) {

  // for each item in state
  html = state.items.map(function(item, index) {

    // create the element
    var elem = $('<li> \
                    <span class="shopping-item"></span> \
                    <div class="shopping-item-controls"> \
                      <button class="shopping-item-toggle"> \
                        <span class="button-label">check</span> \
                      </button> \
                      <button class="shopping-item-delete"> \
                        <span class="button-label">delete</span> \
                      </button> \
                    </div> \
                  </li>');

    // add the item name
    elem.find('.shopping-item').html(item.name);
    // add the item id as an attribute to the li tag
    elem.attr(itemIdAtrr,index);
    // add the checked class if appropriate
    if (item.checked) elem.find('.shopping-item').addClass(checkedClass);
    return elem
  });

  // clear the previously html for the list and add new html
  $('.shopping-list').empty().html(html);
};

function addItemHandling() {

  // on button click or enter button
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    // add a new item with name and checked properties
    addItem(state,$('#shopping-list-entry').val());

    // render the updated list
    renderList(state);
  })
};


$(function() {
  // render list - clears HTML in index.html if state at top is empty
  renderList(state);

  // add callback for Add Item button
  addItemHandling();

  // add callback for Check buttons
  checkButtonHandling();

  // add callback for Delete buttons
  deleteButtonHandling();
});

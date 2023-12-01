// Add list to DOM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


// Display items from localStorage after loading the page
const displayItems = () =>{
    const itemsFromStorage = getItemsFromStorage();

    // Add to the DOM
    itemsFromStorage.forEach((item)=>{
        addItemToDOM(item);
        checkUI();
    })
}

function onAddItemSubmit (e) {
    e.preventDefault();
    // Get the value
    // Fix the bug with this line of code
    const itemToEdit = itemList.querySelector(".edit-mode");
    const newItem = itemInput.value;
    // Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Check for edit mode
    if(isEditMode) {
        // Remove the old 'newItem' and Add the 'new' newItem
        
        // Select the item that is in 'edit-mode'
        const itemToEdit = itemList.querySelector('.edit-mode');

        // Remove item from storage
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('.edit-mode');
        // remove from DOM
        itemToEdit.remove();
        isEditMode = false;
    } else {
        // Compare the New Item with the Old Item
        if (checkIfItemExists(newItem)) {
            alert('Item already exists');
            itemToEdit.classList.remove("edit-mode");
            isEditMode = false;
            checkUI();
            return;
        }
    }

    // Call addItemToDOM function here
    addItemToDOM(newItem);

    // Add item to localStorage
    addItemToStorage(newItem);

        // Run the CheckUI()
        checkUI();

    itemInput.value = '';
}

// Add item to DOM function
const addItemToDOM = (item) =>{
        // Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        // Create the button
        const button = createButton('remove-item btn-link text-red');
        // Append button to li
        li.appendChild(button);
        // Append to the DOM
        itemList.appendChild(li);
        // Clear the input
        // itemInput = ''; - This will throw an error 
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    // Bring icon here
    const icon = createIcon('fa-solid fa-xmark')
    // Append icon
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Add item to localStorage function
const addItemToStorage =(item) =>{
    // Init an empty variable
    let itemsFromStorage = getItemsFromStorage()

    // Add new item to array
    itemsFromStorage.push(item);
    
    // Convert to JSON string and set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Fetch items from Storage and display to HTML
const getItemsFromStorage = () => {
    // Check if we have items
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

// onClickItem function, pick where to click on X or 'li'
const onClickItem = (e) => {
    if (e.target.id === 'item-list'){
        return;
    }
    if(e.target.parentElement.classList.contains('remove-item')){
        // traversing the DOM to get what we want
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target);
    }
}

// Check for duplicate items
function checkIfItemExists (item) {
    // Get item from localStorage
    const itemsFromStorage = getItemsFromStorage();
    // Make all items to lowercase
    const itemsLowerCase = itemsFromStorage.map((str) => str.toLowerCase());
    return itemsLowerCase.includes(item.toLowerCase());
}
// Use this function to 'isEditMode'


function setItemToEdit(item) {
    isEditMode = true;

    itemList.
    querySelectorAll('li')
    .forEach((i)=> i.classList.remove('edit-mode'));

    // Edit the visuall button
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<li class="fa-solid fa-pen"></li> Update Item'
    // Bring the value while editing and change the btn color
    formBtn.style.backgroundColor = '#228b22';
    itemInput.value = item.textContent;
}

// Remove the entire li, here we have event delegation
const removeItem = (item) => {
    if(confirm('Are you sure?')) {
        // remove item from DOM
        item.remove()
        // remove item from localStorage
        removeItemFromStorage(item.textContent);
        checkUI();
    }
}

// remove item from localStorage function
// Dont forget to call on 'clearItems' btn
const removeItemFromStorage = (item) => {
    // Bring items from storage
    let itemsFromStorage = getItemsFromStorage();

    // Filter item to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=>i !== item);

    // Re-set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

const filterItems = (e) => {
    // Bring the items and loop through
    const items = itemList.querySelectorAll('li');
    // Get the value on filter input and convert to lowercase
    const text = e.target.value.toLowerCase();
    items.forEach((item)=>{
        // Select the text, traversing the element, item -> all word -> single letter
        const itemName = item.firstChild.textContent.toLowerCase();
        
        // Compare the 'text' with the 'itemName'
        // indexOf() method
        // This method checks if we have 'the specific letter' on all elements
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

const clearItems= ()=> {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    // Clear from localStorage using 'clearItems' btn
    localStorage.removeItem('items');

    checkUI();
}

// Hide and Display 'clearBtn' and 'itemFilter'
const checkUI = () => {
    // Clear the UI 
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block'
    }
    
    // Reset the button to 'the initial state';
    formBtn.innerHTML = '<li class="fa-solid fa-plus" ></li> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
    
}

// Init app
const init = () => {
    // Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)
// Run the getItemsFromStorage on document object
document.addEventListener('DOMContentLoaded', displayItems)
checkUI();
}

init();


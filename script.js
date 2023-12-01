// Add list to DOM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list');

function addItem (e) {
    e.preventDefault();

    // Get the value
    const newItem = itemInput.value;
    // Validate input
    if (newItem.value == '') {
        alert('Please add an item');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    // Create the button
    const button = createButton('remove-item btn-link text-red');
    // Append button to li
    li.appendChild(button);
    // Append to the DOM
    itemList.appendChild(li);
    // Clear the input
    // itemInput = ''; - This will throw an error 
    itemInput.value = '';
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





// Event Listeners
itemForm.addEventListener('submit', addItem)
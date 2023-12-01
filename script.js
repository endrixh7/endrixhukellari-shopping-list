// Add list to DOM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter')
const clearBtn = document.getElementById('clear');

function addItem (e) {
    e.preventDefault();
    // Get the value
    const newItem = itemInput.value;
    // Validate input
    if (newItem === '') {
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

    // Run the CheckUI()
    checkUI();

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

// Remove the entire li, here we have event delegation
const removeItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')){
        // traversing the DOM to get what we want
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
    
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
    checkUI();
}

// Hide and Display 'clearBtn' and 'itemFilter'
const checkUI = () => {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block'
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)


checkUI();
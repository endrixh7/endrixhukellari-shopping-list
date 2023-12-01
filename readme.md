# Shopping List

Vanilla JavaScript shopping list app from my Modern JS From The Beginning course.

This project was created to focus on working with the DOM, events, state, local storage and other fundamentals of JavaScript.

<img src="images/screen.png" width="400">

# Add Items To List (DOM Only)
    - Add item to the list
    - UI explanation
        - Input (Part of the HTML Form)
        - Filter
        - Add Button
        - Unordered list
        - List items
        - Clear button
    - Select all element using JS and put all of the into Global scope
        - Form
        - Input
        - List
        - Clear button
        - Unordered list
        - List items
        - Item Filter
    - Add event listener on form, submit and the addItem() function
    - add Item Function functionality
        - Validate input
        - Create list item
        - Clear the Input

# Remove & Clear Items
    - removeItem function
        - add a 'confirm' alert if you want to remove
        - e.target
        - parentElement/parentNode
        - traverse the DOM
        - run the checkUI function (we remove li, so we have to count how many items we have)

    - clearItem function
        - clear the entire list using innerHTML
        - Using while loop, first child, removeChild(pass the first child)
        - run the checkUI function()

# Clear the UI State
    - checkUI function
        - bring the 'items' inside of this function so we can check how many items we have(dont let in global scope)
        - check if we have any item
        - hide the Filter and Clear elements
    - Run on global scope (care with this function)

# Filter Items
    - filterItems function
    - Input event
    - 'e' object
    - Capture the value
    - Convert to lowercase
    - Make sure to bring the 'items' here so we can check letters
        - Loop through all 'items'
        - Get the text inside of the item element(item.firstChild.textContent)
        - Make lowercase
    - Now we have to 'match' these two
        - textContent of the 'items' and the 'Captured value'
    - if statement
    - indexOf() method
        - indexOf() returns 'true' or 'false'
    - if the 'letter' match display the 'item'
    - if not match hide the 'item'

# Local Storage Crash Course
    - localStorage
    - sessionStorage
    - Property on the 'Window'
    - Data is stored in the 'Browser'
    - Data is stored as key/value pairs and values are strings (Can not store objects)
    - localStorage and sessionStorage have the same API
    - localStorage does not expire
    - sessionStorage only lasts until the page is closed
    - localStorage Methods
        - setItem
        - getItem
        - remoteItem
        - clear

# Add Items To Local Storage
    - We have to implement localStorage in some places
    - Add and Remove
    - Load Items from localStorage when the page loads (fetch)
    - Break the functions
        - Create a function addItemToDOM(item) and pass 'item' as param
        - Copy the code of //Create List item code and Paste to addItemToDOM
        - Within the addItem(), after validation call the addItemToDOM(newItem) and pass the 'newItem' as param
    - Create a function addItemToStorage(item)
        - init an unassigned variable
        - check if we have items on localStorage
        - if is null set the unassigned var as empty array
        - else the unassigned = JSON.parse(localStorage.getItem(''))
        - take the new item and added to the array (push() method)
        - convert the 'item' to JSON string using JSON.stringify() and set to localStorage

# Display Items From Local Storage - Fetch Data from localStorage
    - getItemsFromStorage() function
    - We have to place it to different places
    - Good example of DRY (Dont Repeat Yourself)
    - add the getItemsFromStorage() function to the 'document.addEventListener('DOMContentLoaded', displayItems)'
        - To do this create another function displayItems() and place it to the top, the reason is that every time the page load this will fetch te data and display to the DOM.
        - const itemsFromStorage = getItemsFromStorage(); // Data from storage is stored in this variable
        - Loop through the itemsFromStorage(item)
        - And for each item call the addItemToDOM function(item)
        - call the checkUI();
    - Create an Init function and put all the event listeners inside and call only the Init function

# Remove Items From Local Storage 
    - removeItem() function renamed to onClickItem() {handler function}
        - dont delete the removeItem() function
    - create a new function onClickItem
        - Create e statement to see what element we are clicking so we can decide what we are deleting
        - e.target.parentElement.parentElement
    - On the other side at removeItem(item) function
        - Lets create a statement that display us to confirm the deletion of the 'item' (actual element that cames from the onClickItem)
        - call the item.remove() // remove item from DOM
        - Now lets delete item from storage
            - call the removeItemFromStorage(item.textContent)
        - run the checkUI
    - Lets create the removeItemFromStorage(item)
        - get the item from storage = getItemsFromStorage()
        - filter from the storage using filter method()
            - take one param and check if is not equal to item
        - re-set to local storage
        - reload the page to see if the functionality is working
    - Remove the items from storage using the 'Clear' button
        - localStorage.removeItem('items')

# Set Item To Edit Mode - Part 1
    Steps:
        - Select one of the 'li'
        - The selected li will be displayed at the 'input' field
        - The button will change 'text' , 'color' and 'icon'
    - Initialize a variable to the global state and set it 'false' (let isEditMode = false)
    - Inside of the onClickItem() after the if statement we are going to add an else and create a new function {
        setItemToEdit(e.target)
    } and passing the current click.
    - Now lets create the function setItemToEdit(item)
        - isEditMode = true;
        - make some visual edits to see that we are in edit mode
        - Select the text make the text a little lighter (item.style.color) or add a class from the css ('edit-mode')
        - Select form button and change the text color and icon (innerHTML)
        - Select the input.value = item.textContent
            - Issue:
                - if we select all items, all items will be grayed and put to edit Mode, but we want only one to be selected
                - How do we handle this?
                - Down below the isEditMode = true
                    - we select all the 'li' and loop through using forEach(i) and remove the class ('edit-mode');

# Update Item & Reset State - Part 2
    - Now before we continue with Part 1 lets check if we are in check mode
    - Go to onAddItemSubmit() function after the validation we are going to run a statement
    - if (isEditMode)
    - init a new varibale = itemList.querySelector('.edit-mode')
    - call the removeItemFromStorage(itemToEdit.textContent)
    - itemToEdit.remove()
    - isEditMode = false

    - Now our button Stays with the previous styling,
        - How to fix it?
        - Go to checkUI
            - clear the Input
            - change the button style like it was at the beginning
            - isEditMode = false (edit mode will stay always false)

# Prevent Duplicate Items
    - create a function checkIfItemExists(item)
    - get item from local storage
    - check if items exists inside of the localStorage using .includes(item) method
        - This method return 'true' or 'false'
    - return itemsFromStorage.includes(item)
    - Now we have to run this function while we are in editMode
        - after the else of the check for edit mode
            - if (checkIfItemExists(newItem))
                -alert('That item already exists')
                - return

# The documentation is done - Tomorrow start with implementation

# Checking for Potential Bugs
    - First Bug
        - there is a bug in the project. if the list has eggs and bread for example. when I click on eggs and edit it to bread, it adds it to the list even though it's already in the list
    - Fix it

    - Second Bug
        - If a user adds "juice" when "Juice" is already in the list, it can still be added
        - Fix it
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
        - 


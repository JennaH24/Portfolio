const appSettings = {
    databaseURL: "https://shoppingapp-4a3f7-default-rtdb.europe-west1.firebasedatabase.app/"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const listEl =  document.getElementById("shopping-list");
const buttonEl = document.getElementById("add-button");
const inputFieldEl= document.getElementById("input-field");

buttonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInput();
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val());

    clearShoppingListEl ()

    for (let i = 0; i < itemsArray.length; i++){
        appendItem(itemsArray[i])
    }
})

function clearInput () {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    listEl.innerHTML = ""
}

function appendItem(item) {
    listEl.innerHTML += `<li>${item}</li>`
}
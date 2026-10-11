const menu=[
    { name: "Espresso" , price:3.0} ,
    { name: "Latte" , price:4.5} ,
    { name: "Mocha" , price: 5.0} ,
    { name: "Muffin" , price:2.5}
];

let cart =[];

const menuList = document.getElementById("menu-list"); 
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const rewardMessage = document.getElementById("reward-msg");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const  addCustomButton= document.getElementById("add-custom-button");
const errorMessage = document.getElementById("error-message");
const  clearCartButton= document.getElementById("clear-cart-btn");

function renderMenu() {
    menuList.textContent="";

    for(let i=0 ; i < menu.length; i++){
     
        const li =document.createElement("li");
        li.textContent=menu[i].name + " - $" + menu[i].price.toFixed(2)+" ";
        const button= document.createElement("button");
        button.textContent="Add";
        button.dataset.index = i;

        li.appendChild(button);
        menuList.appendChild(li);}
        
    }



menuList.addEventListener("click" , function(event) {
       if(event.target.tagName==="BUTTON"){
        const index=Number(event.target.dataset.index);
        const item=menu[index];


 const existingItem = cart.find(function(cartItem) {
            return cartItem.name.toLowerCase()=== item.name.toLowerCase();
       });

        if (existingItem) {
             existingItem.quantity++;
             } 
             else {
                 cart.push({
                     name: item.name,
                     price: item.price,
                     quantity: 1
                    });
                }
                renderCart();
            }
        });



function renderCart() {
     cartList.textContent = "";
      if (cart.length === 0) {
        cartList.textContent = "Your cart is empty";
    }
    for (let i = 0; i < cart.length; i++) {
        const li = document.createElement("li");
        const subtotal = cart[i].price * cart[i].quantity;
        li.textContent = cart[i].name + " x " + cart[i].quantity + " - $" + subtotal.toFixed(2) + " ";
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.dataset.index = i;
        minusButton.dataset.action = "minus";
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.dataset.index = i;
        plusButton.dataset.action = "plus";
        li.appendChild(minusButton);
        li.appendChild(plusButton);
        cartList.appendChild(li);
     }
     cartCount.textContent = cart.reduce(function(sum, item) {
        return sum + item.quantity;}, 0);
        updateTotal();
    }

cartList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const index = Number(event.target.dataset.index);
        const action = event.target.dataset.action;
        if (action === "plus") {
            cart[index].quantity++;
        } else if (action === "minus") {
            cart[index].quantity--;
            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }
        }
        renderCart();
    }
});


function updateTotal() {
    const total = cart.reduce(function(sum, item) {
         return sum + item.price * item.quantity;}, 0);
          cartTotal.textContent = total.toFixed(2);
          if (total > 15) {
            cartTotal.style.color = "red";
            rewardMessage.classList.remove("hidden");
        } else {
             cartTotal.style.color = "";
             rewardMessage.classList.add("hidden");
            }
        }

addCustomButton.addEventListener("click", function() {
    const name = itemName.value.trim();
     const priceText = itemPrice.value.trim();
     const price = Number(priceText);
      if (name === "") {
        errorMessage.textContent = "Name is required.";
         errorMessage.style.color = "red";
         return;
          }
     if (priceText === "" || isNaN(price) || price <= 0) {
        errorMessage.textContent ="Price must be a positive number.";
        errorMessage.style.color = "red";
         return;
        }
        for (let i = 0; i < menu.length; i++) {
             if (menu[i].name.toLowerCase() === name.toLowerCase()) {
             errorMessage.textContent ="This item is already on the menu.";
              errorMessage.style.color = "red";
              return;
            }
        }
        menu.push({ name: name, price: price });
        renderMenu();
         itemName.value = "";
         itemPrice.value = "";
         errorMessage.textContent = "";
        });


clearCartButton.addEventListener("click", function() {
    cart = [];
    renderCart();
});
renderMenu();
renderCart();
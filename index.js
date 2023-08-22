document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const clearCartButton = document.getElementById("clear-cart");
    const likeButtons = document.querySelectorAll(".like-btn");
    const addButtons = document.querySelectorAll(".add-btn");
    const quantityDecButtons = document.querySelectorAll(".decrease-quantity");
    const quantityIncButtons = document.querySelectorAll(".increase-quantity");
    const cartIcon = document.querySelector(".quantity");

    let cart = [];

    // Function to update the cart icon with the total quantity
    function updateCartIcon() {
        const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartIcon.textContent = totalQuantity;
    }

    // Add event listeners for like buttons
    likeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            button.classList.toggle("active");
        });
    });

    // Add event listeners for add buttons
    addButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const item = button.closest(".item");
            const itemName = item.querySelector("h2").textContent;
            const itemPrice = parseFloat(item.querySelector("p").textContent.slice(1));
            let quantity = parseInt(item.querySelector(".quantity").textContent);

            const cartItem = {
                name: itemName,
                price: itemPrice,
                quantity: quantity,
            };

            const existingItemIndex = cart.findIndex((item) => item.name === itemName);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(cartItem);
            }

            updateCart();
        });
    });

    // Add event listeners for quantity decrease buttons
    quantityDecButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const item = button.closest(".item");
            const itemName = item.querySelector("h2").textContent;
            const existingItemIndex = cart.findIndex((item) => item.name === itemName);

            if (existingItemIndex !== -1) {
                if (cart[existingItemIndex].quantity > 1) {
                    cart[existingItemIndex].quantity -= 1;
                }
            }

            updateCart();
        });
    });

    // Add event listeners for quantity increase buttons
    quantityIncButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const item = button.closest(".item");
            const itemName = item.querySelector("h2").textContent;
            const existingItemIndex = cart.findIndex((item) => item.name === itemName);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            }

            updateCart();
        });
    });

    // Event listener to clear the cart
    clearCartButton.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    // Function to update the cart and total
    function updateCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;

            cartItems.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        total.textContent = totalPrice.toFixed(2);
        updateCartIcon();
    }

    // Initial update of the cart icon
    updateCartIcon();
});

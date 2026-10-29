// Cart State
let cart = [];

// Add item to cart
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    updateCart();
    alert(name + " added to your cart!");
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Count and Modal UI
function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
    let cartItemsContainer = document.getElementById("cart-items");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            totalItems += item.qty;
            totalPrice += item.price * item.qty;

            let row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML = `
                <span>${item.name} (${item.qty}x)</span>
                <div>
                    <span>₹${item.price * item.qty}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
                </div>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    document.getElementById("cart-count").innerText = totalItems;
    document.getElementById("cart-total-price").innerText = totalPrice;
}

// Open and Close Cart Modal
function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some delicious items first.");
        return;
    }
    let total = document.getElementById("cart-total-price").innerText;
    alert("Thank you! Your order for ₹" + total + " has been placed successfully.");
    cart = [];
    updateCart();
    closeCart();
}

// Filter Menu Items by Category
function filterMenu(category, btn) {
    let tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(t => t.classList.remove("active"));
    btn.classList.add("active");

    let cards = document.querySelectorAll(".menu-grid .card");
    cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// Table Booking Form Handler
function bookTable(event) {
    event.preventDefault();
    let name = document.getElementById("book-name").value;
    let date = document.getElementById("book-date").value;
    let guests = document.getElementById("book-guests").value;

    alert("Table reserved successfully for " + name + " on " + date + " for " + guests + " guest(s)!");
    event.target.reset();
}

// Contact Form Handler
function sendMessage(event) {
    event.preventDefault();
    let name = document.getElementById("contact-name").value;
    alert("Thank you " + name + "! Your message has been sent to our team.");
    event.target.reset();
}

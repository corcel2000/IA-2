// Smooth Scrolling
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Link Highlighting on Scroll
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY + 100;
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        let section = document.getElementById(anchor.getAttribute('href').substring(1));
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
            anchor.classList.add('active');
        }
    });
});

// Hero Image Animation
window.addEventListener('load', () => {
    document.querySelector('.hero-image').style.transform = 'scale(1)';
    document.querySelector('.hero-image').style.opacity = '1';
});


/* Login script Section */

document.addEventListener("DOMContentLoaded", function () {
        let attempts = 0;
        const maxAttempts = 3;

        document.getElementById("form").addEventListener("submit", function (event) {
            event.preventDefault();

            let identifierInput = document.getElementById("login-identifier").value;
            let passwordInput = document.getElementById("login-password").value;

            // Simulated user credentials (Replace with real backend validation)
            const validUser = {
                username: "testuser",
                email: "test@example.com",
                password: "password123"
            };

            if ((identifierInput === validUser.email || identifierInput === validUser.username) && passwordInput === validUser.password) {
                alert("Login successful!");
                window.location.href = "creation_studio.html"; // Redirect to home page
            } else {
                attempts++;
                alert(`Invalid login. You have ${maxAttempts - attempts} attempts left.`);
                
                if (attempts >= maxAttempts) {
                    alert("Too many failed attempts! Redirecting to an error page.");
                    window.location.href = "error.html"; // Redirect to error page
                }
            }
        });
    });


/* Shop script Section */
// Global array to store products and cart items
let products = [
    { id: 1, name: "PreSonus Audio interface", price: 50, img: "PreSonus Audio interface.jpg" },
    { id: 2, name: "Drum-kit", price: 75, img: "Drum-kit image.jpg" },
    { id: 3, name: "Keyboard", price: 100, img: "Keyboard image.jpg" },
    { id: 4, name: "EV-Wedge Speaker", price: 100, img: "EV-Wedge Speaker Image.jpg" },
    { id: 5, name: "Microphone", price: 100, img: "Microphone Image.jpg" },
    { id: 6, name: "Headphones", price: 100, img: "Headphones.jpg" },
    { id: 7, name: "XLR Audio Cable", price: 100, img: "XLR Audio Cable.jpg" },
    { id: 8, name: "Record Player", price: 100, img: "Record Player.jpg" },
    { id: 9, name: "Guitar", price: 100, img: "Guitar image.jpg" },
    // Add more products as needed
];

let cart = [];

// Function to add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart)); // Store cart in localStorage
        alert(`${product.name} has been added to your cart.`);
        updateCart();
    }
}

// Function to update the cart icon and cart content
function updateCart() {
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = cart.length;
    
    // Update cart icon count
    cartIcon.innerHTML = `🛒 (${cartCount})`;

    // Optionally, you can log the cart items in the console
    console.log(cart);
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        addToCart(products[index].id);
    });
});

// Event listener for Checkout button
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Proceeding to checkout...");
        // Redirect or load invoice page
        window.location.href = "Invoice.html"; // Change to your invoice page
    } else {
        alert("Your cart is empty. Please add items to the cart.");
    }
});

// Event listener for Cancel button
document.getElementById("cancel").addEventListener("click", () => {
    cart = []; // Clear the cart
    alert("Your cart has been cleared.");
    updateCart();
});

// Event listener for Exit button
document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "creation_studio.html"; // Redirect to the home page
});


/* Invoice Script Section */
// Function to load cart data and calculate totals
function loadInvoice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("No items in the cart!");
        window.location.href = "shop.html"; // Redirect if no cart items
        return;
    }

    // Add products to the invoice table
    const invoiceItems = document.getElementById("invoice-items");
    let subtotal = 0;

    cart.forEach(product => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = product.name;
        row.appendChild(productName);

        const productPrice = document.createElement("td");
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        row.appendChild(productPrice);

        invoiceItems.appendChild(row);
        subtotal += product.price;
    });

    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Display subtotal, tax, and total
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

// Event listener for the Exit button
document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "shop.html"; // Redirect to shop page
});

// Load invoice data when the page is ready
window.onload = loadInvoice;


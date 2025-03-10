// Smooth Scrolling (Fixed for External Links)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith("#")) { // Only apply for internal links
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
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
        const validUser  = {
            username: "testuser",
            email: "test@example.com",
            password: "password123"
        };

        if ((identifierInput === validUser .email || identifierInput === validUser .username) && passwordInput === validUser .password) {
            alert("Login successful!");
            window.location.href = "creation_studio.html";
        } else {
            attempts++;
            alert(`Invalid login. You have ${maxAttempts - attempts} attempts left.`);

            if (attempts >= maxAttempts) {
                alert("Too many failed attempts! Redirecting to an error page.");
                window.location.href = "error.html";
            }
        }
    });
});

/* Shop script Section */
let products = [
    { id: 1, name: "PreSonus Audio interface", price: 30814.34, img: "PreSonus Audio interface.jpg" },
    { id: 2, name: "Drum-kit", price: 783405.29, img: "Drum-kit image.jpg" },
    { id: 3, name: "Keyboard", price: 830574.15, img: "Keyboard image.jpg" },
    { id: 4, name: "EV-Wedge Speaker", price: 282202.75, img: "EV-Wedge Speaker Image.jpg" },
    { id: 5, name: "Microphone", price: 7859.23, img: "Microphone Image.jpg" },
    { id: 6, name: "Headphones", price: 42350.85, img: "Headphones.jpg" },
    { id: 7, name: "XLR Audio Cable", price: 5816.99, img: "XLR Audio Cable.jpg" },
    { id: 8, name: "Record Player", price: 34430.31, img: "Record Player.jpg" },
    { id: 9, name: "Guitar", price: 47007.59, img: "Guitar image.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            alert(`${product.name} is already in your cart.`);
        } else {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} has been added to your cart.`);
            updateCart();
        }
    }
}
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


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product removed from cart.`);
    updateCart();
}

function updateCart() {
    const cartIcon = document.querySelector(".cart-icon");
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartIcon) {
        cartIcon.innerHTML = `🛒 (${cart.length})`;
    }
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" />
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Cancel</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    console.log(cart);
}
function loadInvoice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const invoiceItemsContainer = document.getElementById("invoice-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    let subtotal = 0;

    // Clear existing items
    invoiceItemsContainer.innerHTML = "";

    // Populate invoice items
    cart.forEach(item => {
        const itemElement = document.createElement("tr");
        itemElement.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
        `;
        invoiceItemsContainer.appendChild(itemElement);
        subtotal += item.price;
    });

    // Calculate tax and total
    const tax = subtotal * 0.10; // Assuming 10% tax
    const total = subtotal + tax;

    // Update totals in the invoice
    subtotalElement.innerText = subtotal.toFixed(2);
    taxElement.innerText = tax.toFixed(2);
    totalElement.innerText = total.toFixed(2);
}

// Call loadInvoice on window load
window.onload = () => {
    if (document.getElementById("invoice-items")) {
        loadInvoice();
    }
    updateCart(); // Ensure the cart is updated on the shop page
}; 


function loadInvoice() {
    // Same logic as before
}

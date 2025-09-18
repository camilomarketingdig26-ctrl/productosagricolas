/*
 _______       _            _     _          ______        _                 _ 
(_______)     (_)       _  (_)   | |        (____  \      (_)               | |
 _______  ____ _  ___ _| |_ _  __| |_____    ____)  ) ____ _ _____ ____   __| |
|  ___  |/ ___) |/___|_   _) |/ _  | ___ |  |  __  ( / ___) (____ |  _ \ / _  |
| |   | | |   | |___ | | |_| ( (_| | ____|  | |__)  ) |   | / ___ | | | ( (_| |
|_|   |_|_|   |_(___/   \__)_|\____|_____)  |______/|_|   |_\_____|_| |_|\____|
    
Auteur: undefined(undefined) 
app.js(Ɔ) 2025
Description : Saisissez la description puis « Tab »
Créé le :  mardi 16 septembre 2025 à 13:34:45 
Dernière modification : mardi 16 septembre 2025 à 15:49:53
*/

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = [];

  // Renderizar el carrito
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      cartTotal.innerHTML = "<strong>Total:</strong> $0 COP";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <span>${item.quantity} ${item.unit} de ${item.name}</span>
        <span>$${(item.price * item.quantity).toLocaleString("es-CO")} COP</span>
      `;
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `<strong>Total:</strong> $${total.toLocaleString("es-CO")} COP`;
  }

  // Escuchar botones "Añadir"
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product");
      const productPrice = parseInt(btn.getAttribute("data-price"));
      const quantityInput = btn.previousElementSibling;
      const quantity = parseInt(quantityInput.value);

      // Detectar unidad según texto al lado del input
      const unit = quantityInput.nextSibling.textContent.trim();

      if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor ingresa una cantidad válida.");
        return;
      }

      const existing = cart.find(item => item.name === productName);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name: productName, price: productPrice, quantity, unit });
      }
      renderCart();
    });
  });

  // Botón de finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío 🛒");
    } else {
      alert("¡Gracias por tu compra! 🥬🍅🥔 Tu pedido será procesado.");
      cart = [];
      renderCart();
    }
  });

  // Render inicial
  renderCart();
});
// --- Formulario de contacto ---
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // evita que la página se recargue
      alert("✅ ¡Gracias por tu aporte! Nos pondremos en contacto pronto.");
      contactForm.reset(); // limpia los campos del formulario
    });
  }
});
// Variable global para almacenar los productos en el carrito
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutFormSection = document.getElementById('checkout-form');
const purchaseForm = document.getElementById('purchase-form');
const cancelPurchaseBtn = document.getElementById('cancel-purchase');

// Función para actualizar el carrito en la interfaz
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span>${item.name} (${item.quantity} kg)</span>
      <span>$${item.price * item.quantity} COP</span>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotalElement.querySelector('strong').textContent = `Total: $${total} COP`;

  // Muestra u oculta el botón de finalizar compra si hay elementos en el carrito
  if (cart.length > 0) {
    checkoutBtn.style.display = 'block';
  } else {
    checkoutBtn.style.display = 'none';
  }
}

// Lógica de los botones "Añadir"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(e.target.dataset.price);
    const productQuantity = parseInt(productCard.querySelector('input').value);

    // Revisa si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += productQuantity;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: productQuantity
      });
    }

    updateCart();
  });
});

// Evento para mostrar el formulario de checkout al hacer clic en "Finalizar Compra"
checkoutBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    checkoutFormSection.style.display = 'flex';
  } else {
    alert('Tu carrito está vacío. Agrega productos para continuar.');
  }
});

// Evento para cancelar la compra y ocultar el formulario
cancelPurchaseBtn.addEventListener('click', () => {
  checkoutFormSection.style.display = 'none';
});

// Evento para procesar el formulario de compra
purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene que el formulario se envíe de forma tradicional

  const customerName = document.getElementById('checkout-name').value;
  const customerAddress = document.getElementById('checkout-address').value;
  const customerPhone = document.getElementById('checkout-phone').value;
  const customerEmail = document.getElementById('checkout-email').value;

  // Aquí puedes enviar los datos a un servidor
  // Por ahora, solo mostraremos un mensaje en la consola y una alerta
  console.log('Detalles de la compra:');
  console.log('Cliente:', customerName);
  console.log('Dirección:', customerAddress);
  console.log('Teléfono:', customerPhone);
  console.log('Email:', customerEmail);
  console.log('Productos:', cart);

  alert(`¡Compra realizada con éxito!
  Te contactaremos en breve, ${customerName}.
  Tu pedido será enviado a la dirección: ${customerAddress}.`);

  // Restablece el carrito y el formulario después de la compra
  cart = [];
  updateCart();
  purchaseForm.reset();
  checkoutFormSection.style.display = 'none';
});

// Asegura que el botón de finalizar compra esté oculto al cargar la página si el carrito está vacío
updateCart();
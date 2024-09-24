// content.js

function showModal() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div id="myModal" style="
      position: fixed;
      z-index: 9999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    ">
      <h2>Do you really want to pack this the next time you move?</h2>
      <p>This is placeholder text for the modal content.</p>
      <button id="confirmYes">Yes. I really want to pack all of this the next time I move.</button>
      <button id="confirmNo">No. I'm good.</button>
    </div>
  `;
  
  document.body.appendChild(modal);

  // Event listeners for buttons
  document.getElementById('confirmYes').addEventListener('click', function() {
      closeModal();
      enableCheckoutButton();
  });

  document.getElementById('confirmNo').addEventListener('click', function() {
      closeModal();
      clearCart();  // Custom function to clear the cart and show savings
  });
}

function closeModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
      modal.remove();  // Removes the modal from DOM
  }
}

function disableCheckoutButton() {
  const checkoutBtn = document.querySelector('button.checkout');  // Replace with the actual selector for your checkout button
  if (checkoutBtn) {
      checkoutBtn.disabled = true;
  }
}

function enableCheckoutButton() {
  const checkoutBtn = document.querySelector('button.checkout');  // Replace with the actual selector for your checkout button
  if (checkoutBtn) {
      checkoutBtn.disabled = false;
  }
}

// Function to clear the cart and show savings
function clearCart() {
  // Find the cart total on the page (adjust this selector based on the actual site)
  const cartTotalElement = document.querySelector('.cart-total');  // Replace with the correct selector
  let cartTotal = 0;

  if (cartTotalElement) {
      // Get the cart total value and parse it to a number
      const totalText = cartTotalElement.textContent.replace(/[^0-9.-]+/g,"");  // Remove currency symbols
      cartTotal = parseFloat(totalText);
  }

  // Assuming you have logic here to clear the cart (e.g., remove all items from the cart)
  console.log('Cart cleared! Total was:', cartTotal);

  // Show second modal with savings
  showSavingsModal(cartTotal);
}

// Function to show the second modal with savings information
function showSavingsModal(savings) {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div id="savingsModal" style="
      position: fixed;
      z-index: 9999;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    ">
      <h2>Wise choice!</h2>
      <p>You saved <strong>$${savings.toFixed(2)}</strong> by not purchasing these items.</p>
      <button id="closeSavingsModal">Close</button>
    </div>
  `;
  
  document.body.appendChild(modal);

  // Close the modal when the user clicks the button
  document.getElementById('closeSavingsModal').addEventListener('click', function() {
      const savingsModal = document.getElementById('savingsModal');
      if (savingsModal) {
          savingsModal.remove();  // Removes the second modal
      }
  });
}

// Function to detect if we're on the checkout page
function isCheckoutPage() {
  // This logic will vary based on the URL structure or page content of the site
  return window.location.pathname.includes('checkout');  // Customize this for your website
}

// Main execution logic
if (isCheckoutPage()) {
  disableCheckoutButton();  // Disable the checkout button until modal interaction
  showModal();
}

// Listen for messages from background or popup scripts
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
  console.log('Message received:', request);
  if (request.action === "showModal") {
      showModal();
  }
}

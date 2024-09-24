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
        <h2>Modal Title</h2>
        <p>This is placeholder text for the modal content.</p>
        <button onclick="this.parentElement.style.display='none'">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  function handleMessage(request, sender, sendResponse) {
    console.log('Message received:', request);
    if (request.action === "showModal") {
      showModal();
    }
  }
  
  // Main execution
  browser.runtime.onMessage.addListener(handleMessage);
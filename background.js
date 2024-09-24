importScripts('lib/browser-polyfill.js');

console.log('Background script loaded');

browser.permissions.contains({
  permissions: ['tabs']
}).then((result) => {
  if (result) {
    console.log('The extension has the "tabs" permission.');
  } else {
    console.log('The extension does not have the "tabs" permission.');
  }
});

function logTabUpdate(tabId, changeInfo, tab) {
  console.log('Tab updated:', tabId, changeInfo, tab);
}

function handleTabUpdate(tabId, changeInfo, tab) {
    console.log('Tab updated event:', tabId, changeInfo, tab);
    if (changeInfo.status === 'complete') {
      console.log('Tab loading complete, querying active tab...');
      queryActiveTab(tabId);
    } else {
      console.log('Tab update not complete, status:', changeInfo.status);
    }
  }

  function handleQueryError() {
    console.log('Bummers dude...');
  }

function queryActiveTab(tabId) {
    console.log('Querying tabs...');
    browser.tabs.query({})
      .then(tabs => {
        console.log('All tabs query result:', tabs);
        if (tabs && tabs.length > 0) {
          console.log('Tabs found:', tabs.length);
          
          // Filter to find the active tab
          const activeTabs = tabs.filter(tab => tab.active);
          
          if (activeTabs.length > 0) {
            console.log('Active tab found:', activeTabs[0]);
            handleQueryResult(activeTabs[0]);
          } else {
            console.log('No active tab found among the tabs');
          }
        } else {
          console.log('No tabs found at all');
        }
      })
      .catch(handleQueryError);
  }
  
  function handleQueryResult(tab) {
    console.log('Handling query result for tab:', tab);
    checkUrlPattern(tab);
  }
  


  function checkUrlPattern(tab) {
    const url = tab.url;
    console.log('Checking URL pattern for:', url);
    const urlPattern = /target\.com/; // Replace with your desired pattern
    if (urlPattern.test(url)) {
      console.log('URL matches pattern, sending show modal message');
      sendShowModalMessage(tab.id);
    } else {
      console.log('URL does not match pattern');
    }
  }
  
  function sendShowModalMessage(tabId) {
    console.log('Sending show modal message to tab:', tabId);
    browser.tabs.sendMessage(tabId, { action: "showModal" })
      .then(() => console.log('Message sent successfully'))
      .catch(error => console.error('Error sending message:', error));
  }

function getCurrentTab() {
    browser.tabs.getCurrent()
      .then(tab => {
        if (tab) {
          console.log('Current tab:', tab);
        } else {
          console.log('Unable to get current tab');
        }
      })
      .catch(error => console.error('Error getting current tab:', error));
  }
  
  // Call this function in your handleTabUpdate function

  function checkChromeAPI() {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({}, function(tabs) {
        console.log('Chrome API tabs:', tabs);
      });
    } else {
      console.log('Chrome API not available');
    }
  }
  
  // Call this function in your background script

// Main execution
browser.tabs.onUpdated.addListener(handleTabUpdate);
browser.tabs.onCreated.addListener((tab) => {
    console.log('New tab created:', tab);
  });
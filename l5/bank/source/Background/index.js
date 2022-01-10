var onMessageHandler = function (message) {
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);

  // code from https://stackoverflow.com/a/7404033/934239
};

chrome.runtime.onMessage.addListener(onMessageHandler);

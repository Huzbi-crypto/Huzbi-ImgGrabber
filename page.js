chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    addImagesToContainer(message);
    sendResponse('success');
});

function addImagesToContainer(imageUrls) {
    document.write(JSON.stringify(imageUrls));
}
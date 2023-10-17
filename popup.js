const grabBtn = document.getElementById('grabBtn');
grabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            // alert(tab.id)
            // chrome.scripting.executeScript(
            //     {
            //         target: {tabId: tab.id, allFrames: true},
            //         function: grabImages
            //     },
            //     onResult
            // )
            execScript(tab)
        } else {
            alert('No active tab found')
        }
    })
})

function execScript(tab) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id, allFrames: true},
            function: grabImages
        },
        onResult
    )
}

function grabImages() {
    const images = document.querySelectorAll('img');
    return Array.from(images).map(image=>image.src);
}

function onResult(frames) {
    if (!frames || !frames.length) {
        alert("Could not retrieve images from specified page");
        return;
    }

    const imageUrls = frames.map(frame=>frame.result).reduce((r1, r2) => r1.concat(r2));

    // window.navigator.clipboard.writeText(imageUrls.join("\n")).then(() => {
    //     window.close();
    // })

    openImagesPage(imageUrls);
}

function openImagesPage(imageUrls) {
    chrome.tabs.create(
        {
            "url": "page.html",
            "active": false
        },
        (tab) => {
            // alert(tab.id);
            // chrome.tabs.update(tab.id, {active: true});
            setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, imageUrls, (response) => {
                    chrome.tabs.update(tab.id, {active: true});
                });
            }, 500);
        }
    );
}
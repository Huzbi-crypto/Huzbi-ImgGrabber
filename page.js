document.getElementById("selectAll").addEventListener("change", (event) => {
    const items = document.querySelectorAll(".container input[type=checkbox]");
    for (let item of items) {
        item.checked = event.target.checked;
    };
})

document.getElementById("downloadBtn").addEventListener("click", async () => {
    try {
        const urls = getSelectedUrls();
        const archive = await createArchive(urls);
        downloadArchive(archive);
    } catch (err) {
        alert(err.message);
    }
})

function getSelectedUrls() {
    const urls = Array.from(document.querySelectorAll(".container input[type=checkbox]")).filter(item => item.checked).map(item => item.getAttribute("image"));
    if (!urls || !urls.length) {
        throw new Error("No images selected");
    }
    return urls;
}

async function createArchive(urls) {
    for (let i in urls) {
        const url = urls[i];
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            console.log(blob);
        } catch (err) {
            console.error(err);
        }
    };
}

function downloadArchive(archive) {}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    addImagesToContainer(message);
    sendResponse('success');
});

function addImagesToContainer(imageUrls) {
    // document.write(JSON.stringify(imageUrls));
    if (!imageUrls || !imageUrls.length) {
        alert("Could not retrieve images from specified page");
        return;
    }
    const container = document.querySelector(".container");
    imageUrls.forEach(image => addImageNode(container, image)); // where image is the link of each individual image found
}

function addImageNode(container, image) {
    const div = document.createElement("div");
    div.className = "imageDiv";
    const img = document.createElement("img");
    img.src = image;
    div.appendChild(img);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("iamge", image);
    div.appendChild(checkbox);
    container.appendChild(div);
}
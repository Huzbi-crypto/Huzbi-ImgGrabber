# Introduction

This is an extension created mostly for my needs. The extension grabs all `img` tags from the active tab, the one you are currently viewing, copies their URLs, downloads them, and then create an archive file of those files.

## Download

You can check the [releases](https://github.com/Huzbi-crypto/Huzbi-ImgGrabber/releases/tag/v1.0.0) to get the latest stable version.

Or, you can do the following to keep with the latest release (will be unstable!):

- `git clone` this repository.
- Open you chrome browser and go to this browser page chrome://extensions/.
- On the top right of the page, enable "Developer Mode" if it isn't enabled already.
- Now, on the same page's top left corner, click on "Load unpacked".
- Select the cloned repo's folder and the extension will be installed.

## How to use

Just click on **Grab Images!** and it will search the page with all `img` tagged elements and show them on a new tab; `page.html`.

## Status

All basic functionalities:

- Fetch all images from the current active tab.
- Option to select all or manually select fetched images.
- Downloads inside a zip folder.

Next stage is to implement a functionality to fetch those images that don't allow their `img` urls to be visited outside of their original page.

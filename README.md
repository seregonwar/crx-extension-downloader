# CRX Extension Downloader

This JavaScript script allows you to easily download Chrome extensions in `.crx` format directly from a web page.


## How to Use

1. Open the Chrome Web Store page of the extension you want to download.
2. Open the browser console (`F12` or `Ctrl+Shift+I`, then select the "Console" tab).
3. Copy and paste the script into the console and press `Enter`.
4. The download of the extension in `.crx` format should start automatically."



## How the Script Works

The script consists of several parts, each with a specific function. Here is a detailed explanation of how it works:

### 1. Extracting the Extension ID

The first part of the script extracts the extension ID from the current page's URL. This is necessary because the extension ID is used to construct the manifest URL for downloading the `.crx` file.

```javascript
const extensionId = location.href.split('/').pop().split('?')[0];
```

- `location.href` gets the full URL of the current page.
- `split('/')` splits the URL into an array using the '/' character as the delimiter.
- `pop()` takes the last element of the array, which represents the extension ID.
- `split('?')[0]` removes any query strings from the extension ID.

### 2. Creating the Manifest URL

Using the extracted extension ID, the script creates a URL that points to the extension's `.crx` manifest file. This URL is used to initiate the download.

```javascript
const manifestUrl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx2,crx3&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
```

- `manifestUrl` is a string containing the manifest URL, with the extension ID embedded.

### 3. Creating and Loading the Hidden Iframe

The script creates a hidden iframe and adds it to the document to load the manifest URL. The iframe is used to handle the download invisibly to the user.

```javascript
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);
iframe.src = manifestUrl;
```

- `document.createElement('iframe')` creates a new iframe element.
- `iframe.style.display = 'none'` hides the iframe.
- `document.body.appendChild(iframe)` adds the hidden iframe to the document body.
- `iframe.src = manifestUrl` sets the manifest URL as the iframe's source.

### 4. Handling the Iframe Load

When the iframe loads the manifest, the script checks if the response URL contains a valid link to the `.crx` file. If the link is valid, a temporary `<a>` element is created to start the download of the `.crx` file.

```javascript
iframe.onload = function() {
    const responseUrl = iframe.contentWindow.location.href;
    if (responseUrl.includes('.crx')) {
        const a = document.createElement('a');
        a.href = responseUrl;
        a.download = `${extensionId}.crx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log('Download started for extension:', extensionId);
    } else {
        console.error('Error during .crx file download');
    }
    document.body.removeChild(iframe);
};
```

- `iframe.onload` is a function that executes when the iframe finishes loading.
- `responseUrl` gets the response URL from the iframe.
- `if (responseUrl.includes('.crx'))` checks if the response URL contains a valid link to the `.crx` file.
- `document.createElement('a')` creates a new `<a>` element.
- `a.href = responseUrl` sets the `.crx` file URL as the `<a>` element's href.
- `a.download = `${extensionId}.crx`` sets the name of the file to be downloaded.
- `document.body.appendChild(a)` temporarily adds the `<a>` element to the document body.
- `a.click()` simulates a click on the `<a>` element to start the download.
- `document.body.removeChild(a)` removes the `<a>` element from the document.
- `console.log('Download started for extension:', extensionId)` logs a confirmation message to the console.

### 5. Handling Errors

The script includes a function to handle any errors that occur during the iframe loading process.

```javascript
iframe.onerror = function() {
    console.error('Error: Unable to load iframe.');
    document.body.removeChild(iframe);
};
```

- `iframe.onerror` is a function that executes if an error occurs during the iframe loading.
- `console.error('Error: Unable to load iframe.')` logs an error message to the console.
- `document.body.removeChild(iframe)` removes the iframe from the document.

### Conclusion

This script is an example of how to use JavaScript to automate the download of `.crx` files from a Chrome Web Store page. It extracts the extension ID from the URL, creates a manifest URL, uses a hidden iframe to handle the download, and manages any errors that may occur during the process.

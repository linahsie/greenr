/*
The last step for the popup UI is adding color to the button.

This code grabs the button from popup.html and requests the color value from storage. 
It then applies the color as the background of the button. 
*/

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

/*
Layer Logic

The extension now knows the popup should be available to users on developer.chrome.com 
and displays a colored button, 
but needs logic for further user interaction.
*/
changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
};
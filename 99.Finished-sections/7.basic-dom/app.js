// document.body.children[2].children[0].href = 'https://www.google.com';

let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://www.naver.com';

anchorElement = document.querySelector('#external-link');
anchorElement.href = 'https://www.google.com';

// ADD AN ELEMENT
// 1. Create the new element

let newAnchorElement = document.createElement('a');
newAnchorElement.href = 'https://google.com';
newAnchorElement.textContent = 'To Google';

// 2. Get access to the parent element that should hold the new element

let firstParagraph = document.querySelector('p');

// 3. Insert the new element into the parent element content

firstParagraph.append(newAnchorElement);

// RMOVE ELEMENT
let firstH1Element = document.querySelector('h1');

firstH1Element.remove();
// firstH1Element.parentElement.removeChild(firstH1Element); // for older browser

// MOVE ELEMENT
firstParagraph.parentElement.append(firstParagraph);

// innerHTML
firstParagraph.innerHTML = 'Hi This is <strong>important!</strong>';

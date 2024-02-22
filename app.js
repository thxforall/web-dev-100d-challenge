const productNameInputElement = document.getElementById('product-name');
const inputLength = document.getElementById('input-length');
const maxLength = productNameInputElement.maxLength;

function countInputLength(event) {
  const inputText = event.target.value;
  const inputTextLength = inputText.length;

  const remainingCharacters = maxLength - inputTextLength;
  inputLength.textContent = remainingCharacters;
}

productNameInputElement.addEventListener('input', countInputLength);

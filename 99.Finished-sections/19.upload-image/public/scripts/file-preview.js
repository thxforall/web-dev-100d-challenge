const uploadImageInput = document.getElementById('image');
const previewImageElement = document.getElementById('preview-image');

uploadImageInput.addEventListener('change', () => {
  const files = uploadImageInput.files;
  if (!files || files.length === 0) {
    previewImageElement.style.display = 'none';
    return;
  }
  const previewFile = files[0];
  previewImageElement.src = URL.createObjectURL(previewFile);
  previewImageElement.style.display = 'block';
});

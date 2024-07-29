const imagePicekElement = document.querySelector('.image_upload_control input');
const imagePreviewElement = document.querySelector('.image_upload_control img');

const updateImagePreview = () => {
  const files = imagePicekElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
};

imagePicekElement.addEventListener('change', updateImagePreview);

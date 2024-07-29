const deleteProductBtnElements = document.getElementsByClassName('deleteBtn');

const deleteProduct = async (event) => {
  try {
    const btnElement = event.target;
    const productId = btnElement.dataset.productid;

    const response = await fetch(`/admin/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the product.');
    }

    btnElement.closest('.product-item').remove();
  } catch (error) {
    alert('Something went wrong!');
    console.error(error);
  }
};

for (let i = 0; i < deleteProductBtnElements.length; i++) {
  deleteProductBtnElements[i].addEventListener('click', deleteProduct);
}

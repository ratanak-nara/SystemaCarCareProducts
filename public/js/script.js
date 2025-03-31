document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Function to load products
async function loadProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();
        console.log('Products:', products); // Log the fetched products to the console

        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear previous entries

        // Render the products in the UI
        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
        } else {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p>${product.description}</p>
                    ${product.photo ? `<img src="${product.photo}" alt="${product.name}">` : ''}
                `;

                productList.appendChild(productDiv);
            });
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// script.js
async function loadProducts() {
    try {
        const response = await fetch('products.db');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        const db = new SQL.Database(new Uint8Array(buffer));

        const results = db.exec("SELECT * FROM products");
        if (!results || results.length === 0) {
            throw new Error("No products found in the database.");
        }
        const products = results[0].values;

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const [id, name, description, price, image, category] = product;
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="images/${image}" class="card-img-top" alt="${name}">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${description.substring(0, 100)}...</p>
                            <p class="card-text">$${price}</p>
                            <a href="product.html?id=${id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        db.close();
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-list').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

loadProducts();


let data = { siteTitle: "My Store", contactLinks: [], products: [] };

fetch('../data/products.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderAdminProducts();
  });

document.getElementById("product-form").onsubmit = function(e) {
  e.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    image: document.getElementById("image").value,
    price: +document.getElementById("price").value,
    description: document.getElementById("description").value
  };
  data.products.push(product);
  renderAdminProducts();
};

function renderAdminProducts() {
  const div = document.getElementById("admin-products");
  div.innerHTML = data.products.map((p, i) => `
    <div>
      <strong>${p.name}</strong> - $${p.price}
      <button onclick="deleteProduct(${i})">Delete</button>
    </div>
  `).join("");
}

function deleteProduct(index) {
  data.products.splice(index, 1);
  renderAdminProducts();
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.json";
  a.click();
}

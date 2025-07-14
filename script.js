
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById("site-title").textContent = data.siteTitle;
    const links = data.contactLinks.map(link => 
      `<a href="${link.url}" target="_blank">${link.name}</a>`).join(" | ");
    document.getElementById("contact-links").innerHTML = links;

    const productList = document.getElementById("product-list");
    productList.innerHTML = data.products.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>$${p.price}</strong>
      </div>
    `).join("");
  });

(() => {
  const products = window.ZINCO_PRODUCTS || [];
  const grid = document.getElementById("productGrid");
  const tbody = document.getElementById("priceTableBody");
  const select = document.getElementById("customerProduct");
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const getProducts = () => {
    try { return JSON.parse(localStorage.getItem("zincoProducts")) || products; }
    catch { return products; }
  };
  const render = () => {
    const list = getProducts();
    if (grid) grid.innerHTML = list.map((p,i) => `
      <article class="product-card">
        <div class="roof-art"><div class="roof-sheet ${escapeHTML(p.tone || "blue")}"></div></div>
        <div class="product-info"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description || "Contact us for product details and availability.")}</p>
        <div class="product-price">${escapeHTML(p.price)} <small>/ metre</small></div>
        <a href="https://wa.me/254752682855?text=${encodeURIComponent("Hello Zinco Mabati, I am interested in " + p.name + ". Please send me a quotation.")}" target="_blank" rel="noopener">ENQUIRE ABOUT THIS PRODUCT →</a></div>
      </article>`).join("");
    if (tbody) tbody.innerHTML = list.map(p => `<tr><td>${escapeHTML(p.name)}</td><td>${escapeHTML(p.price)}</td><td><button type="button" data-product="${escapeHTML(p.name)}">Enquire</button></td></tr>`).join("");
    if (select) select.innerHTML = '<option value="">Select a mabati type</option>' + list.map(p => `<option>${escapeHTML(p.name)}</option>`).join("");
  };
  render();
  document.addEventListener("click", e => {
    const button = e.target.closest("[data-product]");
    if (button) {
      const message = `Hello Zinco Mabati, please send me a quotation for ${button.dataset.product}.`;
      window.open("https://wa.me/254752682855?text=" + encodeURIComponent(message), "_blank", "noopener");
    }
  });
  const toggle = document.getElementById("menuToggle"), nav = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕" : "☰";
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle?.setAttribute("aria-expanded","false"); if(toggle) toggle.textContent="☰";
  }));
  document.getElementById("enquiryForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = [
      "Hello Zinco Mabati Rolling Mills Factory.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Product: ${data.get("product") || "Not specified"}`,
      `Enquiry: ${data.get("message") || "Please contact me with more information."}`
    ].join("\n");
    window.open("https://wa.me/254752682855?text=" + encodeURIComponent(message), "_blank", "noopener");
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
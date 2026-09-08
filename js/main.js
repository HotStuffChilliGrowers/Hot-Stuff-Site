document.getElementById("year").textContent = new Date().getFullYear();

const bandColors = ["#4b5842", "#d9a62e", "#b23a2e", "#8f2d23", "#241a12"];

function heatDots(level) {
  const total = 5;
  const filled = "\u25CF".repeat(level);
  const empty = "\u25CB".repeat(total - level);
  return `Heat  ${filled}${empty}`;
}

function productCard(p) {
  const bandColor = bandColors[Math.min(p.heat, 5) - 1] || "#4b5842";
  const image = p.image
    ? `<img class="product-image" src="${p.image}" alt="${p.name} jar of Hot Stuff chilli jam">`
    : `<div class="product-image placeholder" style="background:${bandColor}22;">
         <svg width="72" height="72" viewBox="0 0 100 100" aria-hidden="true">
           <path d="M40 20 C25 25 18 45 28 62 C38 79 62 82 74 68 C86 54 82 34 68 24 C58 17 48 16 40 20 Z" fill="${bandColor}"/>
         </svg>
       </div>`;

  const shippingFlat = window.__HS_SHIPPING_FLAT__ || "0";
  const shippingExtra = window.__HS_SHIPPING_EXTRA__ || "0";

  return `
    <div class="product-card">
      ${image}
      <div class="product-band" style="background:${bandColor};"></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-heat">${heatDots(Math.min(Math.max(p.heat, 1), 5))}</div>
        <p class="desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price} NZD</span>
          <form class="buy-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="${window.__HS_PAYPAL_EMAIL__ || ""}">
            <input type="hidden" name="item_name" value="Hot Stuff Chilli Jam - ${p.name}">
            <input type="hidden" name="amount" value="${p.price}">
            <input type="hidden" name="currency_code" value="NZD">
            <input type="hidden" name="shipping" value="${shippingFlat}">
            <input type="hidden" name="shipping2" value="${shippingExtra}">
            <label class="qty-label">
              Qty
              <input class="qty-input" type="number" name="quantity" value="1" min="1" max="20">
            </label>
            <button type="submit">Buy jar</button>
          </form>
        </div>
      </div>
    </div>`;
}

async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function init() {
  try {
    const site = await loadJSON("content/site.json");
    document.getElementById("hero-heading").textContent = site.hero_heading || "Hot Stuff";
    document.getElementById("hero-subheading").textContent = site.hero_subheading || "";
    document.getElementById("story-heading").textContent = site.story_heading || "";
    document.getElementById("story-text").textContent = site.story_text || "";
    document.getElementById("location-line").textContent = site.location_line || "";
    document.title = `${site.hero_heading || "Hot Stuff"} — Sweet Chilli Jam`;
    window.__HS_PAYPAL_EMAIL__ = site.paypal_email || "";
    window.__HS_SHIPPING_FLAT__ = site.shipping_flat_rate || "0";
    window.__HS_SHIPPING_EXTRA__ = site.shipping_extra_per_jar || "0";

    const shippingNoteEl = document.getElementById("shipping-note");
    if (shippingNoteEl) shippingNoteEl.textContent = site.shipping_note || "";

    if (site.hero_image) {
      const heroArt = document.querySelector(".hero-art");
      heroArt.innerHTML = `<img src="${site.hero_image}" alt="" style="width:100%;height:100%;object-fit:cover;">`;
    }
    if (site.story_image) {
      const storyArt = document.querySelector(".story-art");
      storyArt.innerHTML = `<img src="${site.story_image}" alt="" style="width:100%;height:100%;object-fit:cover;">`;
    }

    document.getElementById("video-heading").textContent = site.video_heading || "";
    document.getElementById("video-caption").textContent = site.video_caption || "";
    if (site.video_file) {
      const videoSquare = document.getElementById("video-square");
      const poster = site.video_poster ? ` poster="${site.video_poster}"` : "";
      videoSquare.innerHTML = `<video src="${site.video_file}"${poster} controls playsinline></video>`;
    }
  } catch (e) {
    console.warn("Could not load site content, using defaults.", e);
  }

  try {
    const data = await loadJSON("content/products.json");
    const grid = document.getElementById("product-grid");
    grid.innerHTML = (data.products || []).map(productCard).join("");
  } catch (e) {
    console.warn("Could not load products.", e);
  }

  try {
    const gallery = await loadJSON("content/gallery.json");
    renderGallery((gallery.images || []).slice(0, 20));
  } catch (e) {
    console.warn("Could not load gallery.", e);
  }

  setupLightbox();
}

function renderGallery(images) {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = images.map((item, i) => {
    if (item.image) {
      return `<button class="gallery-item" data-index="${i}" data-src="${item.image}" aria-label="View image${item.caption ? ": " + item.caption : ""}">
        <img src="${item.image}" alt="${item.caption || ""}" loading="lazy">
      </button>`;
    }
    return `<div class="gallery-item placeholder">
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="#4b5842" stroke-width="3"/></svg>
    </div>`;
  }).join("");
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  document.getElementById("gallery-grid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item[data-src]");
    if (!item) return;
    lightboxImg.src = item.dataset.src;
    lightboxImg.alt = item.querySelector("img")?.alt || "";
    lightbox.classList.add("open");
  });

  function close() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

init();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

// aria-expanded le dice al lector de pantalla si el menú está abierto o cerrado.
// Sin esto solo anuncia "botón" y la persona no sabe qué pasó al presionarlo.
function setNav(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
  setNav(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

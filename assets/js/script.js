/* =========================
   SAYEEDPORTFOLIO
   PART 6 — MOBILE MENU
   ========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("mobile-open");

    });

}

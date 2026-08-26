document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const cursorGlow = document.getElementById("cursorGlow");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.contains("open") ? closeMenu() : openMenu();
  });

  navItems.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  const updateHeaderAndActiveNav = () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
    const y = window.scrollY + Math.max(120, header.offsetHeight + 55);
    let currentId = "home";

    sections.forEach((section) => {
      if (y >= section.offsetTop && y < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });

    navItems.forEach((link) => {
      const active = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateHeaderAndActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  updateHeaderAndActiveNav();

  // Reveal-on-scroll, with a no-animation fallback.
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  // Pointer glow is completely disabled for touch devices.
  if (cursorGlow && window.matchMedia("(pointer:fine)").matches && !reduceMotion) {
    let pointerTicking = false;
    let px = 0, py = 0;

    window.addEventListener("pointermove", (event) => {
      px = event.clientX;
      py = event.clientY;
      if (!pointerTicking) {
        window.requestAnimationFrame(() => {
          cursorGlow.style.left = px + "px";
          cursorGlow.style.top = py + "px";
          pointerTicking = false;
        });
        pointerTicking = true;
      }
    }, { passive: true });
  } else if (cursorGlow) {
    cursorGlow.style.display = "none";
  }

  // Contact form: client-side validation + WhatsApp message.
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameEl = document.getElementById("visitorName");
    const emailEl = document.getElementById("visitorEmail");
    const messageEl = document.getElementById("visitorMessage");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    formStatus.textContent = "";

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      (!name ? nameEl : !email ? emailEl : messageEl).focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      emailEl.focus();
      return;
    }

    if (message.length < 3) {
      formStatus.textContent = "Please write a little more in your message.";
      messageEl.focus();
      return;
    }

    const formatted = [
      "Hello Sayeedur Rahman (Shahid),",
      "",
      "Name: " + name,
      "Email: " + email,
      "",
      "Message:",
      message
    ].join("\n");

    const whatsappUrl =
      "https://wa.me/919124478453?text=" + encodeURIComponent(formatted);

    formStatus.textContent = "Opening WhatsApp…";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  // Keep responsive state clean when rotating/resizing.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
    updateHeaderAndActiveNav();
  }, { passive: true });

  // Make anchor navigation reliable even when a browser does not honor CSS scroll-padding.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const offset = header.offsetHeight + 14;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  // Mark external project/social links as safe and intentional.
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });
});

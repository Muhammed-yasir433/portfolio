/* ============================================
   PORTFOLIO — JAVASCRIPT
   Author: Muhammed Yasir VS
   Description:
     - Custom cursor with interactive hover states
     - Intersection Observer for scroll-reveal animations
     - Active nav link highlighting on scroll
   ============================================ */

(function () {
  "use strict";

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Track mouse position & move dot cursor instantly
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth-follow ring using lerp
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge cursor on interactive elements
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      ring.style.width = "48px";
      ring.style.height = "48px";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      ring.style.width = "32px";
      ring.style.height = "32px";
    });
  });

  /* ── SCROLL-REVEAL (Intersection Observer) ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => {
    revealObserver.observe(el);
  });

  /* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 200) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + currentSectionId;
      link.style.color = isActive ? "var(--text)" : "";
    });
  });
})();

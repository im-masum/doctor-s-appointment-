// Dark mode toggle
const toggle = document.getElementById("themeToggle");
const setTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
};
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});
// Initial theme setup
if (localStorage.getItem("theme") === "dark") setTheme(true);


// Doctor selection handler
const doctorSelect = document.getElementById("doctor");
function searchDoctors() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".doctor-card");

  cards.forEach((card) => {
    const name = card.querySelector(".doctor-name").textContent.toLowerCase();
    const specialty = card
      .querySelector(".doctor-specialty")
      .textContent.toLowerCase();
    const match = name.includes(input) || specialty.includes(input);
    card.style.display = match ? "flex" : "none";
  });
}

// Set minimum date for appointment date picker to today
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

// Form submission handler with validation and confirmation
const form = document.getElementById("appointment-form");
const confirmationMsg = document.getElementById("confirmation-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple client-side validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // If validation passes, show confirmation message
  const name = form.name.value.trim();
  const doctor = form.doctor.value;
  const date = form.date.value;

  confirmationMsg.style.display = "block";
  confirmationMsg.textContent = `Thank you, ${name}. Your appointment with ${doctor} on ${date} has been booked successfully.`;

  // Reset form
  form.reset();
  // Reset min date again for newly reset form
  dateInput.setAttribute("min", today);
});

// Responsive navigation and active link handling

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  const links = navLinks.querySelectorAll("a");
  const navBackdrop = document.getElementById("navBackdrop");
  const navClose = document.getElementById("navClose");

  // Hamburger toggle
  navToggle.addEventListener("click", function () {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    nav.classList.toggle("open");
  });

  // Close nav on link click (mobile)
  links.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active link on click
  function setActiveLink(hash) {
    links.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // On click
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      setActiveLink(this.getAttribute("href"));
    });
  });

  // Active link on scroll
  const sectionIds = Array.from(links).map((link) => link.getAttribute("href"));
  const sections = sectionIds.map((id) => document.querySelector(id));

  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let found = false;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPos + 80) {
        setActiveLink(sectionIds[i]);
        found = true;
        break;
      }
    }
    if (!found) setActiveLink(sectionIds[0]);
  }
  window.addEventListener("scroll", onScroll);
  onScroll(); // Initial

  // Close nav when clicking backdrop
  navBackdrop.addEventListener("click", function () {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });

  // Prevent body scroll when nav is open
  const observer = new MutationObserver(() => {
    if (nav.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
  observer.observe(nav, { attributes: true, attributeFilter: ["class"] });

  // Close nav on close button
  navClose.addEventListener("click", function () {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    navToggle.focus();
  });

  // Focus trap for nav-links when open (accessibility)
  function trapFocus(e) {
    if (!nav.classList.contains("open")) return;
    const focusable = navLinks.querySelectorAll(
      'button, a[href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (e.key === "Escape") {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      navToggle.focus();
    }
  }
  navLinks.addEventListener("keydown", trapFocus);
});

// Animate header on scroll
const header = document.querySelector("header");
function handleHeaderScroll() {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();

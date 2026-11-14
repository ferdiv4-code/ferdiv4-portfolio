// FERDIV4 portfolio interactions — vanilla JavaScript
const roles = ["Software Developer", "Frontend Developer", "Web Application Developer", "Creative Problem Solver"];
const roleElement = document.querySelector(".typed-role");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (roleElement && !reducedMotion) {
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  function typeRole() {
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      roleElement.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    } else {
      const next = roles[roleIndex];
      charIndex++;
      roleElement.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) { deleting = true; setTimeout(typeRole, 1500); return; }
    }
    setTimeout(typeRole, deleting ? 45 : 85);
  }
  setTimeout(typeRole, 1600);
}

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("in-view"));
}

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}

// Contact form validates locally, then opens WhatsApp with the entered details.
const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();
  const text = `Hello Ferdiv4, my name is ${name}. My email is ${email}.\\n\\nProject details: ${message}`;
  const url = `https://wa.me/2347066031868?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  const note = document.querySelector("#form-note");
  if (note) note.textContent = "WhatsApp opened with your message. Review it there and tap Send.";
});

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("visible", window.scrollY > 550);
}, { passive: true });

document.querySelector("#year").textContent = new Date().getFullYear();

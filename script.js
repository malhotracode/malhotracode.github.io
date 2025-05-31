// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");
const contactForm = document.getElementById("contact-form");
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");

// Toggle navigation menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close menu when clicking on a link
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Form submission handling
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you would normally send the data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log("Form submitted:", { name, email, message });

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Thank you! Your message has been sent.";
    successMessage.style.color = "#16a34a";
    successMessage.style.padding = "15px";
    successMessage.style.marginTop = "15px";
    successMessage.style.backgroundColor = "#dcfce7";
    successMessage.style.borderRadius = "5px";

    // Reset form and append message
    contactForm.reset();
    contactForm.appendChild(successMessage);

    // Remove message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  });
}

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", () => {
  // Header shadow on scroll
  if (window.scrollY > 0) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }

  // Highlight active section in nav
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((li) => {
    li.querySelector("a").classList.remove("active");
    if (li.querySelector(`a[href="#${current}"]`)) {
      li.querySelector(`a[href="#${current}"]`).classList.add("active");
    }
  });
});

// Add scroll reveal animations
window.addEventListener("load", () => {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(".project-card, .skill-category, .about-content");

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Initial styles for reveal elements
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.7s ease-out";
  });

  // Run on load
  revealOnScroll();

  // Run on scroll
  window.addEventListener("scroll", revealOnScroll);
});

// Add any additional initialization code here if needed

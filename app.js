document.addEventListener("DOMContentLoaded", () => {
 
  document
    .querySelectorAll(
      "section, .timeline-item, .skill-category, .project-card, .achievement-item, .more-card, .contact-item"
    )
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.visibility = "visible";
    });

  
  setupMobileMenu();

  setupContactForm();

  animateFloatingElements();
});


function animateFloatingElements() {
  const floatElements = document.querySelectorAll(".float-element");

  floatElements.forEach((element, index) => {
    element.style.opacity = "1";
    element.style.visibility = "visible";
  });
}


function setupMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      
      if (!document.querySelector(".mobile-menu")) {
        const mobileMenu = document.createElement("div");
        mobileMenu.className = "mobile-menu";
        mobileMenu.innerHTML = navLinks.innerHTML;
        document.body.appendChild(mobileMenu);

        
        mobileMenu.style.position = "fixed";
        mobileMenu.style.top = "70px";
        mobileMenu.style.left = "0";
        mobileMenu.style.width = "100%";
        mobileMenu.style.background = "white";
        mobileMenu.style.padding = "20px";
        mobileMenu.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
        mobileMenu.style.display = "none";
        mobileMenu.style.flexDirection = "column";
        mobileMenu.style.gap = "20px";
        mobileMenu.style.zIndex = "999";

       
        const links = mobileMenu.querySelectorAll("a");
        links.forEach((link) => {
          link.style.display = "block";
          link.style.padding = "10px";
          link.style.borderBottom = "1px solid #eee";

          link.addEventListener("click", () => {
            mobileMenu.style.display = "none";
            hamburger.classList.remove("active");
          });
        });
      }

      const mobileMenu = document.querySelector(".mobile-menu");

      
      if (
        mobileMenu.style.display === "none" ||
        mobileMenu.style.display === ""
      ) {
        mobileMenu.style.display = "flex";
        hamburger.classList.add("active");
      } else {
        mobileMenu.style.display = "none";
        hamburger.classList.remove("active");
      }
    });
  }
}


function setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            const successMessage = document.getElementById("form-success");
            const errorMessage = document.getElementById("form-error");

            if (!name || !email || !message) {
                alert("Please fill in all fields");
                return;
            }
            submitButton.disabled = true;
            submitButton.style.opacity = "0.6";
            submitButton.textContent = "Sending...";
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                const data = await response.json();
                if (response.ok) {
                    successMessage.style.display = "block";
                    successMessage.style.color = "green";
                    errorMessage.style.display = "none";
                    document.getElementById("contactForm").reset();
                    //after 10 seconds, hide the success message
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 10000);
                } else {
                    successMessage.style.display = "none";
                    errorMessage.style.display = "block";
                    errorMessage.style.color = "red";
                    setTimeout(() => {
                        errorMessage.style.display = "none";
                    }, 10000);
                }   
            } catch (err) {
                successMessage.style.display = "none";
                    errorMessage.style.display = "block";
                    errorMessage.style.color = "red";
                    setTimeout(() => {
                        errorMessage.style.display = "none";
                    }, 10000);
                    console.error("Error sending message:", err);
            }finally{
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                submitButton.textContent = "Send Message";
            }
        });
    }
}

// Add active class to nav links based on scroll position
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("themeToggle");

    // Check saved preference
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
        document.body.classList.add("dark-theme");
        if (toggleButton) toggleButton.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-theme");
        if (toggleButton) toggleButton.textContent = "🌙";
    }

    // Toggle on click
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const nowDark = document.body.classList.toggle("dark-theme");
            localStorage.setItem("theme", nowDark ? "dark" : "light");
            toggleButton.textContent = nowDark ? "☀️" : "🌙";
        });
    }
});
// Add styles for active hamburger
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    </style>
`
);

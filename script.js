document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("nav")
  
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  
    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains("active")) {
        nav.classList.remove("active")
      }
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        if (nav.classList.contains("active")) {
          nav.classList.remove("active")
        }
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Reviews Slider
    const reviewCards = document.querySelectorAll(".review-card")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    let currentIndex = 0
  
    function showReview(index) {
      reviewCards.forEach((card) => {
        card.classList.remove("active")
      })
  
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })
  
      reviewCards[index].classList.add("active")
      dots[index].classList.add("active")
      currentIndex = index
    }
  
    // Initialize slider
    showReview(0)
  
    // Event listeners for dots
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        showReview(index)
      })
    })
  
    // Event listeners for prev/next buttons
    prevBtn.addEventListener("click", () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) {
        newIndex = reviewCards.length - 1
      }
      showReview(newIndex)
    })
  
    nextBtn.addEventListener("click", () => {
      let newIndex = currentIndex + 1
      if (newIndex >= reviewCards.length) {
        newIndex = 0
      }
      showReview(newIndex)
    })
  
    // Auto slide reviews
    setInterval(() => {
      let newIndex = currentIndex + 1
      if (newIndex >= reviewCards.length) {
        newIndex = 0
      }
      showReview(newIndex)
    }, 5000)
  
    // Appointment Form Handling
    const bookingForm = document.getElementById("booking-form")
    const confirmationModal = document.getElementById("confirmation-modal")
    const closeModal = document.querySelector(".close-modal")
    const closeBtn = document.querySelector(".close-btn")
  
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const date = document.getElementById("date").value
        const time = document.getElementById("time").value
  
        // Format date
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
  
        // Format time
        let formattedTime = ""
        if (time === "morning") {
          formattedTime = "Morning (9:00 AM - 1:00 PM)"
        } else if (time === "evening") {
          formattedTime = "Evening (5:00 PM - 8:00 PM)"
        }
  
        // Update confirmation modal
        document.getElementById("confirm-name").textContent = `Patient: ${name}`
        document.getElementById("confirm-date").textContent = `Date: ${formattedDate}`
        document.getElementById("confirm-time").textContent = `Time: ${formattedTime}`
  
        // Show modal
        confirmationModal.style.display = "flex"
  
        // Reset form
        bookingForm.reset()
      })
    }
  
    // Close modal
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        confirmationModal.style.display = "none"
      })
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        confirmationModal.style.display = "none"
      })
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === confirmationModal) {
        confirmationModal.style.display = "none"
      }
    })
  
    // Highlight active navigation based on scroll position
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll("nav ul li a")
  
      let currentSection = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active")
        }
      })
    })
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Accessibility Controls
    const increaseFont = document.getElementById("increase-font")
    const decreaseFont = document.getElementById("decrease-font")
    const toggleContrast = document.getElementById("toggle-contrast")
    const html = document.documentElement
    let currentFontSize = 100
  
    if (increaseFont) {
      increaseFont.addEventListener("click", () => {
        if (currentFontSize < 150) {
          currentFontSize += 10
          html.style.fontSize = currentFontSize + "%"
        }
      })
    }
  
    if (decreaseFont) {
      decreaseFont.addEventListener("click", () => {
        if (currentFontSize > 80) {
          currentFontSize -= 10
          html.style.fontSize = currentFontSize + "%"
        }
      })
    }
  
    if (toggleContrast) {
      toggleContrast.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast")
      })
    }
  
    // Language Selector (placeholder functionality)
    const languageSelect = document.getElementById("language-select")
  
    if (languageSelect) {
      languageSelect.addEventListener("change", function () {
        const selectedLanguage = this.value
        // In a real implementation, this would change the language
        alert(`Language would change to: ${selectedLanguage}`)
        // Reset to English for demo purposes
        this.value = "en"
      })
    }
  })
  
  
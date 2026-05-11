// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Animatie voor skill bars
const skillLevels = document.querySelectorAll('.level');
  
const skillObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    const level = entry.target;
    const targetWidth = level.dataset.width;
    level.style.width = targetWidth + '%'; 
    skillObserver.unobserve(level); 
    }
});
}, { threshold: 0.4 }); 

skillLevels.forEach(level => skillObserver.observe(level));

// Filter voor projecten + zie meer
const filterButtons = document.querySelectorAll(".filterButtons .tag");
const projectCards = document.querySelectorAll(".projectCard");
const seeMoreBtn = document.querySelector(".seeMoreBtn");

let currentFilter = "all";
let showAllProjects = false;

function getProjectLimit() {
    if (window.innerWidth >= 1024) return 6; // desktop
    if (window.innerWidth >= 768) return 4;  // tablet
    return 3;                                // mobile
}

function updateProjects() {
    const limit = getProjectLimit();
    let visibleCount = 0;

    projectCards.forEach(card => {
        const categories = (card.dataset.category || "")
            .split(/[,\s]+/)
            .map(s => s.trim())
            .filter(Boolean);

        const matchesFilter = currentFilter === "all" || categories.includes(currentFilter);

        if (!matchesFilter) {
            card.style.display = "none";
            return;
        }

        visibleCount++;

        if (!showAllProjects && visibleCount > limit) {
            card.style.display = "none";
        } else {
            card.style.display = "flex";
        }
    });

    if (seeMoreBtn) {
        seeMoreBtn.style.display = visibleCount > limit ? "inline-flex" : "none";
        seeMoreBtn.classList.toggle("active", showAllProjects);
        seeMoreBtn.setAttribute("aria-expanded", showAllProjects);

        seeMoreBtn.innerHTML = showAllProjects
            ? 'Zie minder <span>⌃</span>'
            : 'Zie meer <span>⌄</span>';
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        showAllProjects = false;

        updateProjects();
    });
});

if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", () => {
        showAllProjects = !showAllProjects;
        updateProjects();
    });
}

window.addEventListener("resize", updateProjects);

updateProjects();

// Animation voor secties in "devices" sectie (project zuiderbad)
const sections = document.querySelectorAll(".devices section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.4 }); // activeer zodra 40% zichtbaar is

sections.forEach(section => observer.observe(section));


//carousel voor projecten
const carousel = document.querySelector('.projectenCarousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => (isDown = false));
carousel.addEventListener('mouseup', () => (isDown = false));
carousel.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll snelheid
  carousel.scrollLeft = scrollLeft - walk;
});

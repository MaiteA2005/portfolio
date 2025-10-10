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

// Filter voor projecten
const filterButtons = document.querySelectorAll(".filterButtons .tag");
const projectCards  = document.querySelectorAll(".projectCard");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
        const categories = (card.dataset.category || "")
        .split(/[,\s]+/)              // split op komma's of spaties
        .map(s => s.trim())
        .filter(Boolean);

        const show = filter === "all" || categories.includes(filter);
        card.style.display = show ? "flex" : "none";
    });
    });
});


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
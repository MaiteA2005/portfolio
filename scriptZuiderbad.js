document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HAMBURGER MENU
    ========================= */

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    /* =========================
       SCROLL REVEAL – DEVICES
    ========================= */

    const deviceSections = document.querySelectorAll(".devices section");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        deviceSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* =========================
       SIDE NAV – SCROLL SPY
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const sideNavLinks = document.querySelectorAll(".sideNav a");

    const updateActiveSideNav = () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        sideNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveSideNav);
    updateActiveSideNav();

    /* =========================
       SIDE NAV – CLICK FEEDBACK
       (optioneel maar UX-vriendelijk)
    ========================= */

    sideNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            sideNavLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

});

const sideNav = document.querySelector(".sideNav");
const projectHeader = document.querySelector(".projectHeader");
const reflectieSection = document.querySelector("#reflectie");

if (sideNav && projectHeader && reflectieSection) {
    const headerBottom =
        projectHeader.offsetTop + projectHeader.offsetHeight;

    const reflectieBottom =
        reflectieSection.offsetTop + reflectieSection.offsetHeight;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        /* START: onder projectHeader */
        if (scrollY > headerBottom - 160 && scrollY < reflectieBottom - 5) {
            sideNav.classList.add("is-visible");
        } else {
            sideNav.classList.remove("is-visible");
        }
    });
}
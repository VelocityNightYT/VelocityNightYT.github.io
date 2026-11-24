document.querySelectorAll(".button, [data-scroll]").forEach((button) => {
    button.addEventListener("click", (event) => {
        const targetSelector = button.getAttribute("href");

        if (targetSelector && targetSelector.startsWith("#")) {
            const target = document.querySelector(targetSelector);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });
});

const revealElements = document.querySelectorAll("#projects, #about, #contact, [data-reveal-card]");
const projectsSection = document.querySelector("#projects");

if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");

    document.querySelectorAll("[data-reveal-card]").forEach((card, index) => {
        card.style.setProperty("--reveal-delay", `${index * 0.15}s`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => revealObserver.observe(element));
}

let autoScrollTimer = window.setTimeout(() => {
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}, 15000);

const cancelAutoScroll = () => {
    if (autoScrollTimer !== null) {
        window.clearTimeout(autoScrollTimer);
        autoScrollTimer = null;
    }
};

window.addEventListener("wheel", cancelAutoScroll, { passive: true, once: true });
window.addEventListener("touchstart", cancelAutoScroll, { passive: true, once: true });
window.addEventListener("keydown", cancelAutoScroll, { once: true });
document.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
        cancelAutoScroll();
    }
}, true);

// Briefly blur the page content while scrolling to create a motion-blur effect.
let scrollBlurTimer;
window.addEventListener("scroll", () => {
    document.body.classList.add("is-scrolling");
    window.clearTimeout(scrollBlurTimer);
    scrollBlurTimer = window.setTimeout(() => {
        document.body.classList.remove("is-scrolling");
    }, 120);
}, { passive: true });

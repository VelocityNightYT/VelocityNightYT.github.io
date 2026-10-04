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
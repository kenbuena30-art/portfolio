/* =========================================================
   KEN BUENA - PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   PAGE LOADED
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollReveal();
    initializeProjectCards();
    initializeButtonEffects();
    initializeTerminal();
    initializeScrollTop();
    initializeFooterYear();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* Highlight navigation based on current section */

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    });

}


/* =========================================================
   SMOOTH SCROLLING
   ========================================================= */

function initializeSmoothScrolling() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const targetID = this.getAttribute("href");

            if (targetID === "#") {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

function initializeScrollReveal() {

    const elements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .terminal"
    );


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   PROJECT CARDS
   ========================================================= */

function initializeProjectCards() {

    const projects = document.querySelectorAll(
        ".project-card"
    );


    const projectInformation = [

        {
            title: "Portfolio Website",

            description:
                "A futuristic personal portfolio website created to showcase my skills, projects, experience, and development journey.",

            technologies:
                ["HTML", "CSS", "JavaScript"],

            status:
                "Currently active"
        },


        {
            title: "Pokédex Application",

            description:
                "An interactive Pokédex application that retrieves Pokémon information and presents it through a user-friendly interface.",

            technologies:
                ["Java", "JavaScript", "API"],

            status:
                "Completed / Academic Project"
        },


        {
            title: "LGU Borrowing System",

            description:
                "A proposed digital borrowing and inventory system designed to track government-owned items using barcode scanning and digital records.",

            technologies:
                ["PHP", "SQL", "Barcode"],

            status:
                "Development concept"
        },


        {
            title: "More Projects",

            description:
                "More projects and applications will be added as I continue developing my skills and learning new technologies.",

            technologies:
                ["Coming Soon"],

            status:
                "In progress"
        }

    ];


    projects.forEach((project, index) => {

        project.style.cursor = "pointer";


        project.addEventListener("click", () => {

            const information =
                projectInformation[index];

            if (!information) {
                return;
            }

            createProjectModal(information);

        });

    });

}


/* =========================================================
   PROJECT MODAL
   ========================================================= */

function createProjectModal(project) {

    /* Prevent duplicate modal */

    const existingModal =
        document.querySelector(".project-modal");

    if (existingModal) {
        existingModal.remove();
    }


    /* Create modal */

    const modal =
        document.createElement("div");

    modal.className = "project-modal";


    modal.innerHTML = `

        <div class="modal-content">

            <button
                class="modal-close"
                aria-label="Close"
            >
                ×
            </button>

            <div class="modal-label">
                PROJECT DETAILS
            </div>

            <h2>
                ${project.title}
            </h2>

            <p class="modal-description">
                ${project.description}
            </p>

            <div class="modal-status">
                STATUS:
                <span>${project.status}</span>
            </div>

            <div class="modal-tech">

                ${project.technologies
                    .map(
                        tech =>
                            `<span>${tech}</span>`
                    )
                    .join("")}

            </div>

            <button
                class="modal-action"
                id="modalCloseButton"
            >
                CLOSE
            </button>

        </div>

    `;


    document.body.appendChild(modal);


    /* Animate modal */

    requestAnimationFrame(() => {

        modal.classList.add("modal-visible");

    });


    /* Close buttons */

    const closeButtons =
        modal.querySelectorAll(
            ".modal-close, #modalCloseButton"
        );


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => closeProjectModal(modal)
        );

    });


    /* Click outside modal */

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeProjectModal(modal);

        }

    });


    /* ESC key */

    document.addEventListener(
        "keydown",
        function escapeHandler(event) {

            if (event.key === "Escape") {

                closeProjectModal(modal);

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        }
    );

}


function closeProjectModal(modal) {

    modal.classList.remove(
        "modal-visible"
    );


    setTimeout(() => {

        modal.remove();

    }, 300);

}


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

function initializeButtonEffects() {

    const buttons =
        document.querySelectorAll(
            ".btn, .modal-action"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "ripple";


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";


                ripple.style.left =
                    event.clientX -
                    rect.left -
                    size / 2 +
                    "px";


                ripple.style.top =
                    event.clientY -
                    rect.top -
                    size / 2 +
                    "px";


                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}


/* =========================================================
   TERMINAL ANIMATION
   ========================================================= */

function initializeTerminal() {

    const terminal =
        document.querySelector(
            ".terminal-body"
        );


    if (!terminal) {
        return;
    }


    terminal.addEventListener(
        "click",
        () => {

            showNotification(
                "Terminal interface activated."
            );

        }
    );

}


/* =========================================================
   NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(message) {

    const existing =
        document.querySelector(
            ".portfolio-notification"
        );


    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "portfolio-notification";


    notification.innerHTML = `

        <span class="notification-dot"></span>

        ${message}

    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add(
            "notification-show"
        );

    }, 20);


    setTimeout(() => {

        notification.classList.remove(
            "notification-show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   SCROLL TO TOP
   ========================================================= */

function initializeScrollTop() {

    const button =
        document.createElement("button");


    button.className =
        "scroll-top";


    button.innerHTML = "↑";


    button.setAttribute(
        "aria-label",
        "Scroll to top"
    );


    document.body.appendChild(button);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "scroll-top-visible"
                );

            } else {

                button.classList.remove(
                    "scroll-top-visible"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function initializeFooterYear() {

    const footer =
        document.querySelector("footer");


    if (!footer) {
        return;
    }


    const year =
        new Date().getFullYear();


    const paragraphs =
        footer.querySelectorAll("p");


    if (paragraphs.length > 0) {

        paragraphs[0].textContent =
            `© ${year} Ken Buena`;

    }

}

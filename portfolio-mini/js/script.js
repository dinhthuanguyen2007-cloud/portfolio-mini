// ================================
// 1. MENU RESPONSIVE (DOM + EVENT)
// ================================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isExpanded = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ================================
// 2. THEME + LOCAL STORAGE
// ================================
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️ Giao diện";
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("portfolio-theme", "dark");
        themeToggle.textContent = "☀️ Giao diện";
    } else {
        localStorage.setItem("portfolio-theme", "light");
        themeToggle.textContent = "🌙 Giao diện";
    }
});

// ================================
// 3. FETCH API: ĐỌC DỮ LIỆU JSON
// ================================
const projectList = document.getElementById("project-list");
const projectStatus = document.getElementById("project-status");

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu dự án.");
        }

        const projects = await response.json();
        renderProjects(projects);
        projectStatus.textContent = `Đã tải ${projects.length} dự án thành công.`;
    } catch (error) {
        projectStatus.textContent = "Không tải được dự án. Hãy kiểm tra Live Server và tệp JSON.";
        console.error("Lỗi Fetch API:", error);
    }
}

function renderProjects(projects) {
    projectList.innerHTML = "";

    projects.forEach(function (project) {
        const projectCard = document.createElement("article");
        projectCard.className = "project-card";

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "project-content";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technology = document.createElement("span");
        technology.className = "project-tag";
        technology.textContent = project.technology;

        const favoriteButton = document.createElement("button");
        favoriteButton.className = "favorite-button";
        favoriteButton.type = "button";

        const favorites = JSON.parse(localStorage.getItem("favorite-projects")) || [];
        const isFavorite = favorites.includes(project.id);
        favoriteButton.textContent = isFavorite ? "♥ Đã yêu thích" : "♡ Yêu thích";

        favoriteButton.addEventListener("click", function () {
            let currentFavorites = JSON.parse(localStorage.getItem("favorite-projects")) || [];

            if (currentFavorites.includes(project.id)) {
                currentFavorites = currentFavorites.filter(function (id) {
                    return id !== project.id;
                });
                favoriteButton.textContent = "♡ Yêu thích";
            } else {
                currentFavorites.push(project.id);
                favoriteButton.textContent = "♥ Đã yêu thích";
            }

            localStorage.setItem("favorite-projects", JSON.stringify(currentFavorites));
        });

        content.append(title, description, technology, favoriteButton);
        projectCard.append(image, content);
        projectList.appendChild(projectCard);
    });
}

loadProjects();

// ================================
// 4. FORM VALIDATION
// ================================
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    document.getElementById("form-status").textContent = "";

    let isValid = true;

    if (name.length < 2) {
        document.getElementById("name-error").textContent = "Họ tên phải có ít nhất 2 ký tự.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Email không đúng định dạng.";
        isValid = false;
    }

    if (message.length < 10) {
        document.getElementById("message-error").textContent = "Nội dung phải có ít nhất 10 ký tự.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("form-status").textContent =
            "Thông tin hợp lệ! Đây là form minh họa, chưa gửi dữ liệu lên máy chủ.";
        contactForm.reset();
    }
});

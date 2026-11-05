// Sample course data: an array containing course objects.
const courses = [
  { title: "Introduction to Web Development", category: "Web Development", description: "Learn the foundations of HTML, CSS and how modern websites are structured.", level: "Beginner", duration: "4 Weeks", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85" },
  { title: "JavaScript Programming", category: "Programming", description: "Build a strong foundation in JavaScript variables, functions and interactivity.", level: "Beginner", duration: "5 Weeks", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&q=85" },
  { title: "Advanced Web Design", category: "Web Development", description: "Create responsive interfaces with modern design and layout techniques.", level: "Advanced", duration: "6 Weeks", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=85" },
  { title: "Graphic Design Essentials", category: "Graphic Design", description: "Explore typography, colour, composition and visual communication.", level: "Beginner", duration: "3 Weeks", image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&q=85" },
  { title: "Digital Marketing Strategy", category: "Digital Marketing", description: "Understand content planning, social media and digital campaign basics.", level: "Intermediate", duration: "4 Weeks", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85" },
  { title: "Python for Data Science", category: "Data Science", description: "Use Python to explore datasets, analyse patterns and discover insights.", level: "Beginner", duration: "6 Weeks", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85" },
  { title: "Frontend Development", category: "Web Development", description: "Develop accessible, engaging interfaces and improve your frontend skills.", level: "Intermediate", duration: "5 Weeks", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=85" },
  { title: "Data Analysis with Python", category: "Data Science", description: "Clean, analyse and visualise data to communicate evidence-based findings.", level: "Advanced", duration: "7 Weeks", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=85" }
];

// DOM selections.
const courseGrid = document.querySelector("#courseGrid");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const levelFilter = document.querySelector("#levelFilter");
const sortFilter = document.querySelector("#sortFilter");
const resetButton = document.querySelector("#resetButton");
const emptyReset = document.querySelector("#emptyReset");
const emptyState = document.querySelector("#emptyState");
const resultCount = document.querySelector("#resultCount");
const activeFilters = document.querySelector("#activeFilters");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

// Create and display course cards dynamically.
function displayCourses(courseList) {
  courseGrid.innerHTML = "";

  courseList.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";

    card.innerHTML = `
      <div class="course-image">
        <img src="${course.image}" alt="${course.title}" loading="lazy"
          onerror="this.style.display='none'; this.parentElement.style.background='#e4eee5';">
        <span class="category-pill">${course.category}</span>
      </div>
      <div class="course-content">
        <div class="course-meta">
          <span class="level ${course.level.toLowerCase()}">${course.level}</span>
          <span>YSSE LEARNING HUB</span>
        </div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="course-bottom">
          <span class="duration">◷ ${course.duration}</span>
          <a class="course-link" href="https://ysseglobal.org/" target="_blank" rel="noopener noreferrer">Learn more <span>↗</span></a>
        </div>
      </div>
    `;
    courseGrid.appendChild(card);
  });

  resultCount.textContent = courseList.length;
  emptyState.hidden = courseList.length !== 0;
  courseGrid.hidden = courseList.length === 0;
}

// Apply search, category and level filters together.
function filterCourses() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedLevel = levelFilter.value;
  const sortOption = sortFilter.value;

  let filteredCourses = courses.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(keyword);
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesTitle && matchesCategory && matchesLevel;
  });

  if (sortOption === "az") {
    filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za") {
    filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
  }

  const active = [];
  if (keyword) active.push(`Search: "${keyword}"`);
  if (selectedCategory !== "all") active.push(selectedCategory);
  if (selectedLevel !== "all") active.push(selectedLevel);
  if (sortOption !== "default") active.push(sortOption === "az" ? "A–Z" : "Z–A");

  activeFilters.textContent = active.length ? active.join(" · ") : "Showing all courses";
  displayCourses(filteredCourses);
}

// Restore all controls to their default values.
function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  levelFilter.value = "all";
  sortFilter.value = "default";
  filterCourses();
}

// Events.
searchInput.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses);
levelFilter.addEventListener("change", filterCourses);
sortFilter.addEventListener("change", filterCourses);
resetButton.addEventListener("click", clearFilters);
emptyReset.addEventListener("click", clearFilters);

// Footer category shortcuts set the matching category filter.
document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => {
    categoryFilter.value = link.dataset.categoryLink;
    filterCourses();
  });
});

// Small-screen navigation menu.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Keyboard shortcut: press / to focus the search box.
document.addEventListener("keydown", (event) => {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }
});

// Initial render.
displayCourses(courses);

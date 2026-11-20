
const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const courseCount = document.getElementById("courseCount");

let technologies = [];

// Mengambil data dari file JSON
async function loadTechnologies() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("Data gagal dimuat");
    }

    technologies = await response.json();
    renderCourses(technologies);
  } catch (error) {
    courseGrid.innerHTML = `
      <p class="error">
        Data tidak dapat dimuat. Pastikan website dibuka melalui GitHub Pages.
      </p>
    `;
    courseCount.textContent = "Error";
  }
}

// Menampilkan kartu teknologi
function renderCourses(data) {
  courseGrid.innerHTML = "";

  courseCount.textContent = `${data.length} technologies`;

  if (data.length === 0) {
    courseGrid.innerHTML = "<p>Teknologi tidak ditemukan.</p>";
    return;
  }

  data.forEach((tech) => {
    const card = document.createElement("article");
    card.className = "course-card";

    card.innerHTML = `
      <div class="course-icon"
        style="--icon-bg:${tech.bg};--icon-color:${tech.color}">
        ${tech.icon}
      </div>

      <h3>${tech.name}</h3>
      <p>${tech.description}</p>

      <div class="course-bottom">
        <span>${tech.category}</span>
        <button type="button" data-name="${tech.name}">
          Explore ↗
        </button>
      </div>
    `;

    courseGrid.appendChild(card);
  });
}

// Fitur pencarian
searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.toLowerCase();

  const filtered = technologies.filter((tech) => {
    return (
      tech.name.toLowerCase().includes(keyword) ||
      tech.description.toLowerCase().includes(keyword) ||
      tech.category.toLowerCase().includes(keyword)
    );
  });

  renderCourses(filtered);
});

// Event tombol Explore
courseGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const name = button.dataset.name;
  const selected = technologies.find((tech) => tech.name === name);

  if (selected) {
    showToast(`${selected.name}: ${selected.detail}`);
  }
});

// Notifikasi
let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function showMessage() {
  showToast("Welcome to DevSpace! Start exploring 🚀");
}

// Jalankan website
loadTechnologies();

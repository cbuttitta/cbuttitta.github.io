let dark = false;

if (window.location.pathname.includes('lessons.html')) {
  const acc = document.getElementsByClassName("accordion");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Increment index
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Show current slide
  slides[slideIndex - 1].style.display = "block";

  // Repeat every 5 seconds
  setTimeout(showSlides, 5000);
}


if (window.location.pathname.includes('index.html')) {
  showSlides();
}

if (window.location.pathname.includes("class_rankings.html")) {
  document.addEventListener("DOMContentLoaded", () => {

    const categories = {
      "HTML Course Completion": {
        labels: ["Student 1", "Student 2", "Student 3"],
        scores: [100, 50, 67],
        colors: ["#ff6384", "#36a2eb", "#4bc0c0"]
      },
      "CSS Course Completion": {
        labels: ["Student 1", "Student 2", "Student 3"],
        scores: [90, 80, 88],
        colors: ["#ff6384", "#36a2eb", "#4bc0c0"]
      },
      "JavaScript Course Completion": {
        labels: ["Student 1", "Student 2", "Student 3"],
        scores: [56, 95, 63],
        colors: ["#ff6384", "#36a2eb", "#4bc0c0"]
      },
      "Overall Mastery": {
        labels: ["Student 1", "Student 2", "Student 3"],
        scores: [45, 53, 87],
        colors: ["#ff6384", "#36a2eb", "#4bc0c0"]
      }
    };

    const keys = Object.keys(categories);
    let index = 0;

    const ctx = document.getElementById("rankChart").getContext("2d");
    const titleEl = document.getElementById("categoryTitle");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const chart = new Chart(ctx, {
      type: "bar",
      data: { labels: [], datasets: [{ label: "Score", data: [], backgroundColor: [] }] },
      options: {
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } },
        animation: { duration: 400 }
      }
    });

    function updateChart() {
      const key = keys[index];
      titleEl.textContent = key;

      const { labels, scores, colors } = categories[key];
      chart.data.labels = labels;
      chart.data.datasets[0].data = scores;
      chart.data.datasets[0].backgroundColor = colors;
      chart.update();

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === keys.length - 1;
    }

    prevBtn.addEventListener("click", () => {
      if (index > 0) index--;
      updateChart();
    });

    nextBtn.addEventListener("click", () => {
      if (index < keys.length - 1) index++;
      updateChart();
    });

    updateChart();
  });
}

if (window.location.pathname.includes('index.html') || window.location.pathname.includes('about.html')) {
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-button");
  const popup = document.getElementById("loginPopup");
  const closeBtn = document.getElementById("closePopup");

  // Open popup when login button is clicked
  loginBtn.addEventListener("click", () => {
    popup.style.display = "flex"; // uses flex to center
  });

  // Close popup when X is clicked
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the content box
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // Optional: Handle form submission
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log("Login attempt:", username, password);
    // Here you can add your authentication logic
    popup.style.display = "none"; // close after submit
  });
});
}

//dark mode
function darkMode(){
  console.log("dark mode");
  var r = document.querySelector(':root');
  if(!dark){r.style.setProperty('--bg', '#5e677bff'); dark=true;}
  else{r.style.setProperty('--bg', '#f5f8fb'); dark=false;}
}
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key === 'n') {
      event.preventDefault();
      darkMode();
    }
  });
});
let slideIndex = 0;
if (window.location.pathname === '/itis3135/project/index.html') {
  showSlides();
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

if (window.location.pathname === '/itis3135/project/class_rankings.html') {
  document.addEventListener("DOMContentLoaded", () => {
    // Example category data (you can fetch this dynamically)
    const categories = {
      "HTML Course Completion": { labels: ["Student 1", "Student 2", "Student 3"], scores: [100, 50, 67], colors: ["red",
          "blue",
          "green"] },
      "CSS Course Completion": { labels: ["Student 1", "Student 2", "Student 3"], scores: [90, 80, 88], colors: ["red",
          "blue",
          "green"] },
      "JavaScript Course Completion": { labels: ["Student 1", "Student 2", "Student 3"], scores: [56, 95, 63], colors: ["red",
          "blue",
          "green"] },
      "Overall Mastery": { labels: ["Student 1", "Student 2", "Student 3"], scores: [45, 53, 87], colors: ["red",
          "blue",
          "green"] }
    };

     const keys = Object.keys(categories);
  let index = 0;

  const ctx = document.getElementById("rankChart").getContext("2d");
  const titleEl = document.getElementById("categoryTitle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Initialize chart with empty data
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Score",
        data: [],
        backgroundColor: [
        ]
      }]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 100 } },
      animation: { duration: 400 },
    }
  });

  // Update chart to current category
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

  // Button events
  prevBtn.addEventListener("click", () => {
    if (index > 0) index--;
    updateChart();
  });

  nextBtn.addEventListener("click", () => {
    if (index < keys.length - 1) index++;
    updateChart();
  });

  // Initialize first chart
  updateChart();
});
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-button");
  const popup = document.getElementById("loginPopup");
  const closeBtn = document.getElementById("closePopup");

  // Open popup when login button is clicked
  loginBtn.addEventListener("click", () => {
    popup.style.display = "flex"; // uses flex to center
    alert("Login button clicked!");
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

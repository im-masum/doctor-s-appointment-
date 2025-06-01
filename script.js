// Dark mode toggle
const toggle = document.getElementById("themeToggle");
const setTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
};
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});
// Load saved theme
if (localStorage.getItem("theme") === "dark") setTheme(true);

// Doctor selection handler
const doctorSelect = document.getElementById("doctor");
function searchDoctors() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".doctor-card");

  cards.forEach((card) => {
    const name = card.querySelector(".doctor-name").textContent.toLowerCase();
    const specialty = card
      .querySelector(".doctor-specialty")
      .textContent.toLowerCase();
    const match = name.includes(input) || specialty.includes(input);
    card.style.display = match ? "flex" : "none";
  });
}
  

// Set minimum date for appointment date picker to today
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

// Form submission handler with validation and confirmation
const form = document.getElementById("appointment-form");
const confirmationMsg = document.getElementById("confirmation-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple client-side validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // If validation passes, show confirmation message
  const name = form.name.value.trim();
  const doctor = form.doctor.value;
  const date = form.date.value;

  confirmationMsg.style.display = "block";
  confirmationMsg.textContent = `Thank you, ${name}. Your appointment with ${doctor} on ${date} has been booked successfully.`;

  // Reset form
  form.reset();
  // Reset min date again for newly reset form
  dateInput.setAttribute("min", today);
});

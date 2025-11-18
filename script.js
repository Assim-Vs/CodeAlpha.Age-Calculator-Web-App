// DOM Manipulation: get elements from the page
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("ageResult");
const calculateBtn = document.getElementById("calculateBtn");

// DOM Manipulation: attach event listener to the button
calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {
  // Clear previous error
  errorEl.textContent = "";

  // Read values from inputs (DOM → JS)
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10); // 1–12
  const year = parseInt(yearInput.value, 10);

  // 1) Input Validation – check empty / NaN
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    errorEl.textContent = "Please enter day, month and year.";
    resultEl.textContent = "Enter a valid date of birth.";
    return;
  }

  // 2) Input Validation – create DOB date and check if valid
  // JavaScript months are 0-based (0 = Jan, 11 = Dec)
  const dob = new Date(year, month - 1, day);
  const today = new Date(); // current system date

  // Check if date in Date object matches user input (invalid dates like 31/02)
  if (
    dob.getFullYear() !== year ||
    dob.getMonth() !== month - 1 ||
    dob.getDate() !== day
  ) {
    errorEl.textContent =
      "Invalid date. Please check the day, month and year.";
    resultEl.textContent = "Enter a valid date of birth.";
    return;
  }

  // 3) Input Validation – DOB must not be in the future
  if (dob > today) {
    errorEl.textContent = "Date of birth cannot be in the future.";
    resultEl.textContent = "Enter a valid date of birth.";
    return;
  }

  // 4) Working with JavaScript Date & Time to calculate age
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  // If days are negative, borrow days from previous month
  if (days < 0) {
    months -= 1;

    // Last day of previous month (Date with day 0 gives previous month's last day)
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const daysInPrevMonth = prevMonth.getDate();

    days += daysInPrevMonth;
  }

  // If months are negative, borrow 12 months from previous year
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // DOM Manipulation: update result on the page
  resultEl.innerHTML =
    `You are <span>${years}</span> years, ` +
    `<span>${months}</span> months and ` +
    `<span>${days}</span> days old.`;
}

/* =========================================
PARBEZ SMART WORKS
COMMON JAVASCRIPT
========================================= */

/* =========================================
MESSAGE
========================================= */

function showMessage(message) {
alert(message);
}

/* =========================================
DATE
========================================= */

function getToday() {

const now = new Date();

return now.toLocaleDateString("en-IN", {
day: "2-digit",
month: "2-digit",
year: "numeric"
});

}

/* =========================================
BUSINESS PROFILE
========================================= */

function getProfile() {

try {

return JSON.parse(
  localStorage.getItem("psw_profile") || "null"
);

} catch (error) {

return null;

}

}

function getBusinessName() {

const profile = getProfile();

return (
profile?.workName ||
"Parbez Smart Works"
);

}

/* =========================================
BILL NUMBER
========================================= */

function getNextBillNumber() {

let number =
Number(
localStorage.getItem("psw_bill_number")
) || 1;

return (
"PSW-" +
String(number).padStart(4, "0")
);

}

function increaseBillNumber() {

let number =
Number(
localStorage.getItem("psw_bill_number")
) || 1;

localStorage.setItem(
"psw_bill_number",
number + 1
);

}

/* =========================================
ESTIMATE NUMBER
========================================= */

function getNextEstimateNumber() {

let number =
Number(
localStorage.getItem("psw_estimate_number")
) || 1;

return (
"EST-" +
String(number).padStart(4, "0")
);

}

function increaseEstimateNumber() {

let number =
Number(
localStorage.getItem("psw_estimate_number")
) || 1;

localStorage.setItem(
"psw_estimate_number",
number + 1
);

}

/* =========================================
FORMAT MONEY
========================================= */

function formatMoney(value) {

const amount =
Number(value) || 0;

return (
"₹" +
amount.toLocaleString("en-IN")
);

}

/* =========================================
GET STORAGE DATA
========================================= */

function getEstimates() {

try {

return JSON.parse(
  localStorage.getItem("psw_estimates") || "[]"
);

} catch (error) {

return [];

}

}

function getBills() {

try {

return JSON.parse(
  localStorage.getItem("psw_bills") || "[]"
);

} catch (error) {

return [];

}

}

/* =========================================
DASHBOARD SUMMARY
========================================= */

function updateDashboard() {

const estimates =
getEstimates();

const bills =
getBills();

const estimateCount =
document.getElementById("estimateCount");

const billCount =
document.getElementById("billCount");

const paidTotal =
document.getElementById("paidTotal");

const dueTotal =
document.getElementById("dueTotal");

/* ESTIMATE COUNT */

if (estimateCount) {

estimateCount.textContent =
  estimates.length;

}

/* BILL COUNT */

if (billCount) {

billCount.textContent =
  bills.length;

}

/* MONEY */

let paid = 0;
let due = 0;

bills.forEach(bill => {

paid +=
  Number(bill.paid || 0);

due +=
  Number(bill.due || 0);

});

if (paidTotal) {

paidTotal.textContent =
  formatMoney(paid);

}

if (dueTotal) {

dueTotal.textContent =
  formatMoney(due);

}

}

/* =========================================
LOAD BUSINESS NAME
========================================= */

function loadBusinessName() {

const name =
getBusinessName();

const header =
document.getElementById("headerWorkName");

const welcome =
document.getElementById("welcomeWorkName");

if (header) {

header.textContent =
  name;

}

if (welcome) {

welcome.textContent =
  name;

}

}

/* =========================================
CLEAR APP DATA
========================================= */

function clearAllData() {

const confirmDelete =
confirm(
"Are you sure?\n\nThis will delete all saved estimates, bills, rates, packages and profile data."
);

if (!confirmDelete) {

return;

}

localStorage.removeItem(
"psw_estimates"
);

localStorage.removeItem(
"psw_bills"
);

localStorage.removeItem(
"psw_rates"
);

localStorage.removeItem(
"psw_packages"
);

localStorage.removeItem(
"psw_profile"
);

localStorage.removeItem(
"psw_selected_package"
);

localStorage.removeItem(
"psw_current_lesson"
);

localStorage.removeItem(
"psw_bill_number"
);

localStorage.removeItem(
"psw_estimate_number"
);

alert(
"All app data has been cleared."
);

location.reload();

}

/* =========================================
SAFE HTML
========================================= */

function escapeHTML(value) {

return String(value ?? "")
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """)
.replace(/'/g, "'");

}

/* =========================================
PAGE LOAD
========================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

updateDashboard();

loadBusinessName();

}
);

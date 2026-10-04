/* =========================================
   PARBEZ SMART WORKS
   COMMON JAVASCRIPT
========================================= */

const BUSINESS = {
  name: "Parbez Smart Works",
  owner: "Parbez Alom Badrul Alom",
  phone1: "9395305384",
  phone2: "9833762577",
  location: "Hojai, Assam",
  instagram: "@parbez_works",
  youtube: "@parbezworks",
  about:
    "Parbez Smart Works provides professional Electrical, False Ceiling and Plumbing services in Hojai, Assam. We handle house wiring, light and fan points, MCB/DB work, gypsum and PVC false ceiling, LED lighting, plumbing, leakage repair and general home electrical work."
};


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
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}


/* =========================================
   MONEY
========================================= */

function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}


/* =========================================
   SAFE HTML
========================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================
   BILL NUMBER
========================================= */

function getNextBillNumber() {
  const number =
    Number(localStorage.getItem("psw_bill_number")) || 1;

  return "PSW-" + String(number).padStart(4, "0");
}


function increaseBillNumber() {
  const number =
    Number(localStorage.getItem("psw_bill_number")) || 1;

  localStorage.setItem(
    "psw_bill_number",
    number + 1
  );
}


/* =========================================
   ESTIMATE NUMBER
========================================= */

function getNextEstimateNumber() {
  const number =
    Number(localStorage.getItem("psw_estimate_number")) || 1;

  return "EST-" + String(number).padStart(4, "0");
}


function increaseEstimateNumber() {
  const number =
    Number(localStorage.getItem("psw_estimate_number")) || 1;

  localStorage.setItem(
    "psw_estimate_number",
    number + 1
  );
}


/* =========================================
   PROFILE
========================================= */

function getBusinessProfile() {
  let saved = null;

  try {
    saved = JSON.parse(
      localStorage.getItem("psw_profile") || "null"
    );
  } catch (e) {
    saved = null;
  }

  return {
    workName: saved?.workName || BUSINESS.name,
    ownerName: saved?.ownerName || BUSINESS.owner,
    mobile: saved?.mobile || BUSINESS.phone1,
    secondMobile: saved?.secondMobile || BUSINESS.phone2,
    location: saved?.location || BUSINESS.location,
    instagram: saved?.instagram || BUSINESS.instagram,
    youtube: saved?.youtube || BUSINESS.youtube,
    about: saved?.about || BUSINESS.about
  };
}


/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp(phone, message) {

  let number = String(phone || "")
    .replace(/\D/g, "");

  if (number.length === 10) {
    number = "91" + number;
  }

  if (number.length < 12) {
    alert("WhatsApp number invalid hai.");
    return;
  }

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message || "");

  window.open(url, "_blank");
}


function openBusinessWhatsApp(message) {
  openWhatsApp(
    BUSINESS.phone1,
    message || "Hello Parbez Smart Works"
  );
}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

  let estimates = [];
  let bills = [];

  try {
    estimates = JSON.parse(
      localStorage.getItem("psw_estimates") || "[]"
    );

    bills = JSON.parse(
      localStorage.getItem("psw_bills") || "[]"
    );
  } catch (e) {}

  const estimateCount =
    document.getElementById("estimateCount");

  const billCount =
    document.getElementById("billCount");

  const paidTotal =
    document.getElementById("paidTotal");

  const dueTotal =
    document.getElementById("dueTotal");

  if (estimateCount) {
    estimateCount.textContent = estimates.length;
  }

  if (billCount) {
    billCount.textContent = bills.length;
  }

  let paid = 0;
  let due = 0;

  bills.forEach(bill => {
    paid += Number(bill.paid || 0);
    due += Number(bill.due || 0);
  });

  if (paidTotal) {
    paidTotal.textContent = money(paid);
  }

  if (dueTotal) {
    dueTotal.textContent = money(due);
  }
}


/* =========================================
   CLEAR DATA
========================================= */

function clearAllData() {

  if (!confirm(
    "Are you sure? All saved bills, estimates, rates, packages and profile data will be deleted."
  )) {
    return;
  }

  [
    "psw_estimates",
    "psw_bills",
    "psw_rates",
    "psw_packages",
    "psw_profile",
    "psw_bill_number",
    "psw_estimate_number"
  ].forEach(key => {
    localStorage.removeItem(key);
  });

  alert("App data cleared successfully.");
  location.reload();
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});

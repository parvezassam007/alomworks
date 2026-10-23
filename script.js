/* =========================================
   PARBEZ SMART WORKS
   COMMON JAVASCRIPT
========================================= */

"use strict";

/* =========================================
   BUSINESS INFORMATION
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
    "Parbez Smart Works provides Electrical, False Ceiling and Plumbing services in Hojai, Assam. Services include house wiring, lights, fans, MCB/DB work, gypsum and PVC false ceiling, LED lighting, plumbing and leakage repair."
};

/* =========================================
   MESSAGE
========================================= */

function showMessage(message) {
  alert(String(message ?? ""));
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
   MONEY FORMAT
========================================= */

function money(value) {
  const amount = Number(value);

  return "₹" + (Number.isFinite(amount) ? amount : 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
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
    .replace(/'/g, "&#39;");
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

  localStorage.setItem("psw_bill_number", number + 1);
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

  localStorage.setItem("psw_estimate_number", number + 1);
}

/* =========================================
   BUSINESS PROFILE
========================================= */

function getBusinessProfile() {
  let saved = null;

  try {
    saved = JSON.parse(
      localStorage.getItem("psw_profile") || "null"
    );
  } catch (error) {
    saved = null;
  }

  if (!saved || typeof saved !== "object") {
    saved = {};
  }

  return {
    workName: saved.workName || BUSINESS.name,
    ownerName: saved.ownerName || BUSINESS.owner,
    mobile: saved.mobile || BUSINESS.phone1,
    secondMobile: saved.secondMobile || BUSINESS.phone2,
    location: saved.location || BUSINESS.location,
    instagram: saved.instagram || BUSINESS.instagram,
    youtube: saved.youtube || BUSINESS.youtube,
    about: saved.about || BUSINESS.about
  };
}

/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp(phone, message) {
  let number = String(phone || "").replace(/\D/g, "");

  if (number.length === 10) {
    number = "91" + number;
  }

  if (!/^\d{11,15}$/.test(number)) {
    alert("WhatsApp number invalid hai.");
    return;
  }

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(String(message || ""));

  window.open(url, "_blank", "noopener,noreferrer");
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
    const savedEstimates =
      JSON.parse(localStorage.getItem("psw_estimates") || "[]");

    const savedBills =
      JSON.parse(localStorage.getItem("psw_bills") || "[]");

    estimates = Array.isArray(savedEstimates) ? savedEstimates : [];
    bills = Array.isArray(savedBills) ? savedBills : [];
  } catch (error) {
    estimates = [];
    bills = [];
  }

  const estimateCount = document.getElementById("estimateCount");
  const billCount = document.getElementById("billCount");
  const paidTotal = document.getElementById("paidTotal");
  const dueTotal = document.getElementById("dueTotal");

  if (estimateCount) {
    estimateCount.textContent = estimates.length;
  }

  if (billCount) {
    billCount.textContent = bills.length;
  }

  let paid = 0;
  let due = 0;

  bills.forEach(function (bill) {
    paid += Number(bill.paid) || 0;
    due += Number(bill.due) || 0;
  });

  if (paidTotal) {
    paidTotal.textContent = money(paid);
  }

  if (dueTotal) {
    dueTotal.textContent = money(due);
  }
}

/* =========================================
   CLEAR ALL DATA
========================================= */

function clearAllData() {
  const confirmed = confirm(
    "Are you sure? All saved bills, estimates, rates, packages and profile data will be deleted."
  );

  if (!confirmed) {
    return;
  }

  const keys = [
    "psw_estimates",
    "psw_bills",
    "psw_rates",
    "psw_packages",
    "psw_profile",
    "psw_bill_number",
    "psw_estimate_number"
  ];

  keys.forEach(function (key) {
    localStorage.removeItem(key);
  });

  alert("App data cleared successfully.");
  location.reload();
}

/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  updateDashboard();
});

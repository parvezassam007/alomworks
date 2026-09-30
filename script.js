/* =========================================
   PARBEZ SMART WORKS
   COMMON JAVASCRIPT
========================================= */


/* =========================================
   BUSINESS INFORMATION
========================================= */

const BUSINESS = {
  name: "Parbez Smart Works",
  owner: "Parbez Alom Badrul Alom",
  phone1: "9395305384",
  phone2: "9833762577",
  location: "Hojai, Assam",

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

  return "₹" +
    Number(value || 0).toLocaleString("en-IN");

}


/* =========================================
   BILL NUMBER
========================================= */

function getNextBillNumber() {

  const number =
    Number(localStorage.getItem("psw_bill_number")) || 1;

  return "PSW-" +
    String(number).padStart(4, "0");

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

  return "EST-" +
    String(number).padStart(4, "0");

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
   BUSINESS PROFILE
========================================= */

function getBusinessProfile() {

  const saved =
    JSON.parse(
      localStorage.getItem("psw_profile") || "null"
    );

  return {

    workName:
      saved?.workName ||
      BUSINESS.name,

    ownerName:
      saved?.ownerName ||
      BUSINESS.owner,

    mobile:
      saved?.mobile ||
      BUSINESS.phone1,

    secondMobile:
      saved?.secondMobile ||
      BUSINESS.phone2,

    location:
      saved?.location ||
      BUSINESS.location,

    instagram:
      saved?.instagram ||
      "@parbez_works",

    youtube:
      saved?.youtube ||
      "@parbezworks",

    about:
      saved?.about ||
      BUSINESS.about

  };

}


/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp(phone, message) {

  let number =
    String(phone || "")
      .replace(/\D/g, "");

  if (number.length === 10) {
    number = "91" + number;
  }

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message || "");

  window.open(url, "_blank");

}


/* =========================================
   BUSINESS WHATSAPP
========================================= */

function openBusinessWhatsApp(message) {

  openWhatsApp(
    BUSINESS.phone1,
    message ||
    "Hello Parbez Smart Works"
  );

}


/* =========================================
   DASHBOARD SUMMARY
========================================= */

function updateDashboard() {

  const estimates =
    JSON.parse(
      localStorage.getItem("psw_estimates") || "[]"
    );

  const bills =
    JSON.parse(
      localStorage.getItem("psw_bills") || "[]"
    );


  const estimateCount =
    document.getElementById("estimateCount");

  const billCount =
    document.getElementById("billCount");

  const paidTotal =
    document.getElementById("paidTotal");

  const dueTotal =
    document.getElementById("dueTotal");


  if (estimateCount) {

    estimateCount.textContent =
      estimates.length;

  }


  if (billCount) {

    billCount.textContent =
      bills.length;

  }


  let paid = 0;
  let due = 0;


  bills.forEach(bill => {

    paid += Number(bill.paid || 0);

    due += Number(bill.due || 0);

  });


  if (paidTotal) {

    paidTotal.textContent =
      money(paid);

  }


  if (dueTotal) {

    dueTotal.textContent =
      money(due);

  }

}


/* =========================================
   CLEAR APP DATA
========================================= */

function clearAllData() {

  const confirmDelete =
    confirm(
      "Are you sure? This will delete saved estimates, bills, rates and profile data."
    );

  if (!confirmDelete) return;


  localStorage.removeItem("psw_estimates");
  localStorage.removeItem("psw_bills");
  localStorage.removeItem("psw_rates");
  localStorage.removeItem("psw_packages");
  localStorage.removeItem("psw_profile");
  localStorage.removeItem("psw_bill_number");
  localStorage.removeItem("psw_estimate_number");


  alert("App data cleared.");

  location.reload();

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateDashboard();

  }
);

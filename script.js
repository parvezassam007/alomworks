/* =========================================
   PARBEZ SMART WORKS
   COMMON JAVASCRIPT
========================================= */


/* MESSAGE */

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
   BILL NUMBER
========================================= */

function getNextBillNumber() {

  let number =
    Number(localStorage.getItem("psw_bill_number")) || 1;

  const bill =
    "PSW-" + String(number).padStart(4, "0");

  return bill;

}


function increaseBillNumber() {

  let number =
    Number(localStorage.getItem("psw_bill_number")) || 1;

  localStorage.setItem(
    "psw_bill_number",
    number + 1
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
      "₹" + paid.toLocaleString("en-IN");

  }


  if (dueTotal) {

    dueTotal.textContent =
      "₹" + due.toLocaleString("en-IN");

  }

}


/* =========================================
   CLEAR DATA
========================================= */

function clearAllData() {

  const confirmDelete =
    confirm(
      "Are you sure? This will delete saved app data."
    );

  if (!confirmDelete) return;


  localStorage.removeItem("psw_estimates");
  localStorage.removeItem("psw_bills");
  localStorage.removeItem("psw_rates");
  localStorage.removeItem("psw_packages");
  localStorage.removeItem("psw_profile");


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

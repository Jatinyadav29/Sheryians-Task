var CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
};

function getCurrentCurrency() {
  return localStorage.getItem("fintrack_currency") || "INR";
}

function formatAmount(amount) {
  var symbol = CURRENCY_SYMBOLS[getCurrentCurrency()] || "₹";
  var num = Number(amount) || 0;
  return (
    symbol +
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem("LoggedInUser"));
  } catch (err) {
    return null;
  }
}

function getTransactionsKey() {
  var user = getLoggedInUser();
  return user ? "transactions_" + user.userId : "fintrack_transactions_guest";
}

function loadTransactions() {
  try {
    var raw = localStorage.getItem(getTransactionsKey());
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to load transactions, resetting.", err);
    return [];
  }
}

function saveTransactions(list) {
  localStorage.setItem(getTransactionsKey(), JSON.stringify(list));
}

function calculateTotals(list) {
  var income = 0;
  var expense = 0;
  list.forEach(function (txn) {
    if (txn.type === "income") {
      income += Number(txn.amount) || 0;
    } else {
      expense += Number(txn.amount) || 0;
    }
  });
  return {
    income: income,
    expense: expense,
    balance: income - expense,
    count: list.length,
  };
}
function renderStatCards(totals) {
  document.getElementById("stat-balance").textContent = formatAmount(
    totals.balance,
  );
  document.getElementById("stat-income").textContent = formatAmount(
    totals.income,
  );
  document.getElementById("stat-expense").textContent = formatAmount(
    totals.expense,
  );
  document.getElementById("stat-count").textContent = totals.count;
}

function getFilteredTransactions(list) {
  if (currentFilter === "income") {
    return list.filter(function (t) {
      return t.type === "income";
    });
  }
  if (currentFilter === "expense") {
    return list.filter(function (t) {
      return t.type === "expense";
    });
  }
  return list;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "—";
  var d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function renderTable() {
  var all = loadTransactions();

  var sorted = all.slice().sort(function (a, b) {
    return b.id - a.id;
  });
  var visible = getFilteredTransactions(sorted);
  var tbody = document.getElementById("transaction-table-body");

  if (visible.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="table-empty">No transactions yet — click "+ Add Transaction" to get started.</td></tr>';
    return;
  }

  tbody.innerHTML = visible
    .map(function (txn) {
      var amountClass =
        txn.type === "income" ? "amount-income" : "amount-expense";
      var sign = txn.type === "income" ? "+" : "-";
      return (
        "" +
        "<tr>" +
        "<td>" +
        formatDateDisplay(txn.date) +
        "</td>" +
        "<td>" +
        escapeHtml(txn.description) +
        "</td>" +
        '<td><span class="category-pill">' +
        escapeHtml(txn.category) +
        "</span></td>" +
        '<td class="' +
        amountClass +
        '">' +
        sign +
        formatAmount(txn.amount) +
        "</td>" +
        '<td><button class="delete-btn" data-delete-id="' +
        txn.id +
        '">Delete</button></td>' +
        "</tr>"
      );
    })
    .join("");
}

document
  .getElementById("transaction-table-body")
  .addEventListener("click", function (e) {
    var btn = e.target.closest("[data-delete-id]");
    if (!btn) return;
    var id = Number(btn.getAttribute("data-delete-id"));
    deleteTransaction(id);
  });

var cashFlowChartInstance = null;

function readCssColor(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

function renderChart() {
  var all = loadTransactions();
  var sorted = all.slice().sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  var byDate = {};
  var orderedDates = [];
  sorted.forEach(function (txn) {
    var key = txn.date || "Unknown";
    if (!byDate[key]) {
      byDate[key] = { income: 0, expense: 0 };
      orderedDates.push(key);
    }
    if (txn.type === "income") {
      byDate[key].income += Number(txn.amount) || 0;
    } else {
      byDate[key].expense += Number(txn.amount) || 0;
    }
  });

  var labels = orderedDates.map(formatDateDisplay);
  var incomeData = orderedDates.map(function (d) {
    return byDate[d].income;
  });
  var expenseData = orderedDates.map(function (d) {
    return byDate[d].expense;
  });

  var incomeColor = readCssColor("--color-income") || "#17a673";
  var expenseColor = readCssColor("--color-expense") || "#e0453f";
  var gridColor = readCssColor("--color-border") || "#e4e7ee";
  var textColor = readCssColor("--color-text-muted") || "#6b7080";

  var ctx = document.getElementById("cashFlowChart").getContext("2d");

  if (cashFlowChartInstance) {
    cashFlowChartInstance.destroy();
  }

  cashFlowChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.length ? labels : ["No data yet"],
      datasets: [
        {
          label: "Income",
          data: labels.length ? incomeData : [0],
          backgroundColor: incomeColor,
          borderRadius: 4,
          maxBarThickness: 28,
        },
        {
          label: "Expense",
          data: labels.length ? expenseData : [0],
          backgroundColor: expenseColor,
          borderRadius: 4,
          maxBarThickness: 28,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: { color: textColor, font: { size: 11 } },
        },
      },
    },
  });
}

function refreshAll() {
  var totals = calculateTotals(loadTransactions());
  renderStatCards(totals);
  renderTable();
  renderChart();
}

const FORM_MODAL = document.getElementById("form-modal");
const PROFILE_NAME = document.getElementById("profile-name");
const REGISTER_FORM = document.getElementById("register-form");
const LOGIN_FORM = document.getElementById("login-form");
const LOGOUT_BTN = document.getElementById("logout-btn");

var registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

function dashboardValues() {
  refreshAll();
}

function filterMyTransactions() {
  renderTable();
}

function checkAuthentication() {
  const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
  if (loggedInUser) {
    FORM_MODAL.style.display = "none";
    showPage("main");
    PROFILE_NAME.textContent = loggedInUser.userId.charAt(0).toUpperCase();
  } else {
    FORM_MODAL.style.display = "flex";
    showPage("login");
  }
}

REGISTER_FORM.addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = e.target[0].value;
  const userPassword = e.target[1].value;

  const userExists = registeredUsers.some((user) => user.userId === userId);

  if (userExists) {
    alert("User already exists.");
    return;
  }

  if (
    userId.trim() === "" ||
    userId.length < 5 ||
    userPassword.trim() === "" ||
    userPassword.length < 8
  ) {
    alert("User at least 5 charactors and Password 8 characters.");
    return;
  }

  const newUser = { id: Date.now(), userId, userPassword };
  registeredUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(registeredUsers));

  REGISTER_FORM.reset();
  showPage("login");
});

LOGIN_FORM.addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = e.target[0].value;
  const userPassword = e.target[1].value;

  const user = registeredUsers.find((u) => u.userId === userId);

  if (!user) {
    alert("User not found");
    return;
  }

  if (user.userPassword !== userPassword) {
    alert("Incorrect password");
    return;
  }

  localStorage.setItem("LoggedInUser", JSON.stringify(user));
  alert("Login Successful.");
  FORM_MODAL.style.display = "none";
  showPage("main");

  checkAuthentication();
  dashboardValues();
  filterMyTransactions();
});

LOGOUT_BTN.addEventListener("click", function () {
  localStorage.removeItem("LoggedInUser");
  location.reload();
  alert("Logged Out Successfully.");
});

var AUTH_PAGE_IDS = ["login", "register", "main"];
var APP_PAGE_IDS = ["dashboard", "settings"];

function showPage(pageId) {
  if (AUTH_PAGE_IDS.indexOf(pageId) !== -1) {
    AUTH_PAGE_IDS.forEach(function (id) {
      document.getElementById(id).classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
    return;
  }

  document.querySelectorAll(".page").forEach(function (page) {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".navbar__link").forEach(function (link) {
    link.classList.remove("active");
  });
  document.getElementById("nav-" + pageId).classList.add("active");
}

var modalOverlay = document.getElementById("modal-overlay");
var addTransactionBtn = document.getElementById("add-transaction-btn");
var modalCloseBtn = document.getElementById("modal-close-btn");

function openModal() {
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

addTransactionBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

function addTransaction(txn) {
  var all = loadTransactions();
  all.push(txn);
  saveTransactions(all);
}

function deleteTransaction(id) {
  var all = loadTransactions();
  var filtered = all.filter(function (t) {
    return t.id !== id;
  });
  saveTransactions(filtered);
  refreshAll();
}

document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var type = document.getElementById("txn-type").value;
    var description = document.getElementById("txn-description").value.trim();
    var amountRaw = document.getElementById("txn-amount").value;
    var date = document.getElementById("txn-date").value;
    var category = document.getElementById("txn-category").value;
    var amount = parseFloat(amountRaw);

    if (
      !type ||
      !description ||
      !amountRaw ||
      isNaN(amount) ||
      amount <= 0 ||
      !date ||
      !category
    ) {
      alert(
        "Please fill in every field with a valid value — amount must be greater than zero.",
      );
      return;
    }

    var transaction = {
      id: new Date().getTime(),
      type: type,
      description: description,
      amount: amount,
      date: date,
      category: category,
    };

    addTransaction(transaction);

    this.reset();
    setTxnType("income");
    document.getElementById("txn-date").value = "";

    closeModal();
    refreshAll();
  });

function setTxnType(type) {
  document.getElementById("txn-type").value = type;
  document.querySelectorAll(".type-toggle button").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.type === type);
  });
}
var currentFilter = "all";

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  document.getElementById("filter-" + filter).classList.add("active");
  renderTable();
}

var darkModeToggle = document.getElementById("dark-mode-toggle");

(function initTheme() {
  var saved = localStorage.getItem("fintrack_dark_mode");
  if (saved === "true") {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }
})();

darkModeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark", darkModeToggle.checked);
  localStorage.setItem("fintrack_dark_mode", darkModeToggle.checked);
  renderChart();
});

var settingsNameInput = document.getElementById("settings-name");
var settingsCurrencySelect = document.getElementById("settings-currency");
var saveProfileBtn = document.getElementById("save-profile-btn");
var profileSaveNote = document.getElementById("profile-save-note");

(function loadProfile() {
  settingsNameInput.value = localStorage.getItem("fintrack_display_name") || "";
  var savedCurrency = localStorage.getItem("fintrack_currency");
  if (savedCurrency) {
    settingsCurrencySelect.value = savedCurrency;
  }
})();

saveProfileBtn.addEventListener("click", function () {
  localStorage.setItem("fintrack_display_name", settingsNameInput.value.trim());
  localStorage.setItem("fintrack_currency", settingsCurrencySelect.value);
  refreshAll();
  profileSaveNote.textContent = "Saved";
  profileSaveNote.classList.add("visible");
  setTimeout(function () {
    profileSaveNote.classList.remove("visible");
    profileSaveNote.textContent = "";
  }, 2000);
});

settingsCurrencySelect.addEventListener("change", function () {
  localStorage.setItem("fintrack_currency", settingsCurrencySelect.value);
  refreshAll();
});

document
  .getElementById("reset-data-btn")
  .addEventListener("click", function () {
    var confirmed = confirm(
      "This will permanently delete every transaction and preference stored in this browser. This cannot be undone. Continue?",
    );
    if (confirmed) {
      localStorage.clear();
      location.reload();
    }
  });

checkAuthentication();
dashboardValues();
filterMyTransactions();

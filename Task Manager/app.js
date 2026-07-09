(function () {
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("app-theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "☀" : "☾";

  themeBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("app-theme", newTheme);

    themeBtn.textContent = newTheme === "dark" ? "☀" : "☾";
  });
})();

(function () {
  const taskList = document.getElementById("task-list");
  const input = document.getElementById("new-task-input");
  const addBtn = document.getElementById("add-btn");
  const logEl = document.getElementById("task-log");
  const btnCountEl = document.getElementById("btn-count");

  let nextId = 1;

  function log(msg) {
    console.log(msg);
    if (logEl.querySelector(".empty")) logEl.innerHTML = "";
    const line = document.createElement("div");
    line.append(document.createTextNode(msg));
    logEl.append(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function updateBtnCount() {
    btnCountEl.textContent = taskList.querySelectorAll("button").length;
  }

  function updateEmptyState() {
    const existing = taskList.querySelector(".empty-state");
    if (taskList.children.length === 0) {
      if (!existing) {
        const li = document.createElement("li");
        li.className = "empty-state text-mute";
        li.append(document.createTextNode("No tasks yet — add one above."));
        taskList.append(li);
      }
    } else if (existing && taskList.children.length > 1) {
      taskList.removeChild(existing);
    }
  }

  function createTaskElement(id, text) {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = id;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "toggle-btn";
    toggleBtn.dataset.action = "toggle";
    toggleBtn.setAttribute("aria-label", "Mark complete");
    li.append(toggleBtn);

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.append(document.createTextNode(text));
    li.append(textSpan);

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "icon-btn";
    editBtn.dataset.action = "edit";
    editBtn.append(document.createTextNode("Edit"));
    li.append(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "icon-btn danger";
    deleteBtn.dataset.action = "delete";
    deleteBtn.append(document.createTextNode("Delete"));
    li.append(deleteBtn);

    return li;
  }

  function addTask() {
    const text = input.value.trim();
    if (!text) return;
    const id = nextId++;
    const li = createTaskElement(id, text);
    taskList.append(li);
    input.value = "";
    input.focus();
    updateEmptyState();
    updateBtnCount();
    log(`Added task #${id}: "${text}"`);
  }

  function setButtonLabel(btn, label, action) {
    while (btn.firstChild) btn.removeChild(btn.firstChild);
    btn.append(document.createTextNode(label));
    btn.dataset.action = action;
  }

  function startEdit(li, editBtn) {
    const span = li.querySelector(".task-text");
    const currentText = span.textContent;
    li.dataset.original = currentText;
    li.classList.add("editing");

    while (span.firstChild) span.removeChild(span.firstChild);
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = currentText;
    span.append(editInput);

    setButtonLabel(editBtn, "Save", "save");
    editInput.focus();
    editInput.select();
  }

  function commitEdit(li, saveBtn) {
    const editInput = li.querySelector(".edit-input");
    if (!editInput) return;
    const newText = editInput.value.trim() || li.dataset.original;
    const span = li.querySelector(".task-text");
    while (span.firstChild) span.removeChild(span.firstChild);
    span.append(document.createTextNode(newText));
    li.classList.remove("editing");
    setButtonLabel(saveBtn, "Edit", "edit");
    log(
      `Edited task #${li.dataset.id}: "${li.dataset.original}" → "${newText}"`,
    );
    delete li.dataset.original;
  }

  function cancelEdit(li, saveBtn) {
    const span = li.querySelector(".task-text");
    while (span.firstChild) span.removeChild(span.firstChild);
    span.append(document.createTextNode(li.dataset.original));
    li.classList.remove("editing");
    setButtonLabel(saveBtn, "Edit", "edit");
    delete li.dataset.original;
  }

  taskList.addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn || !taskList.contains(btn)) return;
    const li = btn.closest("li.task");
    if (!li) return;
    const action = btn.dataset.action;

    if (action === "toggle") {
      li.classList.toggle("done");
      const isDone = li.classList.contains("done");
      while (btn.firstChild) btn.removeChild(btn.firstChild);
      if (isDone) btn.append(document.createTextNode("✓"));
      log(
        `Task #${li.dataset.id} marked ${isDone ? "complete" : "incomplete"}`,
      );
    } else if (action === "delete") {
      const text = li.querySelector(".task-text").textContent;
      taskList.removeChild(li);
      updateEmptyState();
      updateBtnCount();
      log(`Deleted task #${li.dataset.id}: "${text}"`);
    } else if (action === "edit") {
      startEdit(li, btn);
    } else if (action === "save") {
      commitEdit(li, btn);
    }
  });

  taskList.addEventListener("keydown", function (e) {
    if (!e.target.classList.contains("edit-input")) return;
    const li = e.target.closest("li.task");
    const saveBtn = li.querySelector('button[data-action="save"]');
    if (e.key === "Enter") {
      commitEdit(li, saveBtn);
    } else if (e.key === "Escape") {
      cancelEdit(li, saveBtn);
    }
  });

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
  });

  ["Setup absolute imports", "Audit Core Web Vitals"].forEach((t) => {
    const id = nextId++;
    taskList.append(createTaskElement(id, t));
  });
  updateEmptyState();
  updateBtnCount();
})();

(function () {
  const gp = document.getElementById("grandparent");
  const p = document.getElementById("parent");
  const btn = document.getElementById("target-btn");
  const logEl = document.getElementById("prop-log");
  const stopAtSel = document.getElementById("stop-at");
  const captureToggle = document.getElementById("toggle-capture");
  const bubbleToggle = document.getElementById("toggle-bubble");

  let counter = 0;

  function logRow(phaseLabel, phaseClass, text) {
    counter++;
    console.log(`[${counter}] ${phaseLabel.toUpperCase()} - ${text}`);
    if (logEl.querySelector(".empty")) logEl.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span class="idx">${counter}</span><span class="phase ${phaseClass}">${phaseLabel}</span><span>${text}</span>`;
    logEl.appendChild(row);
    logEl.scrollTop = logEl.scrollHeight;
  }

  let sequence = [];

  function makeHandler(label, phaseLabel, phaseClass, stopKey, visualEl) {
    return function (e) {
      logRow(phaseLabel, phaseClass, label);
      sequence.push({ el: visualEl, phaseClass, phaseLabel, label });
      if (stopAtSel.value === stopKey) {
        e.stopPropagation();
        logRow(phaseLabel, phaseClass, `${label} called stopPropagation()`);
        sequence.push({ el: null, phaseClass, phaseLabel, label: "stopped" });
      }
    };
  }

  window.addEventListener(
    "click",
    function () {
      sequence = [];
      setTimeout(() => animateSequence(sequence.slice()), 0);
    },
    true,
  );

  function clearFlow() {
    gp.classList.remove("flow-capture", "flow-bubble");
    p.classList.remove("flow-capture", "flow-bubble");
    const ind = document.getElementById("phase-indicator");
    ind.classList.remove("active-capture", "active-bubble", "active-target");
  }

  function animateSequence(seq) {
    clearFlow();
    const ind = document.getElementById("phase-indicator");
    const text = document.getElementById("phase-text");
    const STEP = 320;
    seq.forEach((step, i) => {
      setTimeout(() => {
        clearFlow();
        if (step.label === "stopped") {
          text.textContent = `Propagation stopped here`;
          return;
        }
        if (step.el && step.phaseClass === "target") {
          step.el.classList.remove("pulse-glow");
          void step.el.offsetWidth;
          step.el.classList.add("pulse-glow");
        } else if (step.el) {
          step.el.classList.add(
            step.phaseClass === "bubble" ? "flow-bubble" : "flow-capture",
          );
        }
        ind.classList.add(`active-${step.phaseClass}`);
        text.textContent = `${step.phaseLabel} — ${step.label}`;
      }, i * STEP);
    });
    setTimeout(
      () => {
        clearFlow();
        text.textContent = "Click the button to watch the flow";
      },
      seq.length * STEP + 400,
    );
  }

  let handlers = [];

  function teardown() {
    handlers.forEach(({ el, fn, capture }) =>
      el.removeEventListener("click", fn, capture),
    );
    handlers = [];
  }

  function setup() {
    teardown();
    const useCapture = captureToggle.checked;
    const useBubble = bubbleToggle.checked;

    if (useCapture) {
      const gpCap = makeHandler(
        "Grandparent listener",
        "capture",
        "capture",
        "gp-capture",
        gp,
      );
      const pCap = makeHandler(
        "Parent listener",
        "capture",
        "capture",
        "p-capture",
        p,
      );
      gp.addEventListener("click", gpCap, true);
      p.addEventListener("click", pCap, true);
      handlers.push(
        { el: gp, fn: gpCap, capture: true },
        { el: p, fn: pCap, capture: true },
      );
    }

    const targetFn = makeHandler(
      "Target listener",
      "target",
      "target",
      "target",
      btn,
    );
    btn.addEventListener("click", targetFn, false);
    handlers.push({ el: btn, fn: targetFn, capture: false });

    if (useBubble) {
      const pBub = makeHandler(
        "Parent listener",
        "bubble",
        "bubble",
        "p-bubble",
        p,
      );
      const gpBub = makeHandler(
        "Grandparent listener",
        "bubble",
        "bubble",
        "gp-bubble",
        gp,
      );
      p.addEventListener("click", pBub, false);
      gp.addEventListener("click", gpBub, false);
      handlers.push(
        { el: p, fn: pBub, capture: false },
        { el: gp, fn: gpBub, capture: false },
      );
    }
  }

  btn.addEventListener("click", () => {
    btn.classList.remove("pulse-glow");
    void btn.offsetWidth;
    btn.classList.add("pulse-glow");
    if (!logEl.querySelector(".empty")) {
      const divider = document.createElement("div");
      divider.style.cssText =
        "height:1px;background:var(--border-strong);margin:8px 0;";
      logEl.appendChild(divider);
    }
  });

  captureToggle.addEventListener("change", setup);
  bubbleToggle.addEventListener("change", setup);
  stopAtSel.addEventListener("change", setup);
  document.getElementById("clear-log").addEventListener("click", () => {
    logEl.innerHTML =
      '<div class="empty">Nothing logged yet. Click the button.</div>';
    counter = 0;
  });

  setup();
})();

(function () {
  function logRow(label, before, after) {
    console.log(
      `${label}\n  before: ${JSON.stringify(before)}\n  after:  ${JSON.stringify(after)}`,
    );
  }
  function flash(el) {
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }

  const d3input = document.getElementById("d3-input");
  const d3form = document.getElementById("d3-form");
  let d3mode = "following";

  function d3render() {
    document.getElementById("d3-attr").textContent = JSON.stringify(
      d3input.getAttribute("value"),
    );
    document.getElementById("d3-defaultvalue").textContent = JSON.stringify(
      d3input.defaultValue,
    );
    document.getElementById("d3-value").textContent = JSON.stringify(
      d3input.value,
    );
    const pill = document.getElementById("d3-mode-pill");
    pill.textContent = d3mode;
    pill.className =
      "pill " + (d3mode === "following" ? "state-following" : "state-detached");
  }

  window.d3setAttr = function () {
    const before = d3input.value;
    d3input.setAttribute("value", "new default");
    logRow("setAttribute('value')", before, d3input.value);
    d3render();
    flash(document.getElementById("d3-attr").parentElement);
    flash(document.getElementById("d3-defaultvalue").parentElement);
  };
  window.d3setDefaultValue = function () {
    const before = d3input.value;
    d3input.defaultValue = "new default";
    logRow("input.defaultValue", before, d3input.value);
    d3render();
    flash(document.getElementById("d3-defaultvalue").parentElement);
    flash(document.getElementById("d3-attr").parentElement);
  };
  window.d3setValue = function () {
    const before = d3input.value;
    d3input.value = "hello!";
    d3mode = "detached";
    logRow("input.value", before, d3input.value);
    d3render();
    flash(document.getElementById("d3-value").parentElement);
    flash(document.getElementById("d3-mode-pill"));
  };
  window.d3reset = function () {
    const before = d3input.value;
    d3form.reset();
    d3mode = "following";
    logRow("form.reset()", before, d3input.value);
    d3render();
    flash(document.getElementById("d3-mode-pill"));
  };

  d3input.addEventListener("input", () => {
    logRow("user typed", undefined, d3input.value);
    d3mode = "detached";
    d3render();
  });

  d3render();
})();

(function () {
  window.clearAll = function () {
    document
      .querySelectorAll("#dom-tree .node")
      .forEach((n) => n.classList.remove("shown"));
    document
      .querySelectorAll("#render-tree .node")
      .forEach((n) => n.classList.remove("shown"));
    document.getElementById("html-src").classList.remove("hl-dom");
    ["prev-div", "prev-span"].forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove("layout-on", "paint-on");
    });
    document.getElementById("dim-div").textContent = "";
  };

  function showDom() {
    document.getElementById("html-src").classList.add("hl-dom");
    document.querySelectorAll("#dom-tree .node").forEach((n, i) => {
      setTimeout(() => n.classList.add("shown"), i * 180);
    });
  }
  function showRenderTree() {
    document.querySelectorAll("#render-tree .node").forEach((n, i) => {
      setTimeout(() => n.classList.add("shown"), i * 180);
    });
  }
  function showLayout() {
    document.getElementById("prev-div").classList.add("layout-on");
    document.getElementById("dim-div").textContent = "x:20 y:20 w:328 h:22";
  }
  function showPaint() {
    document.getElementById("prev-div").classList.add("paint-on");
    document.getElementById("prev-div").style.color = "#0d9488";
  }
  function showComposite() {
    const frame = document.querySelector(".browser-frame");
    frame.classList.remove("composite-flash");
    void frame.offsetWidth;
    frame.classList.add("composite-flash");
  }

  const steps = [
    { label: "Step 1 — HTML to DOM Tree", run: showDom },
    { label: "Step 2 — Merge to Render Tree", run: showRenderTree },
    { label: "Step 3 — Layout Geometry", run: showLayout },
    { label: "Step 4 — Paint Color/Text", run: showPaint },
    { label: "Step 5 — Composite to Screen", run: showComposite },
  ];
  let current = -1;

  function renderStep() {
    window.clearAll();
    for (let i = 0; i <= current; i++) steps[i].run();
    document.getElementById("step-label").textContent = steps[current].label;

    document.getElementById("prev-btn").disabled = current <= 0;
    if (current <= 0)
      document.getElementById("prev-btn").classList.remove("btn-primary");
    else document.getElementById("prev-btn").classList.add("btn-primary");

    if (current >= steps.length - 1) {
      document.getElementById("next-btn").disabled = true;
      document.getElementById("next-btn").classList.remove("btn-primary");
    } else {
      document.getElementById("next-btn").disabled = false;
      document.getElementById("next-btn").classList.add("btn-primary");
    }
  }

  window.nextStep = function () {
    if (current < steps.length - 1) {
      current++;
      renderStep();
    }
  };
  window.prevStep = function () {
    if (current > 0) {
      current--;
      renderStep();
    }
  };

  document.getElementById("next-btn").addEventListener("click", nextStep);
  document.getElementById("prev-btn").addEventListener("click", prevStep);

  current = 0;
  renderStep();
})();

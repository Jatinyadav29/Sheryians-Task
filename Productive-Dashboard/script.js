try {
  document.documentElement.dataset.theme =
    localStorage.getItem("still-theme") || "dark";
} catch (e) {}

(() => {
  "use strict";
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)],
    prefix = "still-";
  const read = (k, f) => {
      try {
        let v = JSON.parse(localStorage.getItem(prefix + k));
        return Array.isArray(f)
          ? Array.isArray(v)
            ? v
            : f
          : v && typeof v === "object"
            ? v
            : f;
      } catch {
        return f;
      }
    },
    write = (k, v) => {
      try {
        localStorage.setItem(prefix + k, JSON.stringify(v));
      } catch {}
    },
    id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    esc = (s) => {
      const d = document.createElement("div");
      d.textContent = String(s);
      return d.innerHTML;
    };
  let todos = read("todos", []),
    goals = read("goals", []),
    plans = read("plans", {}),
    active = "home",
    timer = null,
    seconds = 1500,
    planHour = null;
  function show(view) {
    if (view === active || !$("#" + view)) return;
    $$(".view").forEach((x) => x.classList.toggle("active", x.id === view));
    active = view;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $$("[data-open]").forEach((b) =>
    b.addEventListener("click", () => show(b.dataset.open)),
  );
  $$(".back").forEach((b) => b.addEventListener("click", () => show("home")));
  function renderTodos() {
    $("#todoList").innerHTML = todos.length
      ? todos
          .map(
            (t) =>
              `<li class="item ${t.done ? "done" : ""}" data-id="${t.id}"><input class="check" type="checkbox" data-act="done" ${t.done ? "checked" : ""} aria-label="Complete task"><span class="item-text">${esc(t.text)}</span><button class="icon-btn ${t.important ? "important" : ""}" data-act="star" aria-label="Mark important">★</button><button class="icon-btn" data-act="delete" aria-label="Delete task">×</button></li>`,
          )
          .join("")
      : '<li class="empty">A clear list is a good place to begin.</li>';
  }
  $("#todoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let i = $("#todoInput"),
      text = i.value.trim();
    if (!text) return;
    todos.unshift({ id: id(), text, done: false, important: false });
    write("todos", todos);
    renderTodos();
    i.value = "";
    i.focus();
  });
  $("#todoList").addEventListener("click", (e) => {
    let act = e.target.dataset.act,
      task = todos.find(
        (t) => t.id === e.target.closest("[data-id]")?.dataset.id,
      );
    if (!task) return;
    if (act === "delete") todos = todos.filter((t) => t !== task);
    if (act === "star") task.important = !task.important;
    write("todos", todos);
    renderTodos();
  });
  $("#todoList").addEventListener("change", (e) => {
    if (e.target.dataset.act !== "done") return;
    let t = todos.find(
      (x) => x.id === e.target.closest("[data-id]")?.dataset.id,
    );
    if (t) {
      t.done = e.target.checked;
      write("todos", todos);
      renderTodos();
    }
  });
  function renderGoals() {
    let done = goals.filter((g) => g.done).length,
      total = goals.length;
    $("#goalList").innerHTML = total
      ? goals
          .map(
            (g) =>
              `<li class="item ${g.done ? "done" : ""}" data-id="${g.id}"><input class="check" type="checkbox" data-act="done" ${g.done ? "checked" : ""} aria-label="Complete goal"><span class="item-text">${esc(g.text)}</span><button class="icon-btn" data-act="delete" aria-label="Delete goal">×</button></li>`,
          )
          .join("")
      : '<li class="empty">Name one thing that would make today count.</li>';
    $("#goalMetric").textContent = `${done} of ${total}`;
    $("#goalCopy").textContent = total
      ? `${Math.round((done / total) * 100)}% completed`
      : "completed";
    $("#goalProgress").style.width = total ? `${(done / total) * 100}%` : "0";
  }
  $("#goalForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let i = $("#goalInput"),
      text = i.value.trim();
    if (!text) return;
    goals.unshift({ id: id(), text, done: false });
    write("goals", goals);
    renderGoals();
    i.value = "";
    i.focus();
  });
  $("#goalList").addEventListener("click", (e) => {
    let ident = e.target.closest("[data-id]")?.dataset.id;
    if (e.target.dataset.act === "delete" && ident) {
      goals = goals.filter((g) => g.id !== ident);
      write("goals", goals);
      renderGoals();
    }
  });
  $("#goalList").addEventListener("change", (e) => {
    if (e.target.dataset.act === "done") {
      let g = goals.find(
        (x) => x.id === e.target.closest("[data-id]")?.dataset.id,
      );
      if (g) {
        g.done = e.target.checked;
        write("goals", goals);
        renderGoals();
      }
    }
  });
  const label = (h) =>
    new Date(2020, 0, 1, h).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  function renderPlanner() {
    let now = new Date().getHours();
    $("#plannerGrid").innerHTML = Array.from({ length: 13 }, (_, n) => {
      let h = n + 8;
      return `<label class="time-row ${h === now ? "current" : ""}"><span class="time">${label(h)}</span><textarea class="input slot" data-hour="${h}" maxlength="500" placeholder="Make space for something…">${esc(plans[h] || "")}</textarea></label>`;
    }).join("");
  }
  $("#plannerGrid").addEventListener(
    "blur",
    (e) => {
      if (e.target.matches(".slot")) {
        plans[e.target.dataset.hour] = e.target.value.trim();
        write("plans", plans);
      }
    },
    true,
  );
  function drawTimer() {
    let m = Math.floor(seconds / 60),
      s = seconds % 60;
    $("#timerDisplay").textContent =
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  $("#timerStart").addEventListener("click", () => {
    stop();
    $("#timerStatus").textContent = "Focus session in progress";
    timer = setInterval(() => {
      if (seconds <= 0) {
        stop();
        $("#timerStatus").textContent = "Session complete — take a breath.";
        return;
      }
      seconds--;
      drawTimer();
    }, 1000);
  });
  $("#timerPause").addEventListener("click", () => {
    stop();
    $("#timerStatus").textContent = "Paused — return when ready";
  });
  $("#timerReset").addEventListener("click", () => {
    stop();
    seconds = 1500;
    drawTimer();
    $("#timerStatus").textContent = "Ready for a work session";
  });
  const fallback = [
    ["The secret of getting ahead is getting started.", "Mark Twain"],
    [
      "You do not have to see the whole staircase, just take the first step.",
      "Martin Luther King Jr.",
    ],
    [
      "Great things are done by a series of small things brought together.",
      "Vincent van Gogh",
    ],
  ];
  function setQuote(q, a) {
    $("#quotePreview").textContent = `“${q}”`;
    $("#quotePreviewAuthor").textContent = `— ${a}`;
  }
  async function quote() {
    try {
      $("#quotePreview").textContent = "Finding a thought for your day…";
      let r = await fetch(
        "https://api.allorigins.win/raw?url=https%3A%2F%2Fzenquotes.io%2Fapi%2Frandom",
        { signal: AbortSignal.timeout(6500) },
      );
      if (!r.ok) throw Error();
      let x = (await r.json())[0];
      if (!x?.q) throw Error();
      setQuote(x.q, x.a || "Unknown");
    } catch {
      setQuote(...fallback[Math.floor(Math.random() * fallback.length)]);
    }
  }
  $("#homeQuote").addEventListener("click", quote);
  function sky(c) {
    if (c === 0) return ["☼", "Clear skies"];
    if ([1, 2, 3].includes(c)) return ["⛅", "Partly cloudy"];
    if ([45, 48].includes(c)) return ["〰", "Foggy"];
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(c))
      return ["☂", "Rain showers"];
    if ([71, 73, 75, 77, 85, 86].includes(c)) return ["❄", "Snow"];
    return ["⚡", "Stormy"];
  }
  function weather(d) {
    let [icon, condition] = sky(d.code);
    $("#weatherIcon").textContent = icon;
    $("#weatherTemp").textContent = `${Math.round(d.temp)}°`;
    $("#weatherPlace").textContent = d.place;
    $("#weatherCondition").textContent = condition;
    $("#weatherHumidity").textContent = `${d.humidity}%`;
    $("#weatherWind").textContent = `${Math.round(d.wind)} km/h`;
    $("#weatherFeelsLike").textContent = `${Math.round(d.feels)}°`;
  }
  async function getWeather(lat = 28.6139, lon = 77.209, place = "New Delhi") {
    try {
      let r = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`,
        { signal: AbortSignal.timeout(7000) },
      );
      if (!r.ok) throw Error();
      let c = (await r.json()).current;
      weather({
        temp: c.temperature_2m,
        humidity: c.relative_humidity_2m,
        feels: c.apparent_temperature,
        code: c.weather_code,
        wind: c.wind_speed_10m,
        place,
      });
    } catch {
      weather({
        temp: 31,
        humidity: 58,
        feels: 34,
        code: 1,
        wind: 12,
        place: place + " · estimated",
      });
    }
  }
  function locate() {
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(
          (p) =>
            getWeather(p.coords.latitude, p.coords.longitude, "Your location"),
          () => getWeather(),
          { timeout: 6000, maximumAge: 900000 },
        )
      : getWeather();
  }
  function tick() {
    let d = new Date(),
      h = d.getHours(),
      period =
        h >= 5 && h < 12
          ? "morning"
          : h < 17
            ? "afternoon"
            : h < 21
              ? "evening"
              : "night",
      days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      hh = h % 12 || 12;
    $("#clock").textContent =
      `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()} · ${String(hh).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
    document.body.dataset.time = period;
    if (planHour !== h) {
      planHour = h;
      renderPlanner();
    }
  }
  function theme() {
    let v = document.documentElement.dataset.theme;
    $("#themeLabel").textContent = v === "dark" ? "Night" : "Light";
    $("#themeMeta").content = v === "dark" ? "#071719" : "#eaf3ef";
  }
  $("#themeToggle").addEventListener("click", () => {
    let next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("still-theme", next);
    } catch {}
    theme();
  });
  renderTodos();
  renderGoals();
  renderPlanner();
  drawTimer();
  theme();
  tick();
  setInterval(tick, 1000);
  quote();
  locate();
})();

(() => {
  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const enterHome = () =>
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(".home-top", { y: -22, opacity: 0, duration: 0.72 })
      .from(".home-heading", { y: 28, opacity: 0, duration: 0.72 }, "-=.2")
      .from(
        ".home-panel",
        { y: 22, opacity: 0, stagger: 0.12, duration: 0.58 },
        "-=.32",
      )
      .from(".dock-wrap", { y: 34, opacity: 0, duration: 0.65 }, "-=.3");
  enterHome();
  document.querySelectorAll(".dock button, .back").forEach((button) => {
    button.addEventListener("pointerenter", () =>
      gsap.to(button, { y: -3, duration: 0.22, ease: "power2.out" }),
    );
    button.addEventListener("pointerleave", () =>
      gsap.to(button, { y: 0, duration: 0.28, ease: "power2.out" }),
    );
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-open], .back")) return;
    requestAnimationFrame(() => {
      const workspace = document.querySelector(".view.active .workspace");
      if (workspace)
        gsap.fromTo(
          workspace,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
      if (document.querySelector("#home.active"))
        gsap.fromTo(
          ".home-panel",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power3.out",
          },
        );
    });
  });
})();

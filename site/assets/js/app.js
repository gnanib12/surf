/* Surf & Turf Lodge — shared front-end behaviour
 * Ported 1:1 from the original design's DCLogic class (no framework).
 * Handles: live open/closed status, "today" highlight in the hours table,
 * and the mobile nav toggle. Pure vanilla JS, no build step.
 */
(function () {
  "use strict";

  // 0=Sun .. 6=Sat ; [openDecimalHour, closeDecimalHour] or null (closed)
  var SCHEDULE = { 0: [11, 15], 1: null, 2: null, 3: null, 4: [16, 20.5], 5: [15, 21], 6: [15, 21] };
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function fmt(h) {
    var hr = Math.floor(h);
    var min = Math.round((h - hr) * 60);
    var ap = hr >= 12 ? "pm" : "am";
    var h12 = hr % 12;
    if (h12 === 0) h12 = 12;
    return min ? h12 + ":" + String(min).padStart(2, "0") + ap : h12 + ap;
  }

  function status() {
    var now = new Date();
    var d = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var t = SCHEDULE[d];
    if (t && h >= t[0] && h < t[1]) {
      return { open: true, label: "Open now", detail: "Serving until " + fmt(t[1]) };
    }
    for (var k = 0; k <= 7; k++) {
      var di = (d + k) % 7;
      var s = SCHEDULE[di];
      if (s && (k > 0 || h < s[0])) {
        var when = k === 0 ? "today" : (k === 1 ? "tomorrow" : DAY_NAMES[di]);
        return { open: false, label: "Closed now", detail: "Opens " + when + " at " + fmt(s[0]) };
      }
    }
    return { open: false, label: "Closed", detail: "" };
  }

  function applyStatus() {
    var st = status();
    var dot = st.open ? "#5b8a3a" : "#c0563f";
    var bg = st.open ? "#dcebcb" : "#f3ddd2";
    var fg = st.open ? "#3c5e22" : "#8a2a20";
    each("[data-status-dot]", function (e) { e.style.background = dot; });
    each("[data-status-label]", function (e) { e.textContent = st.label; });
    each("[data-status-detail]", function (e) { e.textContent = st.detail; });
    each("[data-status-pill]", function (e) { e.style.background = bg; e.style.color = fg; });
  }

  // Bold + barn-red the row matching today's weekday (Mon–Wed share one row).
  function highlightHours() {
    var today = new Date().getDay();
    each("[data-hours-row]", function (row) {
      var day = parseInt(row.getAttribute("data-day"), 10);
      var closed = row.getAttribute("data-closed") === "1";
      var isToday = day === today || (day === -1 && (today === 1 || today === 2 || today === 3));
      var weight = isToday ? "700" : "500";
      var color = isToday ? "#a3352a" : (closed ? "#9c8a68" : "#2b1c12");
      each2(row.querySelectorAll("span"), function (s) {
        s.style.fontWeight = weight;
        s.style.color = color;
      });
    });
  }

  function initMobileNav() {
    var btn = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-mobile-menu]");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });
  }

  function each(sel, fn) { each2(document.querySelectorAll(sel), fn); }
  function each2(list, fn) { Array.prototype.forEach.call(list, fn); }

  function init() {
    applyStatus();
    highlightHours();
    initMobileNav();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();

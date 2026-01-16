const form = document.getElementById("contactForm");
const alertBox = document.getElementById("formAlert");
const alertText = document.getElementById("formAlertText");
const alertCloseBtn = alertBox.querySelector(".alert-close");

let alertTimer = null;

function hideAlert() {
  alertBox.style.display = "none";
  alertBox.className = "form-alert";
  alertText.textContent = "";
  clearTimeout(alertTimer);
}

function showAlert(message, type = "error", autoCloseMs = 5000) {
  clearTimeout(alertTimer);

  alertText.textContent = message;
  alertBox.className = `form-alert ${type}`;
  alertBox.style.display = "block";

  // Auto-close
  if (autoCloseMs > 0) {
    alertTimer = setTimeout(hideAlert, autoCloseMs);
  }
}

// Manual close
alertCloseBtn.addEventListener("click", hideAlert);

// ---- Anti-bruteforce settings ----
const MIN_TIME_ON_FORM_MS = 3000;   // must wait 3s before submitting
const COOLDOWN_MS = 20000;          // 20s cooldown between submissions

const formOpenedAt = Date.now();
let lastSubmitAt = 0;

// Basic email sanity check (not strict)
function looksLikeEmail(email) {
  if (!email) return false;
  if (/\s/.test(email)) return false;           // no spaces
  const at = email.indexOf("@");
  if (at <= 0) return false;                    // must have something before @
  if (email.indexOf("@", at + 1) !== -1) return false; // only one @
  const dotAfter = email.indexOf(".", at + 2);
  if (dotAfter === -1) return false;            // must have a dot after @
  if (dotAfter === email.length - 1) return false; // dot can't be last char
  return true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  alertBox.style.display = "none";

  const now = Date.now();

  // Time-on-form gate
  if (now - formOpenedAt < MIN_TIME_ON_FORM_MS) {
    showAlert("Please wait a moment before submitting.");
    return;
  }

  // Cooldown gate
  if (lastSubmitAt && (now - lastSubmitAt < COOLDOWN_MS)) {
    const secs = Math.ceil((COOLDOWN_MS - (now - lastSubmitAt)) / 1000);
    showAlert(`Please wait ${secs}s before submitting again.`);
    return;
  }

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const subject = form.elements["subject"].value.trim();
  const message = form.elements["message"].value.trim();

  // Length checks
  if (subject.length > 100) {
    showAlert("Subject must be 100 characters or less.");
    return;
  }
  if (message.length > 250) {
    showAlert("Message must be 250 characters or less.");
    return;
  }

  // Email sanity check (relaxed)
  if (!looksLikeEmail(email)) {
    showAlert("Please enter a valid email (example: name@example.com).");
    return;
  }

  // Optional: super basic “not empty after trim”
  if (!name || !subject || !message) {
    showAlert("Please fill in all fields.");
    return;
  }

  // Submit to Netlify (stay on page)
  try {
    lastSubmitAt = now; // set before fetch to stop spam clicks
    
    const formData = new FormData(form);

    // extra safety: ensure Netlify sees the form name even with JS submit
    formData.set("form-name", form.getAttribute("name"));

    const resp = await fetch(form.getAttribute("action") || "/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    });

    if (!resp.ok) throw new Error("Netlify rejected submission");

    showAlert("Form submitted successfully. Thank you!", "success");
    form.reset();

  } catch (err) {
    // allow retry sooner if it failed
    lastSubmitAt = 0;
    showAlert("Submission failed. Please try again.");
  }
});
const form = document.querySelector("#signupForm");
const statusEl = document.querySelector("#formStatus");
const endpointInput = document.querySelector("#endpoint");
const endpointKey = "workshopAppsScriptUrl";
const defaultEndpoint =
  "https://script.google.com/macros/s/AKfycbzHcuFywi_CHAltvOzupSDXtnP1DfGeo4BzyIFRNuWLEra26AazXmsMp77vtlwYQ6zj9A/exec";

endpointInput.value = localStorage.getItem(endpointKey) || defaultEndpoint;

function setStatus(message, tone = "info") {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

function getPayload(formData) {
  return {
    timestamp: new Date().toISOString(),
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    phone: formData.get("phone").trim(),
    organization: formData.get("organization").trim(),
    title: formData.get("title").trim(),
  };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const endpoint = formData.get("endpoint").trim();

  if (!endpoint) {
    setStatus("請先填入 Apps Script Web App URL。", "error");
    endpointInput.focus();
    return;
  }

  localStorage.setItem(endpointKey, endpoint);
  setStatus("送出中...");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(getPayload(formData)),
    });

    const result = await response.json();

    if (!response.ok || result.status !== "ok") {
      throw new Error(result.message || "送出失敗");
    }

    form.reset();
    endpointInput.value = endpoint;
    setStatus("報名成功，已寫入活動 Google Sheet。");
  } catch (error) {
    setStatus(`送出失敗：${error.message}`, "error");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // set embedded state
  const appID = "pdf";
  let embedded = false;

  // post initial window size until embedded
  const interval = setInterval(() => {
    window.parent.postMessage({ [appID]: { loaded: true } }, "*");
    if (embedded) clearInterval(interval);
  }, 100);

  // listen message from parent window
  window.addEventListener("message", (event) => {
    // check source and data, and embedded state
    if (event.source === window || !event.data[appID] || embedded) return;

    // add embed class
    document.getElementById("page-container").classList.add("embed");
    embedded = true;
  });
});

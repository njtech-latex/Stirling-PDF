document.addEventListener("DOMContentLoaded", () => {
  // set loaded state
  let loaded = false;

  // post message to parent window
  const postmessage = (message) => window.parent.postMessage({ pdf: message }, "*");

  // listen window width and height
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      postmessage({ width, height });

      // keep sending message until loaded
      if (!loaded) {
        const interval = setInterval(() => {
          postmessage({ width, height });
          if (loaded) clearInterval(interval);
        }, 100);
      }
    }
  });

  // observe body element
  resizeObserver.observe(document.body);

  // listen message from parent window
  window.addEventListener("message", (event) => {
    // check source and data, and loaded state
    if (event.source === window || !event.data.pdf || loaded) return;
    // add embed class
    if (event.data.pdf.loaded) {
      document.getElementById("page-container").classList.add("embed");
      loaded = true;
    }
  });
});

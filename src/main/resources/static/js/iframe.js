document.addEventListener("DOMContentLoaded", () => {
  let loaded = false;

  // post message to parent window
  const postmessage = (message) => window.parent.postMessage({ stirlingPDF: message }, "*");

  // listen window width and height
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      postmessage({ width, height });

      if (!loaded) {
        setTimeout(() => {
          postmessage({ width, height });
          loaded = true;
        }, 1000);
      }
    }
  });

  // observe body element
  resizeObserver.observe(document.body);
});

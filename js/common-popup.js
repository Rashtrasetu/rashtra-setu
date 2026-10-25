
/* =========================================
   Rashtra Setu - Common Popup Controller
========================================= */

(function () {
  "use strict";

  const POPUP_HTML = "/components/common-popup.html";
  const POPUP_CSS = "/css/common-popup.css";
  const DATA_SCRIPT = "/js/common-data.js";

  let popupReady = false;
  let popupLoading = null;
  let lastFocusedElement = null;

  function loadStylesheet() {
    if (document.querySelector('link[data-common-popup-css]')) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = POPUP_CSS;
    link.dataset.commonPopupCss = "true";
    document.head.appendChild(link);
  }

  function loadDataScript() {
    if (window.RashtraSetuPopupData) {
      return Promise.resolve();
    }

    if (document.querySelector('script[data-common-popup-data]')) {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(
          'script[data-common-popup-data]'
        );

        if (window.RashtraSetuPopupData) {
          resolve();
        } else {
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener(
            "error",
            () => reject(new Error("Popup data load failed.")),
            { once: true }
          );
        }
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = DATA_SCRIPT;
      script.dataset.commonPopupData = "true";

      script.onload = resolve;
      script.onerror = () => reject(
        new Error("Popup data load failed: " + DATA_SCRIPT)
      );

      document.head.appendChild(script);
    });
  }

  async function initializePopup() {
    if (popupReady) return;
    if (popupLoading) return popupLoading;

    popupLoading = (async function () {
      loadStylesheet();

      const response = await fetch(POPUP_HTML);

      if (!response.ok) {
        throw new Error(
          "Popup HTML load failed: " + response.status
        );
      }

      const html = await response.text();

      const temporaryContainer = document.createElement("div");
      temporaryContainer.innerHTML = html;

      const overlay = temporaryContainer.querySelector(
        "#commonPopupOverlay"
      );

      if (!overlay) {
        throw new Error("Common popup HTML structure is missing.");
      }

      document.body.appendChild(overlay);

      await loadDataScript();

      const closeButton = document.getElementById("commonPopupClose");

      if (!closeButton) {
        throw new Error("Popup close button is missing.");
      }

      closeButton.addEventListener("click", closePopup);

      overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
          closePopup();
        }
      });

      popupReady = true;
    })();

    try {
      await popupLoading;
    } catch (error) {
      popupLoading = null;
      console.error("Rashtra Setu Common Popup:", error);
      throw error;
    }
  }

  function openPopup(topic, trigger) {
    const overlay = document.getElementById("commonPopupOverlay");
    const title = document.getElementById("commonPopupTitle");
    const content = document.getElementById("commonPopupContent");

    if (!overlay || !title || !content) {
      console.error("Common popup elements are missing.");
      return;
    }

    const data = window.RashtraSetuPopupData || {};
    const normalizedTopic = String(topic || "").trim().toLowerCase();

    const matchedKey = Object.keys(data).find(function (key) {
      return key.trim().toLowerCase() === normalizedTopic;
    });

    const item = matchedKey ? data[matchedKey] : null;

    title.textContent = item ? item.title : (topic || "विषय की जानकारी");

    content.textContent = item
      ? item.content
      : "इस विषय की विस्तृत जानकारी अभी उपलब्ध नहीं है। कृपया संबंधित सरकारी विभाग की आधिकारिक वेबसाइट पर नियमों और पात्रता की पुष्टि करें।";

    lastFocusedElement = trigger || document.activeElement;

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("common-popup-active");

    const closeButton = document.getElementById("commonPopupClose");
    if (closeButton) closeButton.focus();
  }

  function closePopup() {
    const overlay = document.getElementById("commonPopupOverlay");

    if (!overlay) return;

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("common-popup-active");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  document.addEventListener("click", async function (event) {
    const trigger = event.target.closest("[data-popup-topic]");

    if (!trigger) return;

    event.preventDefault();

    const topic = trigger.getAttribute("data-popup-topic");

    try {
      await initializePopup();
      openPopup(topic, trigger);
    } catch (error) {
      console.error("Popup could not be opened:", error);
    }
  });

  document.addEventListener("keydown", function (event) {
    const overlay = document.getElementById("commonPopupOverlay");

    if (
      event.key === "Escape" &&
      overlay &&
      overlay.classList.contains("is-open")
    ) {
      closePopup();
    }
  });

  // दूसरे scripts से जरूरत पड़ने पर initialize करने के लिए
  window.RashtraSetuCommonPopup = {
    initialize: initializePopup,
    open: async function (topic) {
      await initializePopup();
      openPopup(topic, null);
    },
    close: closePopup
  };
})();


document.addEventListener("DOMContentLoaded", async function () {
    async function loadComponent(selector, file) {
        const container = document.querySelector(selector);

        if (!container) {
            return;
        }

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(
                    `Component load failed: ${file} (${response.status})`
                );
            }

            container.innerHTML = await response.text();
        } catch (error) {
            console.error(error);
        }
    }

    // मौजूदा Header और Footer लोड करने का सिस्टम
    await Promise.all([
        loadComponent("#site-header", "/components/header.html"),
        loadComponent("#site-footer", "/components/footer.html")
    ]);

    // Common Popup Controller लोड करें
    function loadCommonPopupScript() {
        if (document.querySelector('script[data-rashtra-common-popup]')) {
            return;
        }

        const script = document.createElement("script");
        script.src = "/js/common-popup.js";
        script.dataset.rashtraCommonPopup = "true";

        script.onerror = function () {
            console.error(
                "Rashtra Setu: Common Popup script load नहीं हो पाया।"
            );
        };

        document.body.appendChild(script);
    }

    loadCommonPopupScript();
});

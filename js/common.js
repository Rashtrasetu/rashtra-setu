
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

    await Promise.all([
        loadComponent("#site-header", "/components/header.html"),
        loadComponent("#site-footer", "/components/footer.html")
    ]);
});


(() => {
    "use strict";

    const pages = [
        {
            title: "प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)",
            url: "/pm-kisan.html",
            description: "किसानों को मिलने वाली आर्थिक सहायता, पात्रता और योजना की जानकारी।",
            keywords: "किसान किसान सम्मान निधि pm kisan pmkisan pmksn farmer kisan nidhi"
        },
        {
            title: "किसान सम्मान निधि योजना क्या है?",
            url: "/pm-ks-yo-kya-hai.html",
            description: "PM-KISAN योजना का परिचय और जरूरी जानकारी।",
            keywords: "pm kisan kya hai किसान योजना जानकारी"
        },
        {
            title: "प्रधानमंत्री आवास योजना शहरी (PMAY-U 2.0)",
            url: "/pm-awas-yojana-urban.html",
            description: "शहरी परिवारों के लिए आवास योजना, पात्रता और आवेदन की जानकारी।",
            keywords: "pm awas awas yojana pmay housing ghar मकान आवास घर"
        },
        {
            title: "प्रधानमंत्री आवास योजना क्या है?",
            url: "/pm-awas-urban-kya-hai.html",
            description: "प्रधानमंत्री आवास योजना की सामान्य जानकारी।",
            keywords: "pmay kya hai आवास योजना जानकारी"
        },
        {
            title: "आयुष्मान भारत योजना (PM-JAY)",
            url: "/ayushman-yojana.html",
            description: "आयुष्मान भारत स्वास्थ्य योजना और इससे जुड़ी जानकारी।",
            keywords: "ayushman ayushman bharat pmjay pm jay health health card स्वास्थ्य इलाज अस्पताल"
        },
        {
            title: "आयुष्मान भारत योजना क्या है?",
            url: "/ayush-yjn-kya-hai.html",
            description: "आयुष्मान भारत योजना का परिचय।",
            keywords: "ayushman kya hai आयुष्मान जानकारी"
        },
        {
            title: "दिल्ली लक्ष्मी योजना 2026",
            url: "/delhi-lakshmi-yojana.html",
            description: "दिल्ली लक्ष्मी योजना की पात्रता, सहायता और आवेदन संबंधी जानकारी।",
            keywords: "delhi lakshmi yojana लक्ष्मी योजना दिल्ली"
        },
        {
            title: "दिल्ली लखपति बिटिया योजना 2026",
            url: "/delhi-lakhpati-bitiya-yojana.html",
            description: "लखपति बिटिया योजना और दिल्ली लाडली योजना की जानकारी।",
            keywords: "lakhpati bitiya ladli बेटी बिटिया लाडली योजना दिल्ली"
        },
        {
            title: "दिल्ली अटल कैंटीन योजना 2026",
            url: "/delhi-atal-canteen-yojana.html",
            description: "दिल्ली में ₹5 में भोजन उपलब्ध कराने वाली योजना की जानकारी।",
            keywords: "atal canteen अटल कैंटीन भोजन खाना पांच रुपये 5 rupees food"
        },
        {
            title: "दिल्ली वृद्धावस्था पेंशन योजना 2026",
            url: "/delhi-vridhavastha-pension-yojana.html",
            description: "बुजुर्गों की पेंशन, पात्रता और आवेदन की जानकारी।",
            keywords: "vridhavastha old age senior citizen वृद्धावस्था बुजुर्ग बुढ़ापा पेंशन pension"
        },
        {
            title: "दिल्ली दिव्यांग पेंशन योजना 2026",
            url: "/delhi-divyang-pension-yojana.html",
            description: "दिव्यांग पेंशन की पात्रता और आवेदन संबंधी जानकारी।",
            keywords: "divyang viklang disability disabled दिव्यांग विकलांग निशक्त पेंशन pension"
        },
        {
            title: "दिल्ली विधवा पेंशन योजना 2026",
            url: "/delhi-vidhwa-pension-yojana.html",
            description: "विधवा पेंशन योजना की पात्रता और आवेदन की जानकारी।",
            keywords: "vidhwa widow widow pension विधवा पेंशन महिला"
        },
        {
            title: "दिल्ली की सभी सरकारी योजनाएँ",
            url: "/delhi-yojnaye.html",
            description: "दिल्ली सरकार की प्रमुख योजनाओं की सूची।",
            keywords: "delhi schemes दिल्ली योजना सभी योजनाएं"
        },
        {
            title: "सभी सरकारी योजनाएँ",
            url: "/sabhi-yojnaye.html",
            description: "विभिन्न सरकारी योजनाओं की जानकारी एक जगह।",
            keywords: "all schemes सभी योजना सरकारी योजना"
        },
        {
            title: "सरकारी योजनाएँ",
            url: "/sarkari-yojnaye.html",
            description: "सरकारी योजनाओं की जानकारी और सूची।",
            keywords: "sarkari yojana government schemes सरकारी योजना"
        },
        {
            title: "आधार कार्ड सेवाएँ",
            url: "/aadhaar-seva.html",
            description: "आधार कार्ड से जुड़ी डिजिटल सेवाओं की जानकारी।",
            keywords: "aadhaar aadhar uidai आधार कार्ड"
        },
        {
            title: "PAN Card सेवाएँ",
            url: "/pan-card-seva.html",
            description: "पैन कार्ड से जुड़ी सेवाओं की जानकारी।",
            keywords: "pan pancard पैन कार्ड"
        },
        {
            title: "राशन कार्ड सेवाएँ",
            url: "/ration-card-seva.html",
            description: "राशन कार्ड से जुड़ी जानकारी और सेवाएँ।",
            keywords: "ration card राशन कार्ड खाद्य"
        },
        {
            title: "सरकारी डिजिटल सेवाएँ",
            url: "/digital-seva.html",
            description: "ऑनलाइन सरकारी सेवाओं और डिजिटल सुविधाओं की जानकारी।",
            keywords: "digital seva online service डिजिटल सेवा ऑनलाइन सरकारी सेवा"
        }
    ];

    const form = document.getElementById("home-search-form");
    const input = document.getElementById("search");
    const suggestions = document.getElementById("search-suggestions");
    const results = document.getElementById("search-results");
    const submitButton = form?.querySelector('button[type="submit"]');

    if (!form || !input || !suggestions || !results) return;

    let currentMatches = [];
    let selectedIndex = -1;

    function normalize(value) {
        return value
            .toLocaleLowerCase("hi")
            .trim()
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ");
    }

    function findMatches(query) {
        const words = normalize(query).split(" ").filter(Boolean);

        if (!words.length) return [];

        return pages
            .map((page) => {
                const title = normalize(page.title);
                const description = normalize(page.description);
                const keywords = normalize(page.keywords);

                let score = 0;

                for (const word of words) {
                    if (title.includes(word)) score += 5;
                    else if (keywords.includes(word)) score += 4;
                    else if (description.includes(word)) score += 2;
                    else return null;
                }

                return { ...page, score };
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score);
    }

    function hideSuggestions() {
        suggestions.replaceChildren();
        suggestions.hidden = true;
        input.setAttribute("aria-expanded", "false");
        selectedIndex = -1;
    }

    function updateSelectedSuggestion() {
        const items = suggestions.querySelectorAll(".search-suggestion-item");

        items.forEach((item, index) => {
            const isSelected = index === selectedIndex;

            item.classList.toggle("is-selected", isSelected);
            item.setAttribute("aria-selected", String(isSelected));

            if (isSelected) {
                input.setAttribute("aria-activedescendant", item.id);
                item.scrollIntoView({ block: "nearest" });
            }
        });

        if (selectedIndex === -1) {
            input.removeAttribute("aria-activedescendant");
        }
    }

    function showSuggestions(query) {
        hideSuggestions();

        currentMatches = findMatches(query).slice(0, 5);

        if (!currentMatches.length) return;

        currentMatches.forEach((page, index) => {
            const item = document.createElement("div");
            item.className = "search-suggestion-item";
            item.id = `search-option-${index}`;
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", "false");

            const title = document.createElement("span");
            title.className = "search-suggestion-title";
            title.textContent = page.title;

            const description = document.createElement("span");
            description.className = "search-suggestion-description";
            description.textContent = page.description;

            item.append(title, description);

          item.addEventListener("mousedown", (event) => {
    event.preventDefault();

    selectedIndex = index;
    input.value = page.title;

    suggestions.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
});

            suggestions.appendChild(item);
        });

        suggestions.hidden = false;
        input.setAttribute("aria-expanded", "true");
    }

    function showResults(matches, query) {
        results.replaceChildren();
        results.hidden = false;

        const heading = document.createElement("h2");
        heading.textContent = `खोज परिणाम (${matches.length})`;
        results.appendChild(heading);

        if (!matches.length) {
            const message = document.createElement("p");
            message.className = "search-no-results";
            message.textContent = `“${query}” के लिए कोई परिणाम नहीं मिला। दूसरा शब्द आज़माएँ।`;
            results.appendChild(message);
            return;
        }

        matches.forEach((page) => {
            const link = document.createElement("a");
            link.className = "search-result-item";
            link.href = page.url;

            const title = document.createElement("h3");
            title.textContent = page.title;

            const description = document.createElement("p");
            description.textContent = page.description;

            link.append(title, description);
            results.appendChild(link);
        });
    }

    input.addEventListener("input", () => {
        results.hidden = true;
        results.replaceChildren();
        showSuggestions(input.value);
    });

    input.addEventListener("keydown", (event) => {
        if (suggestions.hidden || !currentMatches.length) {
            if (event.key === "Enter") {
                event.preventDefault();
                form.requestSubmit();
            }
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            selectedIndex = (selectedIndex + 1) % currentMatches.length;
            updateSelectedSuggestion();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            selectedIndex = selectedIndex <= 0
                ? currentMatches.length - 1
                : selectedIndex - 1;
            updateSelectedSuggestion();
        }

        if (event.key === "Enter") {
    event.preventDefault();

    if (selectedIndex >= 0) {
        input.value = currentMatches[selectedIndex].title;

        suggestions.hidden = true;
        input.setAttribute("aria-expanded", "false");
        input.removeAttribute("aria-activedescendant");
    } else {
        form.requestSubmit();
    }
}

        if (event.key === "Escape") {
            hideSuggestions();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = input.value.trim();

        if (!query) {
            hideSuggestions();
            results.replaceChildren();

            const message = document.createElement("p");
            message.className = "search-no-results";
            message.textContent = "कृपया खोजने के लिए कोई शब्द लिखें।";

            results.appendChild(message);
            results.hidden = false;
            input.focus();
            return;
        }

        const matches = findMatches(query);

        // चुना हुआ सुझाव होने पर Search बटन से वही पेज खोलें।
        if (selectedIndex >= 0 && currentMatches[selectedIndex]) {
            window.location.href = currentMatches[selectedIndex].url;
            return;
        }

        // सुझाव चुने बिना Search करने पर सभी परिणाम दिखाएँ।
        hideSuggestions();
        showResults(matches, query);
    });

    if (submitButton) {
        submitButton.addEventListener("click", () => {
            // Submit form handler संभालेगा।
        });
    }

    document.addEventListener("click", (event) => {
        if (!form.contains(event.target)) {
            hideSuggestions();
        }
    });
})();

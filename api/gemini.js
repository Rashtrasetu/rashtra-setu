
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "केवल POST अनुरोध स्वीकार है।"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API Key सर्वर पर सेट नहीं है।"
    });
  }

  try {
    const { topic } = req.body || {};

    if (
      typeof topic !== "string" ||
      !topic.trim() ||
      topic.length > 200
    ) {
      return res.status(400).json({
        error: "कृपया सही विषय का नाम भेजें।"
      });
    }

const prompt = `
आप Rashtra Setu वेबसाइट के हिंदी सूचना सहायक हैं।

उपयोगकर्ता ने इस विषय पर क्लिक किया है: "${topic.trim()}"

निर्देश:
1. सीधे "${topic.trim()}" के सवाल का जवाब दें।
2. कोई स्वागत संदेश, अभिवादन या भूमिका न लिखें।
3. सरल, स्पष्ट और स्वाभाविक हिंदी में जवाब दें।
4. जवाब केवल इसी विषय तक सीमित रखें।
5. छोटे शीर्षक और छोटे पैराग्राफ इस्तेमाल करें।
6. Markdown के ** या अन्य formatting symbols न लिखें।
7. सरकारी नियम, पात्रता, फीस, तारीख या लिंक की अपुष्ट जानकारी न गढ़ें।
8. जहाँ जरूरी हो, जानकारी की पुष्टि संबंधित आधिकारिक सरकारी वेबसाइट से करने को कहें।
9. जवाब संक्षिप्त रखें, लगभग 150–250 शब्दों में।
10. केवल उपयोगकर्ता के विषय का जवाब दें; अतिरिक्त सवालों की सूची न बनाएँ।
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Gemini API error:",
        response.status,
        data.error?.message || "Unknown error"
      );

      return res.status(502).json({
        error: "Gemini से जानकारी नहीं मिल सकी। कृपया बाद में प्रयास करें।"
      });
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      return res.status(502).json({
        error: "Gemini ने कोई जानकारी नहीं लौटाई। कृपया दोबारा प्रयास करें।"
      });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Rashtra Setu Gemini endpoint failed:", error.message);

    return res.status(500).json({
      error: "जानकारी प्राप्त करते समय समस्या हुई। कृपया बाद में प्रयास करें।"
    });
  }
};

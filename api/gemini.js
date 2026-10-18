
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

विषय: ${topic.trim()}

सरल और स्पष्ट हिंदी में जानकारी दें:
1. विषय क्या है?
2. इसका उद्देश्य और उपयोग क्या है?
3. पात्रता या जरूरी दस्तावेज, यदि लागू हों।
4. आवेदन या जानकारी के आधिकारिक स्रोत, यदि ज्ञात हों।

केवल विश्वसनीय होने का दावा न करें।
यदि कोई जानकारी निश्चित नहीं है, तो स्पष्ट बताएं।
सरकारी नियम, तारीख, लिंक या पात्रता गढ़कर न बताएं।
उत्तर को छोटे शीर्षकों और सरल पैराग्राफ में लिखें।
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
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

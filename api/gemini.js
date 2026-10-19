
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

उपयोगकर्ता ने वेबसाइट पर जिस खास शब्द या विषय पर क्लिक किया है,
उसका नाम है: "${topic.trim()}"

आपका मुख्य काम केवल इसी क्लिक किए गए शब्द या विषय से संबंधित
स्पष्ट और उपयोगी जानकारी देना है।

नियम:
1. सबसे पहले बताएं कि यह विषय क्या है।
2. इसका उद्देश्य, काम और उपयोग समझाएं।
3. इससे संबंधित प्रक्रिया, प्रकार, पात्रता या दस्तावेजों की
   जानकारी केवल तभी दें, जब वे इस विषय से संबंधित हों।
4. उदाहरण देकर सरल हिंदी में समझाएं, जहां उपयोगी हो।
5. दूसरे असंबंधित विषयों पर सामान्य जानकारी न दें।
6. सरकारी नियम, फीस, तारीख, पात्रता या लिंक न गढ़ें।
7. जिस जानकारी की पुष्टि न हो सके, उसे स्पष्ट बताएं।
8. उत्तर छोटे शीर्षकों और आसान पैराग्राफ में दें।
9. उत्तर उसी विषय पर केंद्रित रखें जिस पर उपयोगकर्ता ने क्लिक किया है।
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

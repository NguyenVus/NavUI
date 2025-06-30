type Part =
    | { text: string }
    | {
    inlineData: {
        mimeType: string;
        data: string;
    };
};

export const callGeminiApi = async (prompt: string, imageBase64?: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const parts: Part[] = [{ text: prompt }];

    if (imageBase64) {
        parts.push({
            inlineData: {
                mimeType: "image/png",
                data: imageBase64,
            },
        });
    }

    const body = {
        contents: [
            {
                parts,
            },
        ],
    };

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json();
        console.error("Gemini API error:", err);
        throw new Error(err.error?.message || "Lỗi gọi Gemini API");
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Không có phản hồi.";
};

import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const response = await fetch("https://kenjichou-lao-tts-api.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [text] }),
    });

    const data = await response.json();
    console.log("HF Response:", data);

    if (!data?.data || !data.data[0]) {
      return res.status(500).json({ error: "HF API 回傳錯誤", raw: data });
    }

    // 回傳完整檔案 URL
    const audioUrl = `https://kenjichou-lao-tts-api.hf.space/file=${data.data[0].name}`;
    res.json({ url: audioUrl });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));

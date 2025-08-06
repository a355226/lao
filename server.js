import express from "express";
import { connect } from "@gradio/client";  // ✅ 正確匯入

const app = express();
app.use(express.json());

app.post("/tts", async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const client = await connect("kenjichou/lao-tts-api");  // ✅ 改用 connect
    const result = await client.predict("/predict", { text });

    let audioUrl = "";
    if (Array.isArray(result.data) && result.data.length > 0) {
      audioUrl = result.data[0].url || result.data[0];
    }

    if (!audioUrl) {
      return res.status(500).json({ error: "No audio URL returned" });
    }

    res.json({ url: audioUrl });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

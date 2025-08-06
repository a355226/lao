import express from "express";
import gradio from "@gradio/client";

const app = express();
app.use(express.json());

app.post("/tts", async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const client = await gradio.connect("kenjichou/lao-tts-api");
    const result = await client.predict("/predict", { text });
    const audioUrl = result.data[0].url || result.data[0];

    res.json({ url: audioUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import { Client } from "@gradio/client";

const app = express();
app.use(cors());
app.use(express.json()); // ✅ 這行是關鍵，解析 JSON body

app.post("/tts", async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    // 連接 Hugging Face Space
    const client = await Client.connect("kenjichou/lao-tts-api");
    const result = await client.predict("/predict", { text });

    return res.json({ url: result.data[0].url || result.data[0].name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import { Client } from "@gradio/client";

const app = express();
app.use(cors());
app.use(express.json()); // ✅ 解析 JSON

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    // ✅ 符合 Hugging Face API 規範
    const client = await Client.connect("kenjichou/lao-tts-api");
    const result = await client.predict("/predict", { text });

    // result.data[0] 可能是 { url, name }
    return res.json({ url: result.data[0].url || result.data[0].name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

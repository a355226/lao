import express from "express";
import bodyParser from "body-parser";
import { Client } from "@gradio/client";

const app = express();
app.use(bodyParser.json());

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const client = await Client.connect("kenjichou/lao-tts-api");
    const result = await client.predict("/predict", { text });

    return res.json({
      url: result.data[0].url || result.data[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

# Lao TTS Proxy

這是一個 Flask API，用於代理 Hugging Face Space (kenjichou/lao-tts-api)，
讓 Google Apps Script 可以穩定呼叫並獲取寮文語音 URL。

## 部署

1. 將此專案上傳至 GitHub
2. 在 Render 建立新的 Web Service
3. 選擇 Python
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `python server.py`
6. 部署完成後即可使用 `https://你的render網址/tts`

## API 用法

POST `/tts`
```json
{
  "text": "ສະບາຍດີ"
}

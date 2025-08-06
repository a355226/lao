from flask import Flask, request, jsonify
from gradio_client import Client

app = Flask(__name__)

# 連接 Hugging Face Space
client = Client("kenjichou/lao-tts-api")

@app.route("/")
def home():
    return "✅ Lao TTS Proxy is running"

@app.route("/tts", methods=["POST"])
def tts():
    try:
        data = request.get_json()
        text = data.get("text")
        if not text:
            return jsonify({"error": "Missing text"}), 400
        
        print(f"🔹 Received text: {text}")
        
        # 呼叫 Hugging Face Space API
        result = client.predict(text=text, api_name="/predict")
        print(f"🎵 Hugging Face 返回結果: {result}")

        return jsonify({"url": result})
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

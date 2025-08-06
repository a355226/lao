from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])  # 直接部署在根路徑
def tts():
    try:
        # ✅ 從 JSON 讀取 text
        data = request.get_json()
        text = data.get('text') if data else None
        
        if not text:
            return jsonify({"error": "Missing text"}), 400
        
        # TODO: 這裡放你的 TTS 生成程式碼
        # 假設生成後存到 Render 靜態檔案，回傳 URL
        audio_url = f"https://lao-l7vt.onrender.com/static/output_{text}.mp3"
        
        return jsonify({"url": audio_url})  # ✅ 一定要回傳 JSON
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/', methods=['GET'])
def health_check():
    return "✅ TTS API is running"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify, send_from_directory
import torch
from transformers import VitsModel, AutoTokenizer
import soundfile as sf
import os
import uuid

app = Flask(__name__)

# 載入模型一次即可
model = VitsModel.from_pretrained("facebook/mms-tts-lao")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-lao")

@app.route("/tts", methods=["POST"])
def tts():
    try:
        data = request.get_json()
        text = data.get("text") if data else None
        if not text:
            return jsonify({"error": "Missing text"}), 400

        inputs = tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            audio = model(**inputs).waveform

        filename = f"{uuid.uuid4().hex}.wav"
        output_path = os.path.join("static", filename)
        sf.write(output_path, audio.numpy()[0], model.config.sampling_rate)

        full_url = request.host_url + "static/" + filename
        return jsonify({ "url": full_url })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@app.route("/")
def hello():
    return "✅ Lao TTS API is running"

# 如果你要支援直接撥放音訊檔案
@app.route('/static/<path:filename>')
def serve_audio(filename):
    return send_from_directory('static', filename)

if __name__ == "__main__":
    os.makedirs("static", exist_ok=True)
    app.run(host="0.0.0.0", port=5000)

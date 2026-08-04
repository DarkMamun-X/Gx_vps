import os
import time
from threading import Thread
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# --- Keep Alive Server (২৪/৭ ঘন্টা সচল রাখতে) ---
@app.route('/')
def home():
    # ইন্টারফেস রেন্ডার করবে
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return "<h1 style='color:#00ff00; background:#050505; padding:20px; font-family:monospace;'>[+] GX Hosting Control Dashboard Ready!</h1>"

# AJAX API endpoint for real-time status
@app.route('/api/status')
def api_status():
    return jsonify({
        "status": "ONLINE (24/7)",
        "active_bots": 1,
        "server_time": time.strftime("%H:%M:%S")
    })

def run_flask():
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)

def keep_alive():
    t = Thread(target=run_flask)
    t.daemon = True
    t.start()
    print(">>> Flask Web Server Started Successfully! <<<")

# --- মূল রানার ---
if __name__ == '__main__':
    keep_alive()
    
    # আপনার টেলিগ্রাম বট বা অন্যান্য স্ক্রিপ্ট থাকলে এখানে রান হতে পারে
    print(">>> Hosting Bot Server Active... <<<")
    
    # সার্ভার থামতে না দেওয়ার জন্য ইনফিনিট লুপ
    while True:
        time.sleep(1000)

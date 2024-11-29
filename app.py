from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Permite solicitudes de cualquier origen

# Base de datos simulada (puedes usar una base real más adelante)
data = {}

@app.route('/')
def home():
    return render_template('index.html')
 
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Usa el puerto asignado por Render
    app.run(host="0.0.0.0", port=port)



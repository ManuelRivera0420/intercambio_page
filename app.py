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
    
# Ruta para obtener los deseos
@app.route('/wishes', methods=['GET'])
def get_wishes():
    return jsonify(data)

# Ruta para agregar un deseo
@app.route('/wishes', methods=['POST'])
def add_wish():
    request_data = request.get_json()
    member = request_data.get('member')
    wish = request_data.get('wish')

    if not member or not wish:
        return jsonify({'error': 'Faltan datos'}), 400

    if member not in data:
        data[member] = []

    data[member].append(wish)
    return jsonify({'message': 'Deseo agregado correctamente'})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Usa el puerto asignado por Render
    app.run(host="0.0.0.0", port=port)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Usa el puerto asignado por Render
    app.run(host="0.0.0.0", port=port)

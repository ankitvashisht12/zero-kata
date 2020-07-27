from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
import os
import json


app = Flask(__name__)
socketio = SocketIO(app)
# socketio.init_app(app, cors_allowed_origins="*")
        
        
@app.route("/") 
def index():
    return render_template("index.html")


@socketio.on('json')
def handleJson(jsonData):
    emit('json', jsonData, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)

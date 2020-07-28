from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
import os
import json



app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True)
socketio.init_app(app, cors_allowed_origins="*")

        
@app.route("/") 
def index():
    return render_template("index.html")


@socketio.on('json')
def handleJson(jsonData):
    print("Json data received at server end : ", type(jsonData))
    emit('json', jsonData, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, debug=True)

#web: gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 app:app
#web:gunicorn --worker-class eventlet -w 1 app:app
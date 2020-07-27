from app import app, socketio
import os
from flask import render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
import json


# count = 0
# a = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
# numSquares = 9
# winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
# gameOver = False
# winCells = []

# def isWon():
#     for i in range(len(winConditions)):
#         cond = winConditions[i]
#         if(a[cond[0]] != -1 and a[cond[1]] != -1 and a[cond[2]] != -1):
#             if(a[cond[0]] == a[cond[1]] and a[cond[1]] == a[cond[2]]):
#                 winCells = cond
#                 return True
#     return False

        
        
@app.route("/", methods=["POST", "GET"]) 
def index():
    return render_template("index.html")


# @app.route("/data", methods=["POST", "GET"])
# def data():
#     if request.method=="POST":
#         data = request.get_json()
#         return {'idx': data['idx'], 'pid': data['pid']}
#     else:
#         print("NO data to take away :/")

@socketio.on('json')
def handleJson(jsonData):
    emit('json', jsonData, broadcast=True)

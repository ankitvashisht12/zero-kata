from app import app
import os
from flask import render_template, request, redirect, url_for

@app.route("/", methods=["POST", "GET"]) 
def index():
    return render_template("index.html")


@app.route("/data", methods=["POST", "GET"])
def data():
    if request.method=="POST":
        print(request.get_json())
        return 'OK', 200
    else:
        print("NO data to take away :/")

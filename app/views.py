from app import app
import os
from flask import render_template, request, redirect, url_for

@app.route("/", methods=["POST", "GET"]) 
def index():
    return render_template("index.html")


import os
from flask import Flask, render_template, request, redirect, url_for
from readFile import read, add_task 

app = Flask(__name__)


@app.route('/')
def index():
    # Read the data from the CSV file and pass it to the template
    tasks = read('FinancialTemplate.csv')
    return render_template('index.html', tasks=tasks)

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)
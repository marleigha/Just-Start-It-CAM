import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from readFile import read, add_task 

app = Flask(__name__)


@app.route('/')
def index():
    # Read the data from the CSV file and pass it to the template
    tasks = read('FinancialTemplate.csv')
    return render_template('index.html', tasks=tasks)

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    df = read('FinancialTemplate.csv') 
    print(df)
    return jsonify(df)

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000)
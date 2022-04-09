from flask import Flask, jsonify
from flask_cors import CORS

from helpers import *

app = Flask(__name__)
cors = CORS(app)


@app.route("/typle", methods=['GET', 'POST'])
def wordle():
    text = open_test()
    return jsonify({'text': text})


if __name__ == '__main__':
    app.run(debug=True)
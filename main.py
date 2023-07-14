from flask import Flask
app = Flask('app')

@app.route('/')
def hello_world():
	return open("react.js").read()
@app.route("/assets/<path:p>")
def get(p):
	return open(p,"rb").read()
app.run(host='0.0.0.0', port=8080)

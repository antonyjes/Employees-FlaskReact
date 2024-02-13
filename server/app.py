from flask import Flask, jsonify, request
from flask_mysqldb import MySQL, MySQLdb
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from gentoken import generate_token

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'crud_db'
mysql = MySQL(app)


@app.route("/register", methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users(username, email, password) VALUES (%s, %s, %s)", (username, email, generate_password_hash(password)))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'messsage': 'Success'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route("/login", methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        if user and check_password_hash(user['password'], password):
            token = generate_token(user['id'])
            del user['password']
            if token:
                return jsonify({'user': user, 'token': token}), 200
            else:
                return jsonify({'error': 'Failed to generate token'}), 500
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=3000, debug=True)
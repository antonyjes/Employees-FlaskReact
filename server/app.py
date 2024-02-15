from flask import Flask, jsonify, request
from flask_mysqldb import MySQL, MySQLdb
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from gentoken import generate_token
from datetime import datetime

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
        app.logger.error(e)
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
        app.logger.error(e)
        return jsonify({"error": str(e)}), 500
    

@app.route("/companies/<userId>", methods=['GET'])
def getCompanies(userId):
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT * FROM companies WHERE userId = %s", (userId,))
            companies = cursor.fetchall()
            cursor.close()
            return jsonify(companies), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


@app.route("/companies/create", methods=['POST'])
def createCompanies():
    data = request.json
    userId = data.get('userId')
    name = data.get('name')
    createdAt = datetime.now()
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("INSERT INTO companies(name, createdAt, userId) VALUES (%s, %s, %s)", (name, createdAt, userId,))
            mysql.connection.commit()
            cursor.execute("SELECT * FROM companies WHERE id = %s", (cursor.lastrowid,))
            new_company = cursor.fetchone()
            cursor.close()
            return jsonify(new_company), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


@app.route("/companies/<id>/edit", methods=['PATCH'])
def editCompany(id):
    data= request.json
    name = data.get('name')
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("UPDATE companies SET name = %s WHERE id = %s", (name, id,))
            mysql.connection.commit()
            cursor.execute("SELECT * FROM companies WHERE id = %s", (id,))
            updated_company = cursor.fetchone()
            cursor.close()
            return jsonify(updated_company), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


if __name__ == "__main__":
    app.run(port=3000, debug=True)
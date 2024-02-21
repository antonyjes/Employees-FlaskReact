from flask import Flask, jsonify, request, send_file
from flask_mysqldb import MySQL, MySQLdb
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from gentoken import generate_token
from datetime import datetime
from uniqueFilename import generate_unique_filename
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'crud_db'
mysql = MySQL(app)

app.config['UPLOAD_FOLDER'] = 'assets'

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


@app.route("/companies/<id>/delete", methods=['DELETE'])
def deleteCompany(id):
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("UPDATE employees SET companyId = NULL WHERE companyId = %s", (id,))
            cursor.execute("DELETE FROM companies WHERE id = %s", (id,))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"message": 'Company deleted successfully!'}), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


@app.route("/employees/<userId>", methods=['GET'])
def getEmployees(userId):
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT e.id, e.firstName, e.lastName, e.age, e.image, e.companyId, c.name AS companyName \
                            FROM employees AS e \
                            INNER JOIN companies AS c ON e.companyId = c.id \
                            WHERE c.userId = %s", (userId,))
            employees = cursor.fetchall()
            cursor.close()
            return jsonify(employees), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401
    

@app.route("/employees/create", methods=['POST'])
def createEmployee():
    data = request.form
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    age = data.get('age')
    companyId = data.get('companyId')
    image = request.files['imageReal']
    token = request.headers.get("Authorization")

    if token:
        try:
            if image:
                filename = secure_filename(image.filename)
                unique_filename = generate_unique_filename(filename)
                upload_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
                if not os.path.exists(upload_path):
                    os.makedirs(upload_path)
                imagePath = os.path.join(upload_path, unique_filename)
                with open(imagePath, 'wb') as f:
                    image.save(f)
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("INSERT INTO employees(firstName, lastName, age, image, companyId) VALUES (%s, %s, %s, %s, %s)", (firstName, lastName, age, unique_filename, companyId,))
            mysql.connection.commit()
            cursor.execute("SELECT * FROM employees WHERE id = %s", (cursor.lastrowid,))
            new_employee = cursor.fetchone()
            cursor.close()
            return jsonify(new_employee), 200            
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


@app.route("/assets/<filename>", methods=['GET'])
def getImage(filename):
    try:
        return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    except FileNotFoundError:
        return jsonify({'error': 'Image not found'}), 404


@app.route("/employees/<id>/delete", methods=['DELETE'])
def deleteEmployee(id):
    token = request.headers.get("Authorization")
    if token:
        try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT image FROM employees WHERE id = %s", (id,))
            employee = cursor.fetchone()
            imagePath = employee['image']
            completeImagePath = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], imagePath)
            if os.path.exists(completeImagePath):
                os.unlink(completeImagePath)
            cursor.execute("DELETE FROM employees WHERE id = %s", (id,))
            mysql.connection.commit()
            cursor.close()
            return jsonify({"message": 'Employee deleted successfully!'}), 200
        except Exception as e:
            app.logger.error(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'Invalid token'}), 401


if __name__ == "__main__":
    app.run(port=3000, debug=True)
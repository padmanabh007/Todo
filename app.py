from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
import json
from flask_cors import CORS
#from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///test.db'
db = SQLAlchemy(app)


#SWAGGER_URL = '/api/docs'
#API_URL = '/static/swagger.json'
#
#swagger_blueprint = get_swaggerui_blueprint(
#    SWAGGER_URL,
#    API_URL,
#    config = {
#        'app_name':'Test application'
#    }
#
#)
#
#app.register_blueprint(swagger_blueprint)
#

class Todo(db.Model):
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    todo = db.Column(db.String(120), nullable=False)
    idperson = db.Column(db.Integer, nullable=False)

    def __str__(self):
        return f'{self.id : self.work}'

class Person(db.Model):
    id = db.Column(db.Integer , primary_key=True,autoincrement=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    #todos = db.relationship('Todo', backref='person')



def todo_making(data):
    l=[]
    for i in data:
        l.append({'id' : i.id, 'work' :i.todo})
    return(l)

def person_making(data):
    return ({ 'id' : data.id}) 

@app.route('/login/<email>/<password>/', methods=['GET'])
def login(email,password):
    data = Person.query.filter_by(email = email).first()
    if data is not None and data.password == password:
        return jsonify(person_making(data)),200
    else:
        return 'Error in Email or Password.....',401


@app.route('/signup/', methods=['POST'])
def signup():
    if request.method == 'POST' :
        data = json.loads(request.data)
        user = Person.query.filter_by(email = data['email']).first()
        if user :
            return 'user exists',403
        else:
            user = Person(email=data['email'], password=data['password'])
            db.session.add(user)
            db.session.commit()
            data = Person.query.filter_by(email = data['email']).first()
            return jsonify(person_making(data)),201



@app.route('/<id>/todo/', methods = ['GET'])
def todo(id):
    data = Todo.query.filter_by(idperson=id)
    if data is not None:
        return jsonify(todo_making(data)),200
    else:
        return 'Not Found',404 

@app.route('/<id>/addTodo/', methods = ['POST'])
def add_Todo(id):
    if request.method == 'POST':
        data = json.loads(request.data)
        todo = Todo(todo = data['todo'], idperson=id)
        db.session.add(todo)
        db.session.commit()
    return jsonify(todo_making(Todo.query.filter_by(idperson=id))),201

@app.route('/<idp>/delTodo/<idt>/', methods = ['DELETE'])
def del_Todo(idp,idt):
    if request.method == 'DELETE':
        data = Todo.query.get(idt)
        db.session.delete(data)
        db.session.commit()
    return jsonify(todo_making(Todo.query.filter_by(idperson=idp))),200


if __name__ == '__main__':
    app.run(debug=True)


#
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///test.db'
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    work = db.Column(db.String(120), nullable=False)

    def __str__(self):
        return f'{self.id : self.work}'



def making(data):
    l=[]
    for i in data:
        l.append({'id' : i.id, 'work' :i.work})
    return(l)



@app.route('/todo', methods = ['GET'])
def todo():
    data = Todo.query.all()
    return jsonify(making(data)),200 

@app.route('/addTodo', methods = ['POST'])
def add_Todo():
    if request.method == 'POST':
        data = json.loads(request.data)
        todo = Todo(work = data['work'])
        db.session.add(todo)
        db.session.commit()
    return jsonify(making(Todo.query.all())),201

@app.route('/delTodo/<id>', methods = ['DELETE'])
def del_Todo(id):
    if request.method == 'DELETE':
        data = Todo.query.get(id)
        db.session.delete(data)
        db.session.commit()
    return jsonify(making(Todo.query.all())),200


if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask,render_template,request,redirect,url_for,session,flash 

store = Flask(__name__)

@store.route('/')
def home():
    return render_template('homee.html')


@store.route('/signin')
def signin():
      return render_template('signin.html')

@store.route('/login.html')
def login():
      return render_template('login.html')




if __name__ == '__main__' :
        store.run(port=8000, debug = True)
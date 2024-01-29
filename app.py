from flask import Flask,render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/index')
def home1():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/blog')
def blog():
    return render_template("blog.html")

@app.route('/blog-post')
def blog_post():
    return render_template("blog-post.html")

@app.route('/blog-post1')
def blog_post1():
    return render_template("blog-post1.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/resume')
def surajresume():
    return render_template("surajresume.html")

# if __name__ == '__main__':
#     app.run(host="0.0.0.0",port="8080",debug=True)
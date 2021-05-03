from typing import Optional
from fastapi import FastAPI , Request
import mysql.connector
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/courses/best")
def getbest():
    #SELECT id_cours , count(*) from coursesviews GROUP BY id_cours order BY count(*) DESC LIMIT 3
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT id_cours , count(*) as views from coursesviews GROUP BY id_cours order BY count(*) DESC LIMIT 3")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/teacher/best")
def getbest():
    #
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute("select course_owner , count(*) as total from course GROUP BY course_owner  order by total DESC")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/teacher/courses/get")
def getCourse(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from course where course_owner = {id}")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/teacher/info")
def gett(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from teacher where id_teach = {id}")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/teacher/login")
async def log(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"SELECT * from teacher where email_teach = '{body['user']}' and pwd_teach = '{body['pwd']}'")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/teacher/courses/add")
async def addC(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"INSERT INTO `course` (`course_id`, `course_name` ,`course_img`,`course_link` , `course_owner` , `category_id` , `course_desc` ) VALUES (NULL, '{body['nom']}' , '{body['img']}' , '{body['pdf']}' , '{body['id']}' , '{body['cat']}' , '{body['desc']}')")
    mydb.commit()

@app.post("/teacher/courses/del")
async def delC(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:
        mycursor.execute(f"DELETE from course where course_id = {body['id']}")
        mydb.commit()
        return {"Done"}
    except:
        mydb.rollback()
        return {"ERR"}
@app.get("/teacher/courses/get")
def getC(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from course where course_owner ={id}")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/profile/update")
async def update(request:Request):
    #UPDATE `etudiant` SET `nom` = 'tests', `prenom` = 'test2s', `dn_etu` = '1999-06-27s', `email_etu` = 'hamza@3allamni.tns', `pwd_etu` = 'toutoutn12s', `genre` = 'males', `phone` = '953356531', `status` = 'Students', `facebook` = 'zes', `instagram` = 'Noneres', `twitter` = 'Noness', `github` = 'Nonexs', `website` = 'Noness' WHERE `etudiant`.`id_etu` = 21;
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE `etudiant` SET `nom` = '{body['nom']}', `prenom` = '{body['prenom']}', `email_etu` = '{body['email']}', `pwd_etu` = '{body['pwd']}',  `phone` = '{body['num']}', `status` = '{body['status']}', `facebook` = '{body['fb']}', `instagram` = '{body['insta']}', `twitter` = '{body['twt']}', `github` = '{body['git']}', `website` = '{body['web']}' , `img_etu` = '{body['img']}'WHERE `etudiant`.`id_etu` = {body['id']};")
    mydb.commit()
    return {"Done"}
    
@app.get("/countViews")
def count(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT  count(*) as views from coursesviews where id_user ={id} GROUP BY id_user")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/view")
async def view(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:
        mycursor.execute(f"INSERT INTO `coursesviews` (`id_cours`, `id_user`) VALUES ('{body['course']}', '{body['user']}');")
        mydb.commit()
        return {"Saved!"}
    except:
        mydb.rollback()
        return {"user already viewed this course"}
@app.get("/countPosts")
def count(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT  count(*) as posts from reponse where id_user ={id} GROUP BY id_user")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/countThreads")
def count(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT  count(*) as threads from question where question_asker ={id} GROUP BY question_asker")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/uploadCourse")
async def up(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE `course` SET `course_link` ='{body['data']}' where course_id = {body['id']}")
    mydb.commit()
    rv = mycursor.fetchone()
    return "done"
@app.get("/getcourse")
def getc(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from `course` where course_id= {id}")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/teacher")
def gett(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from `teacher` where id_teach = {id}")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/request")
async def up(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"INSERT INTO `requests` (`id_request`, `fullName`, `email`, `phone`, `link` , `cv`) VALUES (NULL, '{body['name']}', '{body['email']}', '{body['num']}', '{body['link']}' , '{body['cv']}');")
    mydb.commit()
    return "done"
@app.post("/upload")
async def upload(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"UPDATE `etudiant` SET `img_etu` ='{body['img']}' where id_etu = {body['id']}")
    mydb.commit()
    rv = mycursor.fetchone()
    return "done"
@app.post("/register")
async def reg(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"SELECT * FROM etudiant WHERE email_etu = '{body['email']}'")
    rv = mycursor.fetchone()
    if (rv):
        return '{"Email already exists!"}'
    else:
        mycursor.execute(f"INSERT INTO `etudiant` (`id_etu`, `nom`, `prenom`, `dn_etu`, `email_etu`, `pwd_etu`, `img_etu`, `genre`) VALUES ('', '{body['nom']}', '{body['prenom']}', '{body['dn']}', '{body['email']}', '{body['pwd']}', '', '{body['genre']}');")
        mydb.commit()
        mycursor.execute(f"SELECT id_etu FROM etudiant WHERE email_etu = '{body['email']}'")
        row_headers=[x[0] for x in mycursor.description] 
        rv = mycursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json_data
@app.get("/reponse")
def getR(id : int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from reponse where id_question = {id}")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.get("/course")
def getC(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from course where category_id = {id}")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/category")
def getcat():
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from category")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/forum")
def get_data(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * FROM question ORDER BY question_id DESC")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.post("/thread")
async def addp(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:
        mycursor.execute(f"INSERT INTO `reponse` (`id_rep`, `id_user`, `id_question`, `cont_rep`) VALUES (NULL, '{body['id']}', '{body['qid']}', '{body['cnt']}')")
        mydb.commit()
    except:
        mydb.rollback()
    rv = mycursor.fetchall()

    return rv

@app.get("/question")
def getq(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from question where question_id = {id}")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
@app.get("/user")
async def get_data(id:int):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from etudiant where id_etu = {id}")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.post("/login")
async def db_test(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"SELECT *  from etudiant where email_etu = '{body['user']}' and pwd_etu = '{body['pwd']}'")
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
            json_data.append(dict(zip(row_headers,result)))
    return json_data
    
@app.post("/post")
async def newP(request : Request ):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "3alamni_db")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:

        mycursor.execute(f"INSERT INTO `question` ( `question_asker`, `question_title`, `question_desc`, `contenu`) VALUES ( '{body['id']}', '{body['title']}', '{body['desc']}', '{body['cnt']}');")
        mydb.commit()
    except:
        mydb.rollback()
    rv = mycursor.fetchall()
    
    return rv
# 3allamni
3allamni is an open source  fully functional E-learning website template that you can run localy on your computer.
## Getting Started
These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.
### Prerequisites
Requirements for the software and other tools to build, test and push 



-[![Angular](https://cdn.iconscout.com/icon/free/png-32/angular-2752246-2285063.png)][1]

-[![XAMPP](https://cdn.icon-icons.com/icons2/1381/PNG/32/xampp_94513.png)][2]

-[![Python 3.7](https://icons.iconarchive.com/icons/papirus-team/papirus-apps/32/python-icon.png)][3]


### Installing
A step by step series of examples that tell you how to get a development
environment running

First Of All Download/clone thise project on your computer.
Then we will Start the setup:

First  , After Installing XAMPP  , Open it and Start both of :

  -Apache
  
  -MySQL
  
  ![image](https://user-images.githubusercontent.com/78027050/117541826-071c5b00-b016-11eb-837c-2d97af2d4ba5.png)
  
Then Click on Admin for MySQL column  , a Window will pop up and redirects you to the phpMyAdmin Page:
Now We will Import our database to the mysql server:

- Create a Database called : **3allamni_db**
- Go To import and Import our .sql file located in : ./Database/db.sql
- Click On Execute

***Note : If There was an Import Error then make sure to execute each sql statement line by line on your database sql command***


Secondly  , We will start our FAST API Script before doing so Make sure to install the following Python Modules:
- Fast API:
          
          pip install FASTAPI
          
- uvicorn:
         
         pip install uvicorn[standard]

- mysql-connector-python:
          
          pip install mysql-connector-python





[1]: https://angular.io/
[2]: http://apachefriends.org/
[3]:https://www.python.org/downloads/release/python-370/

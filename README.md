## Overview
This project is a film reviews app where users can browse movies, view details, and submit reviews. The frontend is built with React and communicates with a Django REST framework backend. Users can sign up, log in, and manage their reviews through the application.

![image](https://github.com/user-attachments/assets/27ab3a83-b0e6-415e-9aad-fcd3dcaa3334)

![image](https://github.com/user-attachments/assets/00fcb531-6227-47f9-9d50-f3be30d1b69b)

## Frontend Setup (available at http://localhost:3000)
### 1) Clone and Navigate To The Repository
`git clone https://github.com/krish2903/film-reviews-app.git`

cd film-reviews-app/frontend
### 2) Install Necessary Dependencies (ensure you have Node.js installed)
npm install
### 3) Run The Development Server
npm start

## Backend Setup (available at http://localhost:8000)
### 1) Navigate to the Backend Directory
cd ../backend
### 2) Create a Virtual Environment 
python -m venv myenv

source myenv/bin/activate  (On Windows use: myenv\Scripts\activate) - this is to activate the virtual environment
### 3) Install Dependencies
pip install -r requirements.txt
### 4) Run the Server (after making migrations)
python manage.py makemigrations

python manage.py migrate

python manage.py runserver



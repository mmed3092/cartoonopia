# Catoonopia Web Application Assignmen2


This is the final version of the Cartoonopia Web Application. Users can sign up or log in to the homepage of Cartoonopia to compare characters and view character details. Regular users can add or edit characters with approval from the administrator and revoke changes if they are pending. They can also like their favorite characters and check their user profile, where contributions can be viewed. Contributions include all the changes they have made to the website.

Regular users can be promoted to administrators by another administrator. Administrators have the authority to add, edit, and delete characters without approval from others. They can also approve or reject changes from regular users and view the entire change history of the website.

## Getting Started
Visite the Node.js website and download the Node.js and npm (Node Package Manager) for your operating system.


### Prerequisites

run this commoands in terminal to see the npm is installed properly. 
```
node --version
npm --version
```

### Installing


Open VScode and clone the repository.

```
git clone https://github.sydney.edu.au/COMP5347-COMP4347-2024/Lab-6-Group6.git
```

Go to [Download Environment File](https://drive.google.com/drive/folders/1P21gIUB_DzX_YJnAfAai1sqTRTCAIrv8?usp=sharing)

Download the frontend env into your local frontend, and the backend env into your local backend.

In VScode, navigate to the project directory, and open terminal.
Install depedencies in the backend:
```
cd backend
npm install
```
Install depedencies in the frontend:
```
cd backend
npm install
```


## Running the app

Ensure that the Mongodb URI matched with your intended database location. This can be changed in the `/backend/.env` file as follows:
```
MONGO_URI = 'mongodb://localhost:27017/cartoonopia'
```

navigate to backend folder and run the backend
```
cd backend
npm run dev
```
naviate to frontend folder and run the frontend
```
cd frontend
npm run dev
```

This should establish the connection, go to the url seen in the frontend terminal, could be like this  
Local:   http://localhost:3030/  
And you can start exploring the web application



## Built With

React - the JavaScript library for frontend  
React Router DOM - handle routing in react application  
TypeScript  
Tailwind CSS - CSS framwrok  
Axios - Promise based HTTP client for node.js  
bcryptjs - hash the user password  
MongoDB - the backend database  



## Authors
Nafi Robayat  
Mila Medic  
Shiraj Shamshir Shawman  
Zhanyu Jin  




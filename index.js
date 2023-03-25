const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user/user');
const editorRoutes = require('./routes/editor/editor');
const app = express();
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.listen(5000, () => console.log('Server started on port 5000'));

const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/editor', editorRoutes)
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCnwS_XmnhuzLZ0yJp7aYAUG8UvbtqT8Yg",
//   authDomain: "codeeditorbackend.firebaseapp.com",
//   projectId: "codeeditorbackend",
//   storageBucket: "codeeditorbackend.appspot.com",
//   messagingSenderId: "856125210830",
//   appId: "1:856125210830:web:aa332ccddc6a824a3fd09f",
//   measurementId: "G-07LQ1RTBGR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
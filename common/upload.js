// const { initializeApp } = require("firebase/app");
// const {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } = require("firebase/storage");

// const uploadFirebase = (files) => {
//   if (!files) {
//     throw new Error("Error: No files found");
//   }

//   const firebaseConfig = {
//     apiKey: "AIzaSyBq_4gLhcOA7x3Ouo4XhXt5IU_chXpg2p0",
//     authDomain: "mindx55-cooking-holices.firebaseapp.com",
//     projectId: "mindx55-cooking-holices",
//     storageBucket: "mindx55-cooking-holices.appspot.com",
//     messagingSenderId: "81420822572",
//     appId: "1:81420822572:web:f23a0c754b060d74414989",
//   };
//   const app = initializeApp(firebaseConfig);
//   const storage = getStorage(app);
//   const listImg = [];
//   let errUploadImg;
//   for (let i = 0; i < files.length; i++) {
//     const metadata = {
//       contentType: files[i].mimetype,
//     };

//     const suffix = Date.now() + "-" + Math.round(Math.random() * 1000);
//     const fileName = suffix + "-" + files[i].originalname.replaceAll(" ", "-");
//     const storageRef = ref(storage, "images/" + fileName);
//     const uploadTask = uploadBytesResumable(
//       storageRef,
//       files[i].buffer,
//       metadata
//     );

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(
//       "state_changed",
//       (error) => {
//         errUploadImg = error.code;
//       },
//       () => {
//         console.log(1);
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           listImg.push(downloadURL);
//         });
//       }
//     );
//   }
//   if (errUploadImg) {
//     throw new Error(errUploadImg);
//   }
//   console.log(listImg);
//   return listImg;
// };

// module.exports = uploadFirebase;

var firebaseConfig = {
  apiKey: 'AIzaSyBruZh1bTFMfDi_Q_fYYD73PiByXs5yax0',
  authDomain: 'iconnect-88fcc.firebaseapp.com',
  projectId: 'iconnect-88fcc',
  storageBucket: 'iconnect-88fcc.appspot.com',
  messagingSenderId: '107244892732',
  appId: '1:107244892732:web:4e52ac34afcdbf40e6c939',
  measurementId: 'G-6JP6297P57',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password-2');
const signupBtn = document.querySelector('#register-btn');

const register = document.querySelector('.register');
const login = document.querySelector('.login');

const linkToRegister = document.querySelector('.link-to-register');
const linkToLogin = document.querySelector('.link-to-login');

linkToRegister.addEventListener('click', function () {
  login.classList.add('hidden');
  register.classList.remove('hidden');
});

linkToLogin.addEventListener('click', function () {
  login.classList.remove('hidden');
  register.classList.add('hidden');
  document.getElementById('password').value = '';
  document.getElementById('password-2').value = '';
  window.location.reload();
});

const db = firebase.firestore();

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let emailValue = email.value;
  let passwordValue;

  if (password.value === confirmPassword.value) {
    passwordValue = password.value;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailValue, passwordValue)
    .then((userCredential) => {
      // CREATE USERS FIRESTORE DATABASE COLLECTION
      db.collection('users')
        .doc(userCredential.user.uid)
        .set({
          username: username.value,
          email: email.value,
        })
        .then((docRef) => {
          register.classList.add('hidden');
          login.classList.remove('hidden');
          document.querySelector('.mail-confirm').classList.remove('hidden');
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {});
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

// ______________________________________LOGIN______________________________________\\
const loginBtn = document.getElementById('login-btn');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginBtn.addEventListener('click', function () {
  let emailValue = loginEmail.value;
  let passwordValue = loginPassword.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(emailValue, passwordValue)
    .then((userCredential) => {
      var user = userCredential.user;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          window.location = '/main.html';
        }
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      $('#login-message-red').text(errorMessage);
    });
});

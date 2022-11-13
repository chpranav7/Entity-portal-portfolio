import { Snackbar } from '@mui/material';
import * as React from 'react';
import { registerUser } from '../../services/services';
export default function Register({ toggleModal }) {
  //This js file is mainly to register users and it will take care all validations as well
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [cpasswordError, setcPasswordError] = React.useState('');
  const [invalidError, setInvalidError] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const cpasswordChange = (event) => {
    setCPassword(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (!ValidateEmail(event.target.value)) {
      setEmailError('Enter valid Email!');
    } else {
      setEmailError('');
    }
  }

  const nameFChange = (event) => {
    setFName(event.target.value);
  }

  const nameLChange = (event) => {
    setLName(event.target.value);
  }

  const clickRegister = () => {

    if (email === "" || email === undefined || password === "" || password === undefined ||
      fname === "" || fname === undefined || lname === "" || lname === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else if (!ValidateEmail(email)) {
      return false;
    } else if (password != cpassword) {
      setcPasswordError('Password mismatched!');
      return false;
    } else {
      registerUser(fname, lname, email, password).then(res => {
        console.log(res)
        if (res.ok) {
          setFName("");
          setLName("");
          setEmail("");
          setPassword("");
          setCPassword("");
          setcPasswordError("");
          setSnackMessage('Registration success!, Please log in');
          setOpenSnack(true);
        } else {
          res.text().then(text => {
            let err = JSON.parse(text);
            console.log(err);

            if (err.error) {
              setcPasswordError(err.errors[0].defaultMessage);
              setSnackMessage(err.errors[0].defaultMessage);
            } else {
              setcPasswordError(err.message);
              setSnackMessage(err.message);
            }
            setOpenSnack(true);
          })
        }

      })
        .catch(error => {
          console.log("Regiter failed" + error);
          setInvalidError('Registration Failed!');
        })
    }
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function phonenumber(mobile) {
    var phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  const clickLogin = () => {
    toggleModal();
  }

  const [logButtonName, setlogButtonName] = React.useState("LOGIN");

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  return (
    <React.Fragment >
      <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">Register your account</h1>
          <br></br>
          <div className="grid ">
            <div class="relative">
              <input type="text" value={fname} onChange={nameFChange} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">First Name</label>
            </div>
          </div>
          <br></br>

          <div className="grid ">
            <div class="relative">
              <input type="text" value={lname} onChange={nameLChange} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Last Name</label>
            </div>
          </div>

          <br></br>

          <div className="grid ">
            <div class="relative">
              <input type="text" value={email} onChange={emailChange} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
            </div>
          </div>
          <br></br>


          <span style={{
            color: 'red',
          }}>{emailError}</span>

          <div className="grid ">
            <div class="relative">
              <input type="password" value={password} onChange={passwordChange} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
            </div>
          </div> <br></br>
          <div className="grid ">
            <div class="relative">
              <input type="password" value={cpassword} onChange={cpasswordChange} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm Password</label>
            </div>
          </div> <br></br>


          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{cpasswordError}</span>


          <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={clickRegister} >&nbsp;REGISTER</button>
          <br></br>
          <span class="flex flex-row cursor-pointer text-blue-600" onClick={clickLogin}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg> &nbsp; Back to Login</span>

        </div>


      </div>
      <Snackbar
        style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}
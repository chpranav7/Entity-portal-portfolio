import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Login from '../Login/Login';
import Sidebar from '../Sidebar';

const Navbar = ({ logButtonName, setlogButtonName }) => {

  const [isOpen, setIsOpen] = React.useState(false);
  console.log("logButtonName==", logButtonName);
  function toggleModal() {

    if (logButtonName === 'LOGOUT') {

    } else {
      setIsOpen(!isOpen);
    }
  }

  //alert(selectValue);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      width: '500px !important',
      backgroundColor: 'rgb(31 41 55)',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <div className="bg-gray-900 " >
      <div className="h-16 px-10 flex items-center" >
        <p className="text-white font-bold" > </p>
        <div style={{ flex: '1' }}></div>



        
      </div>


      <Sidebar loginButton={setlogButtonName} isLoggedIn={logButtonName} toggleModal={toggleModal} />
      {/* <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          > */}
      {(logButtonName === "LOGIN") ? (
        <Login toggleModal={toggleModal} loginButton={setlogButtonName} />
      ) : ""}
      {/* </BootstrapDialog> */}

    </div>
  )
}

export default Navbar
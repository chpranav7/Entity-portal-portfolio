import { Grid, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { csvFileUpload } from '../../services/services';

export default function Home() {

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);


  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  function getLoggedInStatus() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1000px !important',
      height: '800px'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapDialogForViewMovie = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1200px !important',
      height: '900px'
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

  function fileUpload(e) {
    console.log(e.target.files);
    csvFileUpload(e.target.files[0]).then(resp => {
      console.log(resp.data);
      setOrderData(resp.data);
    }).catch(error => {
      console.log("login user err ", error);
    })

  }



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: 'accountId', label: 'ACC. ID', maxWidth: 30 },
    { id: 'accountNumber', label: 'ACCOUNT NUMBER', maxWidth: 100 },
    { id: 'amount', label: 'AMOUNT', maxWidth: 30 },
    { id: 'currency', label: 'CURRENCY', maxWidth: 100 },
    { id: 'description', label: 'DESCRIPTION', maxWidth: 100 },
    { id: 'passcode', label: 'PASSCODE', maxWidth: 70 },
    { id: 'city', label: 'CITY', maxWidth: 70 },
    { id: 'country', label: 'COUNTRY', maxWidth: 70 },
    { id: 'date', label: 'DATE', maxWidth: 70 }
  ];


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>

      <Grid container direction="row" spacing={1}
        style={{ paddingLeft: '100px' }} >
        <Grid md={1}></Grid>
        <Grid md={10}>
          <br></br><br></br>
          <Typography variant='h6' fontWeight={700}>
            UPLOAD CSV FILE:
          </Typography>
          <input type="file" id="myFile" name="filename" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={fileUpload} placeholder="Please choose file" />
          <br></br><br></br><br></br>

          <Typography variant='h6' fontWeight={700}>
            PROCESSED DATA FROM CSV:
          </Typography>
          <div className="min-w-screen flex items-center justify-center overflow-hidden rounded-2xl bg-gray-900">

            <div className="w-full ">

              <div className="bg-white shadow-md rounded my-6">
                <TableContainer sx={{ minHeight: 277, maxHeight: 300 }}>
                  <Table stickyHeader aria-label="sticky table" class="min-w-max w-full table-auto " >
                    <TableHead>
                      <TableRow class="bg-gray-900 text-white uppercase leading-normal">
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ maxWidth: column.maxWidth }}
                            class="py-3 px-6 text-left"
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody class="text-gray-200 bg-gray-700 text-sm font-light ">
                      {orderData && orderData.length > 0 ? (orderData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, ind) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} class="border-b border-gray-900 hover:bg-gray-600 ">
                              {columns.map((column) => {
                                const id = row["id"];
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align} class="py-3 px-6 text-left whitespace-nowrap">
                                    {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}


                                    {(column.id === 'action') ? (
                                      <>

                                      </>
                                    ) :
                                      (column.id === 'sNo') ? (
                                        ind + 1
                                      ) : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })) : <TableRow><TableCell colSpan={9} style={{ textAlign: 'center', color: 'red' }}>No Records found</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={orderData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  class="bg-gray-900 text-white uppercase leading-normal"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid md={1}></Grid>






      </Grid>

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
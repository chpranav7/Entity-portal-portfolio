import { Grid, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import * as React from 'react';
import { readData } from '../../services/services';
export default function SearchData() {
  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [tableData, setTableData] = React.useState([]);

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: '#ffffcc !important',
              boxShadow: 'none'
            }
          },
        },
        MuiTable: {
          styleOverrides: {
            root: {
              backgroundColor: '#ffffcc !important',
            }
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              backgroundColor: '#ffffcc !important',
              color: 'white'
            },
            head: {
              padding: '8px',
              backgroundColor: '#ffffcc !important',
            }
          },
        },
        MuiTableHead: {
          styleOverrides: {
            head: {
              backgroundColor: 'black !important',
              color: 'white'
            },
            root: {
              padding: '8px',
              backgroundColor: '#ffffcc !important',
            }
          },
        },
        MUIDataTableHead: {
          styleOverrides: {
            root: {
              padding: '8px',
              backgroundColor: '#ffffcc!important',
            },
            head: {
              padding: '8px',
              backgroundColor: '#ffffcc !important',
            }
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: '8px',
              backgroundColor: '#ffffcc !important',
            },
            head: {
              padding: '8px',
              backgroundColor: '#ffffcc !important',
            }
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            regular: {
              backgroundColor: '#ffffcc !important',
              color: 'white'
            }
          }
        }
      }
    });

  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);

  React.useEffect(() => {
    readData().then(resp => {
      console.log(resp.data);
      setTableData(resp.data);
    }).catch(error => {
      console.log("login user err ", error);
    });

  }, []);


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

  const columns = [
    // {
    //   name: "id",
    //   label: "S. NO",
    //   options: {
    //    filter: false,
    //    sort: false,
    //   }
    //  },
    {
      name: "accountId",
      label: "ACC. ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "accountNumber",
      label: "ACCOUNT NUMBER",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "amount",
      label: "AMOUNT",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "currency",
      label: "CURRENCY",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "passcode",
      label: "PASSCODE",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "city",
      label: "CITY",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "country",
      label: "COUNTRY",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "date",
      label: "DATE",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];

  const options = {
    //filterType: 'checkbox',
    selectableRows: false,
    viewColumns: false,
    download: true,
    print: false,
    filter: true,
    search: true,
  };

  return (
    <React.Fragment>
      <br></br><br></br>

      <Grid container direction="row" spacing={1}
        style={{ paddingLeft: '100px' }} >



        <Grid md={1}></Grid>
        <Grid md={10}>

          <br></br><br></br>
          <div className=" flex items-center justify-center overflow-hidden rounded-2xl bg-amber-100">

            <div className="w-full ">

              <div className="rounded my-6">
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    title={"ACCOUNT DETAILS"}
                    data={tableData}
                    columns={columns}
                    options={options}
                    class="bg-gray-900 text-white uppercase leading-normal"
                  />
                </ThemeProvider></div></div></div>
          <br></br><br></br>
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
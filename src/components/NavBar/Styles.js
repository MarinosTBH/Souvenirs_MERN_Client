import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    // #cc2b5e → #753a88

    background: 'linear-gradient(to left ,  #753a88, #0d0c2d)',
    height: '70px',
    marginBottom: '10px',
    width : '100%',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    padding : '0 10px',
  },
  pruple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginTop: '7px',
  },
  brandLogo: {
    maxWidth: '50%',
    opacity : "1",
    borderRadius: '50px',
},
[theme.breakpoints.down('sm')]: {

  logout: {
    background: 'none',
  },

},
}));
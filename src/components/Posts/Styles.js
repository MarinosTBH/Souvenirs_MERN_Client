import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  emptyWarn: {
    fontSize: '1.25rem',
    fontFamily: "Roboto Helvetica Arial sans-serif",
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
  },
}));
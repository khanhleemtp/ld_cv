import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import SeachJob from '../../components/UI/SeachJob';
import codeImg from '../../assets/images/top.svg';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#e2e4ea',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(64),
    },
    height: theme.spacing(48),
  },

  boxContainer: {
    transition: 'all 0.2s ease',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    objectFit: 'contain',
    boxSizing: 'border-box',
  },
  title: {
    color: theme.palette.primary.orange,
  },

  landingImg: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  img: {
    width: theme.spacing(32),
  },
}));

const HomeSeachJob = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.boxContainer}>
        <Box display="flex" flexDirection="column">
          <SeachJob />
          <Box display="flex" marginX={2} marginY={2}>
            <Chip label="C++ 💁" clickable />
            <Chip label="Python 👩‍🦰" clickable />
            <Chip label="Javascript 👳" clickable />
          </Box>
          <Box marginX={2}>
            <Typography
              variant="caption"
              style={{
                color: blueGrey['A700'],
              }}
            >
              CV của chúng tôi đưa bạn đến với những công ty hàng đầu
            </Typography>
            <Button
              color="primary"
              variant="contained"
              style={{
                margin: 8,
              }}
            >
              Tạo CV ngay
            </Button>
          </Box>
        </Box>
        <Box className={classes.landingImg}>
          <img src={codeImg} alt="mario" className={classes.img} />
        </Box>
      </Container>
    </div>
  );
};

export default HomeSeachJob;

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import SeachJob from '../../components/UI/SeachJob';
import codeImg from '../../assets/images/top.svg';

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
  btn: {
    justifySelf: 'end',
    width: 160,
    margin: 12,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

const HomeSeachJob = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.boxContainer}>
        <Container maxWidth="md">
          <Box>
            <Typography variant="h6" className={classes.title}>
              Tìm việc nhanh chóng 👨‍🌾
            </Typography>
          </Box>
          <SeachJob />
          <Box display="flex" marginX={2} marginY={2}>
            <Chip label="C++ 💁" clickable />
            <Chip label="Python 👩‍🦰" clickable />
            <Chip label="Javascript 👳" clickable />
          </Box>

          <Box marginX={2}>
            <Typography variant="body1" component="h6">
              CV của chúng tôi đưa bạn đến với những công ty hàng đầu
            </Typography>
            <Button className={classes.btn} fullWidth>
              Tạo CV ngay
            </Button>
          </Box>
        </Container>
        <img
          src={codeImg}
          alt="mario"
          style={{
            overflow: 'hidden',
          }}
        />
      </Container>
    </div>
  );
};

export default HomeSeachJob;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link as ScrollLink,
  animateScroll as scroll,
  Element,
} from 'react-scroll';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
import CardItem from '../../components/HomePage/CardService/CardItem';
import SectionHome from '../../components/HomePage/SectionService/SectionHome';

const arrFooterList = [
  {
    title: 'Ứng viên',
    list: [
      'Tìm việc làm',
      'Quản lý SV',
      'Gợi ý tìm việc',
      'Đánh giá công ty',
      'Tư vấn sửa CV',
    ],
  },
  {
    title: 'Đối tác',
    list: [
      'Doanh nghiệp',
      'Trường Đại học',
      'Itviec.com',
      'Topcv.vn',
      'Viecngay.vn',
    ],
  },
  {
    title: 'Kết nối',
    list: [
      <InstagramIcon />,
      <FacebookIcon />,
      <YouTubeIcon />,
      <TwitterIcon />,
      '🇻🇳',
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#e2e4ea',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(68),
      backgroundPosition: 'right top',
    },
    height: theme.spacing(60),
  },
  container: {
    width: '100%',
    height: '100%',
    transition: 'all 0.2s ease',
  },
  boxContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    objectFit: 'contain',
    boxSizing: 'border-box',
  },
  box: {
    display: 'flex',
    height: 320,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    color: '#000',
    padding: 12,
  },
  subTitle: {
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 800,
    maxWidth: theme.spacing(64),
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 600,
    justifyContent: 'space-between',
  },
  btn: {
    justifySelf: 'end',
    // [theme.breakpoints.down('sm')]: {
    //   width: 160,
    // },
    width: 160,
    margin: 12,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  lastIntro: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 400,
  },
  lastText: {
    fontSize: 16,
    fontWeight: 400,
  },

  gridService: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Container className={classes.boxContainer}>
          <Container className={classes.box} maxWidth="md">
            <Typography variant="body2" className={classes.subTitle}>
              Tìm việc nhanh chóng
            </Typography>
            <Typography variant="h4" className={classes.title} component="h2">
              Đồng hành cùng bạn đến những công việc tốt nhất
            </Typography>

            <List
              component="nav"
              aria-label="contacts"
              className={classes.list}
            >
              <ListItem>
                <ListItemIcon>🐕‍🦺</ListItemIcon>
                <ListItemText primary="Dog" />
              </ListItem>
              <ListItem>
                <ListItemIcon>🐈</ListItemIcon>
                <ListItemText primary="Cat" />
              </ListItem>
              <ListItem>
                <ListItemIcon>🐬</ListItemIcon>
                <ListItemText primary="Dolphin" />
              </ListItem>
            </List>

            <Box className={classes.lastIntro}>
              <ScrollLink
                activeClass="active"
                className="test1"
                to="test1"
                spy={true}
                smooth={true}
                duration={500}
              >
                <Button className={classes.btn} variant="contained" fullWidth>
                  Tạo CV ngay
                </Button>
              </ScrollLink>
              <Typography
                variant="body1"
                component="h6"
                className={classes.lastText}
              >
                CV của chúng tôi đưa bạn đến với những công ty hàng đầu
              </Typography>
            </Box>
          </Container>
          <img
            src="top.svg"
            alt="mario"
            style={{
              overflow: 'hidden',
            }}
          />
        </Container>
      </div>
      {/* <Element name="test1">
        {[1, 2].map((item) => (
          <SectionHome key={item} id={item} />
        ))}
      </Element> */}
      <Container maxWidth="lg">
        <Box marginY={4}>
          <Typography variant="h4">Nhà tuyển dụng hàng đầu</Typography>
        </Box>
        <Grid container spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              className={classes.gridService}
              key={item}
            >
              <CardItem key={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '32px',
          marginBottom: '32px',
        }}
      >
        <Typography variant="h5">
          Hãy trải nghiệm dịch vụ của chúng tôi
        </Typography>
        <Button
          className={classes.btn}
          variant="outlined"
          onClick={() => scroll.scrollToTop()}
        >
          LD CV
        </Button>
      </Container>

      <Container
        maxWidth="md"
        style={{
          marginTop: '24px',
          marginBottom: '24px',
        }}
      >
        <Grid container spacing={2} alignItems="center" justify="center">
          {arrFooterList.map((item) => (
            <Grid item xs={6} md={4} key={item.title}>
              <Typography variant="h6" align="center">
                {item.title}
              </Typography>
              {item.list.map((i, k) => (
                <Link
                  key={k}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="body1" align="center">
                    {i}
                  </Typography>
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;

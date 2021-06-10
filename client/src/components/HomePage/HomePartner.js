import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import Container from '@material-ui/core/Container';

const arrFooterList = [
  {
    title: 'Ứng viên',
    list: [
      'Tìm việc làm',
      'Quản lý CV',
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

const HomePartner = () => {
  return (
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
  );
};

export default HomePartner;

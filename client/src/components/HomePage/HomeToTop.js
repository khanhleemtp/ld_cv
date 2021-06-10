import { animateScroll as scroll } from 'react-scroll';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const HomeToTop = () => {
  return (
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
      <Typography variant="h5" gutterBottom>
        Hãy trải nghiệm dịch vụ của chúng tôi
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => scroll.scrollToTop()}
      >
        LD CV
      </Button>
    </Container>
  );
};

export default HomeToTop;

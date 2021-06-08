import { makeStyles, Paper, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  rating: {
    '& .MuiRating-decimal': {
      color: ['#4287F5', '!important'],
    },
  },
}));
const ItemReview = ({ text, rating }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="body1"
        component="span"
        style={{ marginLeft: 8 }}
        color="primary"
      >
        {text}
      </Typography>
      <Rating
        name="half-rating-read"
        defaultValue={parseInt(rating)}
        precision={0.2}
        readOnly
        style={{ margin: 8 }}
        classes={{
          root: classes.rating,
        }}
      />
      <Typography variant="body1" component="span" color="primary">
        {rating}
      </Typography>
    </Box>
  );
};

const CompanyReview = () => {
  return (
    <Paper>
      <Box display="flex" flexDirection="column" padding={2}>
        <Typography variant="h4">Tổng quát</Typography>
        <Box display="flex" alignItems="center">
          <Rating
            name="half-rating-read"
            defaultValue={3.3}
            precision={0.2}
            readOnly
          />
          <Typography variant="h5" component="span" style={{ marginLeft: 8 }}>
            3.3
          </Typography>
        </Box>
        <ItemReview text="Lương thưởng & phúc lợi" rating={3.3} />
        <ItemReview text="Đào tạo & học hỏi" rating={3.6} />
        <ItemReview text="Sự quan tâm đến nhân viên" rating={3.2} />
        <ItemReview text="Văn hóa công ty" rating={3.7} />
        <ItemReview text="Văn phòng làm việc" rating={3.8} />
        <Button color="secondary" variant="contained" fullWidth>
          Xem thêm các reviews khác
        </Button>{' '}
      </Box>
    </Paper>
  );
};

export default CompanyReview;

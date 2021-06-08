import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSelect from '../../components/UI/Mui/MuiSelect';
import MuiTextField from '../../components/UI/Mui/MuiTextField';

const defaultValues = {
  name: '',
  website: '',
  location: 'Hà Nội',
  position: '',
  phone: '',
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const RegisterCompany = () => {
  const { handleSubmit, getValues, control } = useForm({
    defaultValues,
  });
  const [data, setData] = useState(null);
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <Typography variant="h6">
            🦹‍♂️ Hãy đăng ký trở thành nhà tuyển dụng 💌
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit((data) => {
            setData(data);
            console.log(data);
          })}
          className="form"
        >
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="name"
            label="Tên công ty"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="website"
            label="Website"
          />
          <MuiSelect
            control={control}
            nameField="location"
            label="Thành phố"
            menus={[
              { text: 'Hà Nội', value: 'Hà Nội' },
              { text: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
              { text: 'Đà Nẵng', value: 'Đà Nẵng' },
              { text: 'others', value: 'Other' },
            ]}
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="position"
            label="Vị trí"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="phone"
            label="Điện thoại"
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            fullWidth
            style={{
              marginTop: 8,
            }}
          >
            Gửi
          </Button>
        </form>
        <Typography
          gutterBottom={true}
          variant="body2"
          align="center"
          style={{
            marginTop: 16,
          }}
        >
          Yêu cầu của bạn sẽ được xem xét. Hãy đợi phản hồi từ chúng tôi
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegisterCompany;

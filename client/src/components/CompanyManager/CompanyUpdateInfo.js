import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import MuiTextField from '../../components/UI/Mui/MuiTextField';
import UploadImage from '../../components/UI/UploadImage/UploadImage';
import { useDispatch, useSelector } from 'react-redux';
import {
  companySelector,
  updateCompany,
  getCompanyById,
} from '../../features/Company/CompanySlice';
import { userSelector } from '../../features/User/UserSlice';
import { Link } from 'react-router-dom';
// const defaultValues = {
//   company: 'LD Food',
//   intro: 'Chào mừng bạn đến với LD Food',
//   type: 'Product',
//   location: 'Hà Nội',
//   workTime: 'Thứ 2 - Thứ 6',
//   ot: 'No OT',
//   photo: '/mario.jpg',
//   numEmployees: 3,
//   env: [
//     'Có tối thiểu 1 năm kinh nghiệm làm về framework NodeJS trong phát triển phần mềm',
//     'Nắm vững kiến thức lập trình cơ bản, lập trình hướng đối tượng (OOP), cơ sở dữ liệu (DBMS)',
//     'Tiếng Anh đọc hiểu tài liệu kỹ thuật.',
//   ],
//   opportunity: [
//     'Tham gia phát triển các dự án phát triển phần mềm outsourcing cho Nhật sử dụng framework NodeJS của Javascript',
//     'Đề xuất giải pháp, xu hướng công nghệ mới để nâng cao chất lượng sản phẩm cho khách hàng',
//     'Phối hợp hiệu quả cùng nhóm thiết kế, lập trình để cho ra sản phẩm tốt nhất',
//   ],
// };

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    // marginTop: theme.spacing(2),
  },
}));

const listFields = [
  { label: 'name', nameField: 'name', md: 3 },
  { label: 'Quốc gia', nameField: 'country', md: 2 },
  { label: 'Nơi làm việc', nameField: 'location', md: 2 },
  { label: 'Chế độ OT', nameField: 'ot', md: 2 },
  { label: 'Số lượng nhân viên', nameField: 'numEmployees', md: 3 },
  { label: 'Kiểu công ty', nameField: 'type', md: 2 },
  { label: 'Thời gian làm', nameField: 'workTime', md: 2 },
  { label: 'Giới thiệu tổng quan', nameField: 'intro', md: 12 },
  { label: 'Chi tiết công ty', nameField: 'details', md: 12 },
];

const CompanyUpdateInfo = () => {
  const { user } = useSelector(userSelector);

  const { company } = useSelector(companySelector);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(getCompanyById(user?.company?.id));
  }, [user, dispatch]);

  const { handleSubmit, getValues, control, reset, register, setValue } =
    useForm();

  const {
    fields: envFields,
    append: envAppend,
    remove: envRemove,
  } = useFieldArray({
    control,
    name: 'env',
  });
  const {
    fields: opportunityFields,
    append: opportunityAppend,
    remove: opportunityRemove,
  } = useFieldArray({
    control,
    name: 'opportunity',
  });
  useEffect(() => {
    reset(company);
  }, [reset, company]);

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const photo = useWatch({
    control,
    name: 'photo',
    defaultValue: '/mario.jpg',
  });

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6">🦹‍♂️ Cập nhật thông tin 💌</Typography>
        </Box>
        <form
          onSubmit={handleSubmit((data) => {
            console.log('data to server', data);
            dispatch(updateCompany(data));
          })}
          className="form"
        >
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  width: '170px',
                  height: '170px',
                }}
              >
                <img
                  src={`${photo}`}
                  alt="company"
                  style={{
                    maxWidth: '170px',
                    maxHeight: '170px',
                  }}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setOpen(true)}
                style={{
                  marginTop: 8,
                }}
              >
                Cập nhật logo
              </Button>
              <Box>
                <Link
                  to={'/company/' + company._id}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button variant="text" color="primary">
                    Company Page
                  </Button>
                </Link>
              </Box>
              <UploadImage
                open={open}
                setOpen={setOpen}
                setValue={setValue}
                control={control}
                field={'photo'}
              />
            </Grid>

            {listFields.map((field) => (
              <Grid item key={field?.label} md={parseInt(field?.md)}>
                <MuiTextField
                  control={control}
                  getValues={getValues}
                  // register={register}
                  label={field?.label}
                  nameField={field.nameField}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5">Môi trường làm việc</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => envAppend({ name: ' ' })}
          >
            Thêm
          </Button>
          {envFields.map((item, index) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              paddingLeft={4}
            >
              <MuiTextField
                fullWidth={false}
                control={control}
                getValues={getValues}
                register={register}
                nameField={`env.${index}`}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ maxHeight: 32 }}
                onClick={() => envRemove(index)}
              >
                Xóa
              </Button>
            </Box>
          ))}

          <Typography variant="h5">Cơ hội</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => opportunityAppend({ name: ' ' })}
          >
            Thêm
          </Button>
          {opportunityFields.map((item, index) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              paddingLeft={4}
            >
              <MuiTextField
                fullWidth={false}
                control={control}
                getValues={getValues}
                register={register}
                nameField={`opportunity.${index}`}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ maxHeight: 32 }}
                onClick={() => opportunityRemove(index)}
              >
                Xóa
              </Button>
            </Box>
          ))}

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
            Cập nhật thông tin
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CompanyUpdateInfo;

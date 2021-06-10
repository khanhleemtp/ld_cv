import {
  Box,
  Button,
  Container,
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
  getAllCompany,
  updateCompany,
} from '../../features/Company/CompanySlice';
import { userSelector } from '../../features/User/UserSlice';

const defaultValues = {
  company: 'LD Food',
  intro: 'Chào mừng bạn đến với LD Food',
  type: 'Product',
  location: 'Hà Nội',
  workTime: 'Thứ 2 - Thứ 6',
  ot: 'No OT',
  photo: '/mario.jpg',
  numEmployees: 3,
  env: [
    'Có tối thiểu 1 năm kinh nghiệm làm về framework NodeJS trong phát triển phần mềm',
    'Nắm vững kiến thức lập trình cơ bản, lập trình hướng đối tượng (OOP), cơ sở dữ liệu (DBMS)',
    'Tiếng Anh đọc hiểu tài liệu kỹ thuật.',
  ],
  opportunity: [
    'Tham gia phát triển các dự án phát triển phần mềm outsourcing cho Nhật sử dụng framework NodeJS của Javascript',
    'Đề xuất giải pháp, xu hướng công nghệ mới để nâng cao chất lượng sản phẩm cho khách hàng',
    'Phối hợp hiệu quả cùng nhóm thiết kế, lập trình để cho ra sản phẩm tốt nhất',
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const CompanyUpdateInfo = () => {
  const { user } = useSelector(userSelector);
  const { companies } = useSelector(companySelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCompany({ query: `?user=${user._id}` }));
  }, [user._id, dispatch]);

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
    reset(companies[0]);
  }, [reset, companies]);

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const photo = useWatch({
    control,
    name: 'photo',
    defaultValue: '/mario.jpg',
  });
  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Button variant="outlined">Company Page</Button>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <Typography variant="h6">🦹‍♂️ Cập nhật thông tin 💌</Typography>
        </Box>
        <form
          onSubmit={handleSubmit((data) => {
            // console.log('data to server', data);
            dispatch(updateCompany(data));
          })}
          className="form"
        >
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
            color="primary"
            onClick={() => setOpen(true)}
            style={{
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            Cập nhật logo
          </Button>

          <UploadImage
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            control={control}
          />

          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="name"
            label="Tên công ty"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="intro"
            label="Giới thiệu tổng quan"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="location"
            label="Vị trí"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="type"
            label="Kiểu công ty"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="numEmployees"
            label="Số lượng nhân viên"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="workTime"
            label="Khoảng thời gian làm việc"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="ot"
            label="Chế độ OT"
          />
          {/* <MuiSelect
            control={control}
            nameField="location"
            label="Thành phố"
            menus={[
              { text: 'Hà Nội', value: 'Hà Nội' },
              { text: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
              { text: 'Đà Nẵng', value: 'Đà Nẵng' },
              { text: 'others', value: 'Other' },
            ]}
          /> */}

          {/* {tagFields.map((tag, index) => (
            <Controller
              control={control}
              key={tag.id}
              name={`tags[${index}]`}
              render={({ ...props }) => (
                <>
                  <TextField {...props} multiline={true} />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => tagRemove(index)}
                  >
                    Remove
                  </Button>
                </>
              )}
            />
          ))} */}

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

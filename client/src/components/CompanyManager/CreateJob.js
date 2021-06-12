import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MuiDatePicker from '../../components/UI/Mui/MuiDatePicker';
import MuiSelect from '../../components/UI/Mui/MuiSelect';
import MuiTextField from '../../components/UI/Mui/MuiTextField';
import { createJob } from '../../features/Job/JobSlice';
import { userSelector } from '../../features/User/UserSlice';

// const defaultValues = {
//   title: 'Python',
//   company: '60b7fbeee3cc070914e6a733',
//   tags: ['Python', 'C++', 'Node JS', 'Quản lý dự án'],
//   position: 'Dev',
//   location: 'Hà Nội',
//   requirements: [
//     'Có tối thiểu 1 năm kinh nghiệm làm về framework NodeJS trong phát triển phần mềm',
//     'Nắm vững kiến thức lập trình cơ bản, lập trình hướng đối tượng (OOP), cơ sở dữ liệu (DBMS)',
//     'Tiếng Anh đọc hiểu tài liệu kỹ thuật.',
//   ],
//   descriptions: [
//     'Tham gia phát triển các dự án phát triển phần mềm outsourcing cho Nhật sử dụng framework NodeJS của Javascript',
//     'Đề xuất giải pháp, xu hướng công nghệ mới để nâng cao chất lượng sản phẩm cho khách hàng',
//     'Phối hợp hiệu quả cùng nhóm thiết kế, lập trình để cho ra sản phẩm tốt nhất',
//   ],
//   salary: '1000-2000',
//   type: 'Fulltime',
//   from: '',
//   to: '',
// };

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const CreateJob = () => {
  const dispatch = useDispatch();
  const { handleSubmit, getValues, control, register } = useForm();
  const history = useHistory();
  const { user } = useSelector(userSelector);
  const companyId = user?.company?._id;
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control,
    name: 'tags',
  });

  const {
    fields: requirementFields,
    append: requirementAppend,
    remove: requirementRemove,
  } = useFieldArray({
    control,
    name: 'requirements',
  });

  const {
    fields: descriptionFields,
    append: descriptionAppend,
    remove: descriptionRemove,
  } = useFieldArray({
    control,
    name: 'descriptions',
  });

  const listField = [
    { label: 'Tên công việc', nameField: 'title' },
    { label: 'Vị trí', nameField: 'position' },
    { label: 'Mức lương', nameField: 'salary' },
  ];

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={2}
        >
          <Typography variant="h6">🦹‍♂️ Tạo việc làm 💌</Typography>
        </Box>
        <form
          onSubmit={handleSubmit((data) => {
            dispatch(
              createJob({
                data,
                cb: () => {
                  history.push(`/company/` + companyId);
                },
              })
            );
          })}
          className="form"
        >
          <Grid container spacing={2}>
            {listField?.map((field) => (
              <Grid item key={field.label}>
                <MuiTextField
                  control={control}
                  getValues={getValues}
                  nameField={field.nameField}
                  label={field.label}
                />
              </Grid>
            ))}
            <Grid item>
              <MuiSelect
                control={control}
                nameField="location"
                label="Thành phố"
                getValues={getValues}
                menus={[
                  { text: 'Hà Nội', value: 'Hà Nội' },
                  { text: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
                  { text: 'Đà Nẵng', value: 'Đà Nẵng' },
                  { text: 'other', value: 'other' },
                ]}
              />
            </Grid>
            <Grid item>
              <MuiSelect
                control={control}
                nameField="type"
                label="Loại công việc"
                menus={[
                  { text: 'Fulltime', value: 'fulltime' },
                  { text: 'Partime', value: 'partime' },
                  { text: 'Remote', value: 'remote' },
                ]}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Thời hạn</Typography>
              <MuiDatePicker
                control={control}
                getValues={getValues}
                register={register}
                nameField="to"
              />
            </Grid>
          </Grid>

          <Typography variant="h6">Công nghệ</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => tagAppend({ name: ' ' })}
          >
            Thêm
          </Button>

          {tagFields.map((tag, index) => (
            <Box
              key={tag.id}
              display="flex"
              alignItems="center"
              paddingLeft={4}
            >
              <MuiTextField
                fullWidth={false}
                control={control}
                getValues={getValues}
                register={register}
                nameField={`tags[${index}]`}
              />

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => tagRemove(index)}
                style={{ maxHeight: 32 }}
              >
                Xóa
              </Button>
            </Box>
          ))}
          <Typography variant="h6">Yêu cầu</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => requirementAppend({ name: ' ' })}
          >
            Thêm
          </Button>
          {requirementFields.map((tag, index) => (
            <Box
              key={tag.id}
              display="flex"
              alignItems="center"
              paddingLeft={4}
            >
              <MuiTextField
                fullWidth={false}
                control={control}
                getValues={getValues}
                register={register}
                nameField={`requirements[${index}]`}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ maxHeight: 32 }}
                onClick={() => requirementRemove(index)}
              >
                Xóa
              </Button>
            </Box>
          ))}

          <Typography variant="h6">Mô tả</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => descriptionAppend({ name: ' ' })}
          >
            Thêm
          </Button>
          {descriptionFields.map((tag, index) => (
            <Box
              key={tag.id}
              display="flex"
              alignItems="center"
              paddingLeft={4}
            >
              <MuiTextField
                fullWidth={false}
                control={control}
                getValues={getValues}
                register={register}
                nameField={`descriptions[${index}]`}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ maxHeight: 32 }}
                onClick={() => descriptionRemove(index)}
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
            Tạo công việc
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateJob;

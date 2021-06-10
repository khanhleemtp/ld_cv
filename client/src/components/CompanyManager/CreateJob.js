import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import MuiDatePicker from '../../components/UI/Mui/MuiDatePicker';
import MuiSelect from '../../components/UI/Mui/MuiSelect';
import MuiTextField from '../../components/UI/Mui/MuiTextField';

const defaultValues = {
  title: 'Python',
  company: '60b7fbeee3cc070914e6a733',
  tags: ['Python', 'C++', 'Node JS', 'Quản lý dự án'],
  position: 'Dev',
  location: 'Hà Nội',
  requirements: [
    'Có tối thiểu 1 năm kinh nghiệm làm về framework NodeJS trong phát triển phần mềm',
    'Nắm vững kiến thức lập trình cơ bản, lập trình hướng đối tượng (OOP), cơ sở dữ liệu (DBMS)',
    'Tiếng Anh đọc hiểu tài liệu kỹ thuật.',
  ],
  descriptions: [
    'Tham gia phát triển các dự án phát triển phần mềm outsourcing cho Nhật sử dụng framework NodeJS của Javascript',
    'Đề xuất giải pháp, xu hướng công nghệ mới để nâng cao chất lượng sản phẩm cho khách hàng',
    'Phối hợp hiệu quả cùng nhóm thiết kế, lập trình để cho ra sản phẩm tốt nhất',
  ],
  salary: '1000-2000',
  type: 'Fulltime',
  from: '',
  to: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const CreateJob = () => {
  const { handleSubmit, getValues, control, reset, register } = useForm({
    defaultValues,
  });

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

  useEffect(() => {
    reset(defaultValues);
  }, [reset]);

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
          <Typography variant="h6">🦹‍♂️ Tạo việc làm 💌</Typography>
        </Box>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="form"
        >
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="title"
            label="Tên công việc"
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="position"
            label="Vị trí"
            register={register}
          />
          <MuiTextField
            control={control}
            getValues={getValues}
            nameField="salary"
            label="Mức lương"
          />

          <Typography variant="subtitle2">Thời hạn</Typography>
          <MuiDatePicker
            control={control}
            getValues={getValues}
            register={register}
            nameField="to"
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
          <MuiSelect
            control={control}
            nameField="type"
            label="Loại công việc"
            menus={[
              { text: 'Fulltime', value: 'Fulltime' },
              { text: 'Partime', value: 'Partime' },
              { text: 'Remote', value: 'Remote' },
            ]}
          />

          <Typography variant="h6">Công nghệ</Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => tagAppend({ name: ' ' })}
          >
            Thêm
          </Button>
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

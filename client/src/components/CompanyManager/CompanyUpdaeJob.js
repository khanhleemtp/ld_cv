import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MuiDatePicker from '../../components/UI/Mui/MuiDatePicker';
import MuiSelect from '../../components/UI/Mui/MuiSelect';
import MuiTextField from '../../components/UI/Mui/MuiTextField';
import {
  updateJob,
  jobSelector,
  getjobById,
} from '../../features/Job/JobSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const UpdateJob = () => {
  const dispatch = useDispatch();
  const { handleSubmit, getValues, control, register, reset } = useForm();

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

  const { id } = useParams();
  useEffect(() => {
    dispatch(getjobById(id));
  }, [dispatch, id]);

  const { job } = useSelector(jobSelector);
  const history = useHistory();

  useEffect(() => {
    reset(job);
  }, [job, reset]);

  const handleUpdateJob = handleSubmit((data) =>
    dispatch(updateJob({ id, data, cb: () => history.push('/jobs/' + id) }))
  );

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
          <Typography variant="h6">🦹‍♂️ Cập nhật việc làm 💌</Typography>
        </Box>
        <form onSubmit={handleUpdateJob} className="form">
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
                  { text: 'others', value: 'Other' },
                ]}
              />
            </Grid>
            <Grid item>
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
            Cập nhật công việc
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateJob;

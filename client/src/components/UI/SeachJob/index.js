import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import SelectLocation from './SelectLocation';
import { useSelector, useDispatch } from 'react-redux';
import {
  getJobSearch,
  jobSelector,
  updateFilter,
} from '../../../features/Job/JobSlice';
import MuiAutoComplete from '../Mui/MuiAutoComplete';
import { Container, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {},
    margin: theme.spacing(2),
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  inputRoot: {
    background: ['#fff', '!important'],
    '&:hover': {
      background: ['#fff', '!important'],
    },
    '&:focus': {
      background: ['#fff', '!important'],
    },
  },
  seachJob: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'end',
    },
  },
  btn: {
    marginRight: theme.spacing(1.5),
  },
  title: {
    color: theme.palette.primary.orange,
  },
  inputLabel: {
    color: theme.palette.grey[800],
    '&.focused': {
      fontWeight: 600,
    },
  },
  textField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.app,
    },
    '& .Mui-focused': {
      color: theme.palette.grey.A700,
    },
  },
}));

// const options = [
//   { value: '1111', label: 'c++' },
//   { value: '2222', label: 'c#' },
//   { value: '3333', label: 'javascript' },
//   { value: '4444', label: 'reactjs' },
//   { value: '5555', label: 'vuejs' },
//   { value: '6666', label: 'nextjs' },
// ];

const SeachJob = () => {
  const dispatch = useDispatch();
  const { search, isFetching, filter } = useSelector(jobSelector);
  useEffect(() => {
    dispatch(getJobSearch());
  }, [dispatch]);

  const classes = useStyles();
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: filter,
  });

  useEffect(() => {
    setValue('tags', []);
  }, [setValue]);
  useEffect(() => {
    setValue('positions', []);
  }, [setValue]);

  // useEffect(() => {
  //   reset(filter);
  // }, [filter, reset]);

  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <Container>
      <form
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
          let tags = data?.tags?.map((tag) => tag?.value);
          let positions = data?.positions.map((p) => p?.value);
          let location = data?.location;
          dispatch(updateFilter({ tags, positions, location }));
          if (history.location.pathname) {
            history.push('find');
            return;
          }
        })}
        className="form"
      >
        <Box>
          <Typography variant="h6" className={classes.title}>
            Tìm việc nhanh chóng 👨‍🌾
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" className={classes.seachJob}>
          {!isFetching && search?.tag ? (
            <MuiAutoComplete
              nameField="tags"
              control={control}
              setValue={setValue}
              label="Tìm kiếm theo kỹ năng"
              placeholder="Kĩ năng"
              options={search?.tag}
            />
          ) : (
            <MuiAutoComplete
              nameField="tags"
              control={control}
              setValue={setValue}
              label="Tìm kiếm theo kỹ năng"
              placeholder="Kĩ năng"
              options={[]}
            />
          )}
          {!isFetching && search?.tag ? (
            <MuiAutoComplete
              nameField="positions"
              control={control}
              setValue={setValue}
              label="Tìm kiếm theo vai trò"
              placeholder="Vai trò"
              options={search?.position}
            />
          ) : (
            <MuiAutoComplete
              nameField="positions"
              control={control}
              setValue={setValue}
              label="Tìm kiếm theo vai trò"
              placeholder="Vai trò"
              options={[]}
            />
          )}
          <SelectLocation control={control} />
          <Button variant="contained" type="submit" color="primary">
            Tìm kiếm
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default SeachJob;

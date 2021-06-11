import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../features/Company/CompanySlice';
import { useHistory } from 'react-router-dom';
const CompanyControlJob = ({ jobId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDeleteJob = () => {
    dispatch(deleteJob(jobId));
  };
  const handleEditJob = () => {
    history.push(`/update-job/` + jobId);
  };
  return (
    <Box>
      <IconButton
        // color="secondary"
        aria-label="edit"
        component="span"
        title="Chỉnh sửa job"
        onClick={handleEditJob}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        // color="secondary"
        aria-label="edit"
        component="span"
        title="Gợi ý ứng viên"
      >
        <ShowChartOutlinedIcon />
      </IconButton>
      <IconButton
        // color="secondary"
        aria-label="edit"
        component="span"
        title="Xóa Job"
        onClick={handleDeleteJob}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default CompanyControlJob;

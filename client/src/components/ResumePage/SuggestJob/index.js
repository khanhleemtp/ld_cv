import React, { useEffect } from 'react';
import { getSuggestJob, jobSelector } from '../../../features/Job/JobSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobCard from '../../FindJobPage/JobCard';

const ResumeSuggestJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuggestJob(id));
  }, [dispatch, id]);

  const { suggestJob, isFetching } = useSelector(jobSelector);
  console.log(suggestJob);
  return isFetching ? (
    <div>Loading...</div>
  ) : suggestJob?.rows ? (
    <div
      style={{
        alignSelf: 'flex-start',
        margin: 8,
        maxHeight: 640,
        overflow: 'auto',
      }}
    >
      {suggestJob.rows.map((item) => (
        <JobCard
          item={item}
          key={item._id}
          companyName={item?.company?.company}
          photo={item?.company?.photo}
        />
      ))}
    </div>
  ) : (
    <div>Không có kết quả nào phù hợp</div>
  );
};

export default ResumeSuggestJob;

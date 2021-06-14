import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestCandidate, jobSelector } from '../../features/Job/JobSlice';
import { useParams } from 'react-router-dom';
import CompanyTable from '../../components/CompanyManager/CompanyTable';

const CompanySuggestCandidate = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuggestCandidate(id));
  }, [id, dispatch]);
  const { suggestCv, isFetching } = useSelector(jobSelector);

  return isFetching ? (
    <div>loading...</div>
  ) : (
    <div>
      {suggestCv?.rows && suggestCv?.job && (
        <CompanyTable rows={suggestCv.rows} job={suggestCv?.job} />
      )}
    </div>
  );
};

export default CompanySuggestCandidate;

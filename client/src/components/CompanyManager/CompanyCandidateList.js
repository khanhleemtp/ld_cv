import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applySelector, getApplyById } from '../../features/Apply/ApplySlice';

import CompanyCandidateTable from '../../components/CompanyManager/CompanyCandidateTable';
import { useParams } from 'react-router-dom';

const CompanyCandidateList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplyById(id));
  }, [dispatch, id]);
  const { applies, isFetching } = useSelector(applySelector);

  return isFetching ? (
    <div>loading...</div>
  ) : (
    <div>{applies && <CompanyCandidateTable rows={applies} />}</div>
  );
};

export default CompanyCandidateList;

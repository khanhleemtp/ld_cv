import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  companySelector,
  getCompanyById,
} from '../../features/Company/CompanySlice';
import CompanyJobTable from '../../components/CompanyManager/CompanyJobTable';
import { userSelector } from '../../features/User/UserSlice';

const CompanyJobList = () => {
  const { user } = useSelector(userSelector);
  const companyId = user?.company?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyById(companyId));
  }, [dispatch, companyId]);
  const { company, isFetching } = useSelector(companySelector);

  return isFetching ? (
    <div>loading...</div>
  ) : (
    <div>{company?.jobs && <CompanyJobTable rows={company?.jobs} />}</div>
  );
};

export default CompanyJobList;

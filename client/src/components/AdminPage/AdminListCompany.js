import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  companySelector,
  getAllCompany,
} from '../../features/Company/CompanySlice';
import AdminTable from './AdminTable';

const AdminListCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllCompany({
        query: '?status=accept',
      })
    );
  }, [dispatch]);

  const { companies, isFetching } = useSelector(companySelector);

  return isFetching ? (
    <div>loading...</div>
  ) : (
    <div>{companies && <AdminTable rows={companies} />}</div>
  );
};

export default AdminListCompany;

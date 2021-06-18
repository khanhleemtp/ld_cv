import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteCompany,
  responseCompany,
} from '../../features/Company/CompanySlice';
import Button from '@material-ui/core/Button';
import { useParams, Link, useHistory } from 'react-router-dom';

export const AdminAction = ({ company }) => {
  const { page } = useParams();
  const history = useHistory();
  const userId = company?.user?._id;
  const dispatch = useDispatch();
  const handleResponeCompany = ({ status, companyId }) => {
    return () =>
      dispatch(
        responseCompany({
          status,
          userId,
          companyId,
          cb: () => history.push('/admin/list-company'),
        })
      );
  };

  const handleDeleteCompany = (id) => {
    return () => dispatch(deleteCompany({ id, cb: () => history.go(1) }));
  };

  if (page === 'list-company')
    return (
      <>
        <Link to={`/company/${company._id}`}>Page </Link>
        <Button color="primary" onClick={handleDeleteCompany(company._id)}>
          Xóa
        </Button>
      </>
    );

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleResponeCompany({
          status: 'accept',
          companyId: company._id,
        })}
        style={{
          marginRight: 6,
        }}
      >
        Chấp nhận
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="medium"
        onClick={handleResponeCompany({
          status: 'reject',
          companyId: company._id,
        })}
      >
        Từ chối
      </Button>
    </>
  );
};

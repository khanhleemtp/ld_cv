import React from 'react';
import { useDispatch } from 'react-redux';
import { responseCompany } from '../../features/Company/CompanySlice';
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';

export const AdminAction = ({ company }) => {
  const { page } = useParams();
  const userId = company?.user?._id;
  const dispatch = useDispatch();
  const handleResponeCompany = ({ status, companyId }) => {
    return () => dispatch(responseCompany({ status, userId, companyId }));
  };

  if (page === 'list-company')
    return (
      <>
        <Link to={`/company/${company._id}`}>Page </Link>
        <Button>-----</Button>
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

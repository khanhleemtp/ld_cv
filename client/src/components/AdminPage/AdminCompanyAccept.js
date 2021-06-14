import React, { useEffect } from 'react';
import {
  companySelector,
  getAllCompany,
} from '../../features/Company/CompanySlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminCompanyItem from './AdminCompanyItem';
import Grid from '@material-ui/core/Grid';

const AdminCompanyAccept = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      getAllCompany({
        query: '?status=accept',
      })
    );
  }, [dispatch]);
  const { companies } = useSelector(companySelector);
  return (
    <Grid container>
      {companies.map((company) => (
        <Grid
          item
          key={company._id}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => history.push('/company/' + company._id)}
        >
          <AdminCompanyItem company={company} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminCompanyAccept;

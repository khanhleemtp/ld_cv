import React from 'react';
import { useParams } from 'react-router';
import CompanyUpdateInfo from './CompanyUpdateInfo';
import CreateJob from './CreateJob';

const CompanyManagerPage = () => {
  let { service } = useParams();
  console.log(service);
  if (service === 'create-job') {
    return <CreateJob />;
  }
  if (service === 'update-info') {
    return <CompanyUpdateInfo />;
  }
  return <div>Not found</div>;
};

export default CompanyManagerPage;

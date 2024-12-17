import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthSelector } from '../store/selectors/authSelect';
import { useSelector } from 'react-redux';

interface Props {
  redirectPath: string;
}

export const ProtectedResolver: React.FC<Props> = ({ redirectPath }) => {

  const user = useSelector(AuthSelector.selectUser)

  if (user.id === '') {
    return <Navigate to={redirectPath} />;
  } else {
    return <Outlet />;
  }
};

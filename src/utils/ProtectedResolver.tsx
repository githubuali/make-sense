import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from 'src/store/auth/types';

interface Props {
  redirectPath: string;
  user: User
}

export const ProtectedResolver: React.FC<Props> = ({ redirectPath, user }) => {

  if (user.id === '') {
    return <Navigate to={redirectPath} />;
  } else {
    return <Outlet />;
  }
};

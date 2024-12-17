import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GeneralLoader } from '../views/Common/Loader';
import { validateApi } from '../api/auth';
import { loginFailureAction, loginSuccessAction } from '../store/auth/actionCreators';

interface Props {
  children: React.ReactElement;
}

export const UserResolver: React.FC<Props> = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const dispatch = useDispatch();

  const returnedComponent = useMemo(() => {
    if (isFetchingUser) {
      return <GeneralLoader />;
    }

    return children;
  }, [isFetchingUser, children]);

  useEffect(() => {
    validateApi()
      .then(response => {
        dispatch(loginSuccessAction(response.data))
      })
      .catch((err) => {
        dispatch(loginFailureAction(err.message || 'User not logged'));
      })
      .finally(() => {
        setIsFetchingUser(false);
      });
  }, []);

  return returnedComponent;
};

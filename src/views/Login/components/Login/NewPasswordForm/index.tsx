import React, { useEffect, useState } from 'react';
import { resetPassword } from '../../../api/core';
import { PassRequirements } from '../PassRequirements';
import { SubmitButton } from '../SubmitButton';
import { Form, PassInput, Tick } from './style';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../../api/core';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { requirements, secondPassHandler, validatePassword } from '../../../helpers/passwords';

export const NewPasswordForm: React.FC = () => {
  //VALIDATING TOKEN
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const validatePasswordFromDatabase = async () => {
    await validateToken(queryParameters.get('token')!).then(() => {
      navigate('/new-password');
    });
    // .catch(() => navigate('/login'));
  };

  useEffect(() => {
    setToken(queryParameters.get('token')!);
    validatePasswordFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boolean state to check if passwords comply with every requirement
  const [passValidated, setPassValidated] = useState<boolean>(false);

  //array that saves ONLY validated requirements
  const [validationArr, setValidationArr] = useState<Array<string>>([]);

  //Saves password in the first input for comparison with second password
  const [firstPass, setFirstPass] = useState<string>('');

  //Saves password in the second input for comparison with first password
  const [secondPass, setSecondPass] = useState<string>('');

  //If every requirement is completed passValidation variable switches to true and enables confirm button
  useEffect(() => {
    if (
      requirements.every(requirement => {
        return validationArr.includes(requirement.type);
      })
    ) {
      setPassValidated(true);
    } else {
      setPassValidated(false);
    }
  }, [validationArr]);

  const createNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(token!, { password: firstPass })
      .then(() => {
        Swal.fire({
          title: 'Password updated',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/login'));
      })
      .catch(err => {
        Swal.fire({
          title: 'Something went wrong',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      });
  };

  //SHOW PASSWORD HANDLERS -----------------------------------------------------

  const [show1, setShow1] = useState(false);

  const [show2, setShow2] = useState(false);

  return (
    <Form onSubmit={e => createNewPassword(e)}>
      <PassInput validated={passValidated}>
        <p>New password:</p>
        <div>
          <input
            placeholder="Enter Password"
            type={show1 ? 'text' : 'password'}
            autoComplete="off"
            onChange={e =>
              validatePassword(e.target.value, setFirstPass, secondPass, setValidationArr)
            }
          />
          {passValidated && <Tick src="./tick-circle.png" />}
          <img
            alt="eye"
            src={show1 ? './eye-slash.png' : './eye.png'}
            onClick={() => setShow1(!show1)}
          />
        </div>
      </PassInput>
      <PassInput validated={passValidated}>
        <p>Confirm password:</p>
        <div>
          <input
            placeholder="Repeat Password"
            type={show2 ? 'text' : 'password'}
            autoComplete="off"
            onChange={e =>
              secondPassHandler(
                e.target.value,
                validationArr,
                setSecondPass,
                firstPass,
                setValidationArr,
              )
            }
          />
          {passValidated && <Tick src="./tick-circle.png" />}
          <img
            alt="eye"
            src={show2 ? './eye-slash.png' : './eye.png'}
            onClick={() => setShow2(!show2)}
          />
        </div>
      </PassInput>

      <PassRequirements requirements={requirements} validations={validationArr} />

      <SubmitButton text="Set new password" disabled={!passValidated} />
    </Form>
  );
};

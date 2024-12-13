import React, { useEffect, useState } from 'react';
import { BackContainer, Container, MailInput, Title } from './style';
import { SubmitButton } from '../SubmitButton';
import { SideArrow } from '../../../assets/sideArrow';
import { recoverPassword } from '../../../api/core';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../../layouts/Login/Login';
import Swal from 'sweetalert2';
import { emailCheck } from '../../../helpers/fieldValidations';
import { BackdropLoader } from '../../../assets/BackdropLoader';
import { FormContainer, Icon, TopImg } from '../DataContainer/style';
import { Input } from 'antd';
import { getIcons } from '../../../assets/iconManger';

export const RecoverContainer: React.FC = () => {
  const [filled, setFilled] = useState<boolean>(false);
  const [displayAlert, setDisplayAlert] = useState(false);

  const navigate = useNavigate();
  const [mail, setMail] = useState({
    value: '',
  });

  const handleChangeMail = (mail: string) => {
    setMail({ value: mail });

    if (emailCheck(mail)) {
      setFilled(false);
    } else {
      setFilled(true);
    }
  };

  useEffect(() => {
    if (displayAlert) {
      Swal.fire({
        title: 'Recovery email sent',
        icon: 'success',
        confirmButtonColor: '#df1174',
        customClass: {
          container: 'my-swal',
        },
      }).then(() => {
        setDisplayAlert(false);
        navigate('/login');
      });
    }
  }, [displayAlert]);

  const [loader, setLoader] = useState(false);

  const recoverPasswordButton = (mail: string) => {
    setLoader(true);
    recoverPassword({ email: mail })
      .then(() => {
        setLoader(false);
        setDisplayAlert(true);
      })
      .catch(() => {
        setLoader(false);
        //For security purposes send the user a confirmation alert either way
        setDisplayAlert(true);
      });
  };

  const component = (
    <>
      {loader && <BackdropLoader />}
      <Container>
        <TopImg src="./login_top.png" />
        <FormContainer>
          <Icon>{getIcons('uali-icon')}</Icon>
          <Title>Set New Password.</Title>

          <MailInput>
            <p>Email address:</p>
            <Input
              placeholder="Enter Account email"
              value={mail.value}
              onChange={e => handleChangeMail(e.target.value)}
              height={'45px'}
            />
          </MailInput>

          <div onClick={() => recoverPasswordButton(mail.value)}>
            <SubmitButton text="Send code to email" disabled={filled || mail.value === ''} />
          </div>

          <BackContainer onClick={() => navigate('/login')}>
            <SideArrow />
            <p>Go back to login</p>
          </BackContainer>
        </FormContainer>
      </Container>
    </>
  );

  return <Login children={component} />;
};

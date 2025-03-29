import React, { useState } from "react"
import { Layout } from "../../components/layout"
import { Card, Form, Row, Space, Typography } from "antd"
import { CustomInput } from "../../components/custom-input"
import { PasswordInput } from "../../components/password-input"
import { CustomButton } from "../../components/custom-button"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../paths"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useRegisterMutation } from "../../app/services/auth"
import { User } from "@prisma/client"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import { ErrorMessage } from "../../components/errorMessage"

type RegiserData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  const regiser = async (data: RegiserData) => {
    try {
      await registerUser(data).unwrap();

      navigate(Paths.home);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }
  
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={regiser}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirm-password" placeholder="Пароль еще раз" dependencies={['password']}/>
            <CustomButton type="primary" htmltype="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large" style={{marginTop: '30px'}}>
            <Typography.Text>
              Уже зарегистрировались? <Link to={Paths.login}>Войти</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

import React from "react"
import { Layout } from "../../components/layout"
import { Card, Form, Row, Space, Typography } from "antd"
import { CustomInput } from "../../components/custom-input"
import { PasswordInput } from "../../components/password-input"
import { CustomButton } from "../../components/custom-button"
import { Link } from "react-router-dom"
import { Paths } from "../../paths"

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirm-password" placeholder="Пароль еще раз" dependencies={['password']}/>
            <CustomButton type="primary" htmltype="submit">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large" style={{marginTop: '30px'}}>
            <Typography.Text>
              Уже зарегистрировались? <Link to={Paths.login}>Войти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

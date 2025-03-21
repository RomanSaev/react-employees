import { Button, Layout, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { CustomButton } from '../custom-button'
import { Paths } from '../../paths'
import styles from './index.module.css'

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
        <Space style={{ lineHeight: 'initial'}}>
            <TeamOutlined className={styles.teamicon} />
            <Link to={Paths.home}>
                <CustomButton type="default">
                    <Typography.Title level={1} style={{marginBottom: 0, fontSize: '26px'}}>Сотрудники</Typography.Title>
                </CustomButton>
            </Link>
        </Space>
        <Space style={{ lineHeight: 'initial'}}>
        <Link to={Paths.register}>
          <CustomButton type="default" icon={<UserOutlined/>}>Зарегистрироваться</CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="default" icon={<LoginOutlined/>}>Войти</CustomButton>
        </Link>
        </Space>
    </Layout.Header>
  )
}

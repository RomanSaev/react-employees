import { Button, Layout, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { CustomButton } from '../custom-button'
import { Paths } from '../../paths'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login)
  }

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
        {
          user ? (
            <CustomButton
              type="default"
              icon={ <LogoutOutlined />}
              onClick={onLogoutClick}
              >
                Выйти
              </CustomButton>
          ) : (
            <Space style={{ lineHeight: 'initial'}}>
              <Link to={Paths.register}>
                <CustomButton type="default" icon={<UserOutlined/>}>Зарегистрироваться</CustomButton>
              </Link>
              <Link to={Paths.login}>
                <CustomButton type="default" icon={<LoginOutlined/>}>Войти</CustomButton>
              </Link>
            </Space>
          )
        }
        
    </Layout.Header>
  )
}

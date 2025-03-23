import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath
}

export const PasswordInput = ({
    name,
    placeholder,
    dependencies
}: Props) => {
  return (
    <Form.Item
        name={name}
        dependencies={dependencies}
        hasFeedback//hasFeedback={true}
        rules={[{
            required: true,
            message: 'Обязательное поле',
        }, ({getFieldValue}) => {
            return {
                validator(_, value) {
                    if(!value) {
                        return Promise.resolve()
                    }
                    if (name === 'confirm-password') {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                        }

                        return Promise.reject(new Error('Пароли не совпадают'))
                    } else {
                        if (value.length < 6) {
                            return Promise.reject(new Error('Пароль должен быть в длину не менее 6 символов'))
                        }

                        return Promise.resolve()
                    }
                }
            }
        }]}
    >
        <Input.Password placeholder={placeholder} size="large"/>
    </Form.Item>
  )
}

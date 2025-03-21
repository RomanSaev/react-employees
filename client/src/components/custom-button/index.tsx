import { Button, Form } from "antd"

type Props = {
    children : React.ReactNode;
    htmltype?: "button" | "submit" | "reset" | undefined;
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
    danger?: boolean;
    loading?: boolean;
    shape?: "default" | "circle" | "round" | undefined;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const CustomButton = ({
    children,
    htmltype = 'button',
    type,
    danger,
    loading,
    shape,
    icon,
    onClick
} : Props) => {
  return (
    <Form.Item noStyle>
        <Button
            htmlType={htmltype}
            type={type}
            danger={danger}
            loading={loading}
            shape={shape}
            icon={icon}
            onClick={onClick}
        >
            {children}
        </Button>
    </Form.Item>
  )
}

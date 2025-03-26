import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../errorMessage";
import { CustomButton } from "../custom-button";

type Props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

export const EmployeeForm = ({
    onFinish,
    title,
    btnText,
    error,
    employee
} : Props<Employee>) => {
    return (
        <Card title={title} style={{width: '30rem'}}>
           <Form
            name="employee-form"
            onFinish={onFinish}
            initialValues={employee}
           >
                <CustomInput type="test" name="firstName" placeholder="Имя"/>
                <CustomInput type="test" name="lastName" placeholder="Фамилия"/>
                <CustomInput type="number" name="age" placeholder="Возраст"/>
                <CustomInput type="text" name="address" placeholder="Адрес"/>
                <Space>
                    <ErrorMessage message={error}></ErrorMessage>
                    <CustomButton htmltype="submit">
                        {btnText}
                    </CustomButton>
                </Space>
            </Form> 
        </Card>
    )
}

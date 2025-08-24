
import { Divider, FormProps } from 'antd';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import './register.scss'
import { Link } from 'react-router-dom';


type FieldType = {
    fullname: string;
    email: string;
    password: string;
    phone: string;
};

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <div className='register-page'>
                <main className='main'>
                    <div className='container'>
                        <section className='wrapper'>
                            <div className='heading'>
                                <h2 className='text text-large'>Đăng ký tài khoản</h2>
                                <Divider />
                            </div>

                            <Form
                                name="form-register"
                                onFinish={onFinish}
                                autoComplete='off'
                            >
                                <Form.Item<FieldType>
                                    labelCol={{ span: 24 }} //Whole column
                                    label="Họ tên"
                                    name="fullname"
                                    rules={[{
                                        required: true,
                                        message: 'Họ tên không được để trống!'
                                    }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    labelCol={{ span: 24 }} //Whole column
                                    label="email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Email không được để trống!' },
                                        { type: "email", message: "Email không đúng định dạng" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    labelCol={{ span: 24 }} //Whole column
                                    label="password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Password không được để trống!' },
                                        { min: 6, message: 'Tối thiểu 6 ký tự' }
                                    ]}

                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    labelCol={{ span: 24 }} //Whole column
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{
                                        required: true,
                                        message: 'Số điện thoại không được để trống!'
                                    }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item>
                                    <Button type='primary' htmlType='submit' loading={isSubmit}>
                                        Đăng ký
                                    </Button>
                                </Form.Item>

                                <Divider>Or</Divider>

                                <p className='text text-normal' style={{ textAlign: "center" }}>
                                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                                </p>
                            </Form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default RegisterPage;
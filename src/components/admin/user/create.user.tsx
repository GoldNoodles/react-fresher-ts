import { createUserAPI } from "@/services/api";
import { App, Divider, Input, Modal, Form } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";

interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    refreshTable: () => void;
}

type FieldType = {
    fullName: string;
    password: string;
    email: string;
    phone: string;
};

const CreateUser = (props: IProps) => {
    const { openModalCreate, setOpenModalCreate, refreshTable } = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { message, notification } = App.useApp();

    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const { fullName, password, email, phone } = values;
        setIsSubmit(true);
        const res = await createUserAPI(fullName, password, email, phone);

        if (res && res.data) {
            message.success("Tạo mới user thành công");
            form.resetFields();//clead data trên modal 
            setOpenModalCreate(false);//đóng modal 
            refreshTable();//resetData 
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message,
            })
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModalCreate}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpenModalCreate(false);
                    form.resetFields();
                }}
                okText="Tạo mới"
                cancelText="Hủy"
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Vui lòng nhập đúng định dạng!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập Số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUser;

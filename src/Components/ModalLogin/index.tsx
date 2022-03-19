/* eslint-disable no-template-curly-in-string */
import { Form, Input, Modal } from "antd";
import React from "react";

type IModalLoginProps = {
  title: "login" | "registration";
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export const ModalLogin: React.FC<IModalLoginProps> = React.memo(
  function ModalLogin({ title, visible, onOk, onCancel }) {
    const [form] = Form.useForm();

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid!",
        password: "'${label}' must be at least ${min} characters",
      },
    };

    const onFormFinish = () => {
      form.submit();
      form
        .validateFields()
        .then(() => onOk())
        .catch((e) => console.log(e));
    };

    return (
      <Modal
        title={title === "login" ? "Вход" : "Регистрация"}
        visible={visible}
        onOk={onFormFinish}
        onCancel={onCancel}
      >
        <Form
          form={form}
          {...layout}
          name="userForm"
          validateMessages={validateMessages}
        >
          {title === "registration" && (
            <Form.Item
              name="name"
              label="Имя"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

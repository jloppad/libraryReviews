import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Username"}
          name={["username"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
              type: 'email',
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={["password"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={"Authentication"}
          name={["authentication"]}
          initialValue={0}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={0}
            options={[
              { value: 0, label: "Not authenticated" },
              { value: 1, label: "Authenticated" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item
          label={"Admin"}
          name={["admin"]}
          initialValue={0}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={0}
            options={[
              { value: 0, label: "User" },
              { value: 1, label: "Admin" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

  const userData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
          <Input defaultValue={userData?.username} />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input defaultValue={userData?.email} />
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
          initialValue={userData?.authentication}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={userData?.authentication}
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
          initialValue={userData?.admin}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={userData?.admin}
            options={[
              { value: 0, label: "User" },
              { value: 1, label: "Admin" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};

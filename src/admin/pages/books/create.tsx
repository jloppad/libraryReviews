import { Create, useForm } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { useList } from "@refinedev/core"; 

export const BookCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { data: userData, isLoading: isUserLoading } = useList({
    resource: "users",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Author"}
          name={["author"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Cover Image URL"} name={["cover"]}>
          <Input />
        </Form.Item>
        <Form.Item label={"Introduction"} name={["intro"]}>
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label={"Review"} name={["review"]}>
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item
          label={"Completed"}
          name={["completed"]}
          initialValue={null}
        >
          <Select
            options={[
              { value: 1, label: "Completed" },
              { value: 0, label: "Not Completed" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item
          label={"User"}
          name={["userId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            loading={isUserLoading} 
            options={userData?.data?.map((user) => ({
              value: user.id,
              label: user.username, 
            }))}
          />
        </Form.Item>
        <Form.Item
          label={"Average Rating"}
          name={["averageRating"]}
          initialValue={0.0}
        >
          <Input type="number" step="0.01" />
        </Form.Item>
      </Form>
    </Create>
  );
};

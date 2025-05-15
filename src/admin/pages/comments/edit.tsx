import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useList } from "@refinedev/core";

export const CommentEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { data: userData, isLoading: isUserLoading } = useList({
    resource: "users",
  });

  const { data: bookData, isLoading: isBookLoading } = useList({
    resource: "books",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Comment"
          name={["comment"]}
          rules={[{ required: true, message: "Please enter a comment" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="User"
          name={["userId"]}
          rules={[{ required: true }]}
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
          label="Book"
          name={["bookId"]}
          rules={[{ required: true }]}
        >
          <Select
            loading={isBookLoading}
            options={bookData?.data?.map((book) => ({
              value: book.id,
              label: book.title,
            }))}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};

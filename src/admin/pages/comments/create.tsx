import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useList } from "@refinedev/core";

export const CommentCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { data: userData, isLoading: isUserLoading } = useList({
    resource: "users",
  });

  const { data: bookData, isLoading: isBookLoading } = useList({
    resource: "books",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Comment"
          name={["comment"]}
          rules={[{ required: true, message: "Please enter a comment" }]}
        >
          <Input.TextArea rows={4} placeholder="Write your comment here..." />
        </Form.Item>

        <Form.Item
          label="User"
          name={["userId"]}
          rules={[{ required: true, message: "Please select a user" }]}
        >
          <Select
            loading={isUserLoading}
            options={userData?.data?.map((user) => ({
              value: user.id,
              label: user.username,
            }))}
            placeholder="Select a user"
          />
        </Form.Item>

        <Form.Item
          label="Book"
          name={["bookId"]}
          rules={[{ required: true, message: "Please select a book" }]}
        >
          <Select
            loading={isBookLoading}
            options={bookData?.data?.map((book) => ({
              value: book.id,
              label: book.title,
            }))}
            placeholder="Select a book"
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

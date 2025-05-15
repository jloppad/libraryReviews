import { Edit, useForm } from "@refinedev/antd";
import { Form, Select } from "antd";
import { useList } from "@refinedev/core";

export const RatingEdit = () => {
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
          label="Rating"
          name={["value"]}
          rules={[{ required: true, message: "Please select a rating between 1 and 5" }]}
        >
          <Select
            options={[1, 2, 3, 4, 5].map((value) => ({
              value,
              label: value.toString(),
            }))}
          />
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

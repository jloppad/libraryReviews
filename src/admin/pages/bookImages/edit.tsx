import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useList } from "@refinedev/core";

export const BookImageEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { data: bookData, isLoading: isBookLoading } = useList({
    resource: "books",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Image URL"
          name={["image_url"]}
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Book"
          name={["book_id"]}
          rules={[{ required: true }]}
        >
          <Select
            loading={isBookLoading}
            disabled
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

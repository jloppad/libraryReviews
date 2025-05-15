import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useList } from "@refinedev/core";

export const BookImageCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { data: bookData, isLoading: isBookLoading } = useList({
    resource: "books",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Image URL"
          name={["imageUrl"]}
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input placeholder="Enter the image URL" />
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

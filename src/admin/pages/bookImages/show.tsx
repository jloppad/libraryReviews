import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const BookImageShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: bookData, isLoading: bookLoading } = useOne({
    resource: "books",
    id: record?.book_id || "",
    queryOptions: {
      enabled: !!record?.book_id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Book</Title>
      <TextField value={bookLoading ? "Loading..." : bookData?.data?.title} />

      <Title level={5}>Image URL</Title>
      <TextField value={record?.image_url} />

    </Show>
  );
};

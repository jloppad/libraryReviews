import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const RatingShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: userData, isLoading: userLoading } = useOne({
    resource: "users",
    id: record?.userId || "",
    queryOptions: {
      enabled: !!record?.userId,
    },
  });

  const { data: bookData, isLoading: bookLoading } = useOne({
    resource: "books",
    id: record?.bookId || "",
    queryOptions: {
      enabled: !!record?.bookId,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>User</Title>
      <TextField value={userLoading ? "Loading..." : userData?.data?.username} />

      <Title level={5}>Book</Title>
      <TextField value={bookLoading ? "Loading..." : bookData?.data?.title} />

      <Title level={5}>Rating</Title>
      <TextField value={record?.value} />
    </Show>
  );
};

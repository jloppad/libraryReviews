import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const BookShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: userData, isLoading: userLoading } = useOne({
    resource: "users", 
    id: record?.userId || "", 
    queryOptions: {
      enabled: !!record?.userId,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Title</Title>
      <TextField value={record?.title} />

      <Title level={5}>Author</Title>
      <TextField value={record?.author} />

      <Title level={5}>Cover</Title>
      <TextField value={record?.cover} />

      <Title level={5}>Introduction</Title>
      <TextField value={record?.intro} />

      <Title level={5}>Review</Title>
      <TextField value={record?.review} />

      <Title level={5}>Completed</Title>
      <TextField value={record?.completed ? "Yes" : "No"} />

      <Title level={5}>User</Title>
      <TextField value={userLoading ? "Loading..." : userData?.data?.username} />

      <Title level={5}>Average Rating</Title>
      <TextField value={record?.averageRating} />
    </Show>
  );
};

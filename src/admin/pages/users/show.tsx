import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Username"}</Title>
      <TextField value={record?.username} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Authentication"}</Title>
      <TextField value={record?.authentication === 1 ? "Authenticated" : "Not Authenticated"} />
      <Title level={5}>{"Role"}</Title>
      <TextField value={record?.admin === 1 ? "Admin" : "User"} />
    </Show>
  );
};

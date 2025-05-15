import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const UserList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="username" title={"Username"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column
          dataIndex="authentication"
          title={"Authentication"}
          render={(value) => (value === 1 ? "Authenticated" : "Not Authenticated")}
        />
        <Table.Column
          dataIndex="admin"
          title={"Role"}
          render={(value) => (value === 1 ? "Admin" : "User")}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const BookList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const userIds = tableProps?.dataSource?.map((item) => item?.userId).filter(Boolean) ?? [];

  const { data: userData, isLoading: userLoading } = useMany({
    resource: "users",
    ids: userIds,
    queryOptions: {
      enabled: userIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Título" />
        <Table.Column dataIndex="author" title="Autor" />
        <Table.Column dataIndex="cover" title="Portada" />
        <Table.Column dataIndex="intro" title="Intro" />
        <Table.Column dataIndex="review" title="Review" />
        <Table.Column dataIndex="completed" title="Completed" />
        <Table.Column
          dataIndex="userId"
          title="Usuario"
          render={(userId) => {
            if (userLoading) {
              return "Cargando...";
            }

            const user = userData?.data?.find((user) => user.id === userId);
            return user ? user.username : "Usuario no encontrado";
          }}
        />
        <Table.Column dataIndex="averageRating" title="Average Rating" />
        <Table.Column
          title="Acciones"
          dataIndex="actions"
          render={(_, record) => (
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

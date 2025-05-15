import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const CommentList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "comments",
  });

  const userIds =
    tableProps?.dataSource?.map((item) => item?.userId).filter(Boolean) ?? [];
  const bookIds =
    tableProps?.dataSource?.map((item) => item?.bookId).filter(Boolean) ?? [];

  const { data: userData, isLoading: userLoading } = useMany({
    resource: "users",
    ids: userIds,
    queryOptions: {
      enabled: userIds.length > 0,
    },
  });

  const { data: bookData, isLoading: bookLoading } = useMany({
    resource: "books",
    ids: bookIds,
    queryOptions: {
      enabled: bookIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex="bookId"
          title="Libro"
          render={(bookId) => {
            if (bookLoading) return "Cargando...";
            const book = bookData?.data?.find((b) => b.id === bookId);
            return book ? book.title : "Libro no encontrado";
          }}
        />
        <Table.Column
          dataIndex="userId"
          title="Usuario"
          render={(userId) => {
            if (userLoading) return "Cargando...";
            const user = userData?.data?.find((u) => u.id === userId);
            return user ? user.username : "Usuario no encontrado";
          }}
        />
        <Table.Column dataIndex="comment" title="Comentario" />
        <Table.Column
          dataIndex="createdAt"
          title="Fecha de creación"
          render={(value: string) => new Date(value).toLocaleString()}
        />
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

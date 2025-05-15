import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const BookImageList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const bookIds = tableProps?.dataSource?.map((item) => item?.book_id).filter(Boolean) ?? [];

  const { data: booksData, isLoading: booksLoading } = useMany({
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
          dataIndex="book_id"
          title="Libro"
          render={(bookId) => {
            if (booksLoading) {
              return "Cargando...";
            }

            const book = booksData?.data?.find((book) => book.id === bookId);
            return book ? book.title : "Libro no encontrado";
          }}
        />

        <Table.Column dataIndex="image_url" title="URL de la imagen" />
        
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

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const RatingList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "ratings",
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
          title="Book"
          render={(bookId) => {
            if (bookLoading) return "Loading...";
            const book = bookData?.data?.find((b) => b.id === bookId);
            return book ? book.title : "Book not found";
          }}
        />
        <Table.Column
          dataIndex="userId"
          title="User"
          render={(userId) => {
            if (userLoading) return "Loading...";
            const user = userData?.data?.find((u) => u.id === userId);
            return user ? user.username : "User not found";
          }}
        />
        <Table.Column dataIndex="value" title="Rating" />
        <Table.Column
          title="Actions"
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

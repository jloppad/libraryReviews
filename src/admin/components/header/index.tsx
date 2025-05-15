import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Space,
  theme,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
      </Space>
      <Link to="/">
        <Button type="primary">
            Volver a la aplicación
        </Button>
      </Link>
    </AntdLayout.Header>
  );
};

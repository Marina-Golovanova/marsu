import React from "react";
import { Menu as MenuPanel } from "antd";
import { ReadOutlined, DatabaseOutlined } from "@ant-design/icons";

type IMenuItem = "dictionary" | "statistics" | "words";

type IMenuTree = {
  item: IMenuItem;
  title: string;
  children: IMenuTree[];
  icon?: React.ReactElement;
};

const menuItems: IMenuTree[] = [
  {
    item: "dictionary",
    title: "словарь",
    children: [
      {
        item: "words",
        title: "слова",
        children: [],
      },
    ],
    icon: <ReadOutlined />,
  },
  {
    item: "statistics",
    title: "статистика",
    children: [],
    icon: <DatabaseOutlined />,
  },
];

const { SubMenu } = MenuPanel;

export const Menu: React.FC = React.memo(function Menu() {
  const [openKeys, setOpenKeys] = React.useState<string[]>([menuItems[0].item]);

  const onOpenChange = React.useCallback(
    (keys: string[]) => {
      const latestOpenKey = keys.find((key) => !openKeys.includes(key));
      if (latestOpenKey) {
        setOpenKeys([latestOpenKey]);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    },
    [openKeys]
  );

  return (
    <MenuPanel
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      {menuItems.map((el) =>
        el.children.length ? (
          <SubMenu key={el.item} icon={el.icon} title={el.title}>
            {el.children.map((it) => (
              <MenuPanel.Item key={it.item}>{it.title}</MenuPanel.Item>
            ))}
          </SubMenu>
        ) : (
          <MenuPanel.Item key={el.item} icon={el.icon}>
            {el.title}
          </MenuPanel.Item>
        )
      )}
    </MenuPanel>
  );
});

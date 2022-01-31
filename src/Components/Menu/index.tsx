import React from "react";
import { Menu as MenuPanel } from "antd";
import { ReadOutlined, DatabaseOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

type IMenuTree = {
  item: string;
  title: string;
  children: IMenuTree[];
  icon?: React.ReactElement;
};

const menuItems: IMenuTree[] = [
  {
    item: "dictionary",
    title: "словарь",
    children: [],
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
  const { pathname } = useLocation();

  return (
    <MenuPanel
      mode="inline"
      selectedKeys={[pathname.slice(1)]}
      style={{ width: 256 }}
      className={styles.menu}
    >
      {menuItems.map((el) =>
        el.children.length ? (
          <SubMenu key={el.item} icon={el.icon} title={el.title}>
            {el.children.map((it) => (
              <MenuPanel.Item key={it.item}>
                <NavLink to={it.item}>{it.title}</NavLink>
              </MenuPanel.Item>
            ))}
          </SubMenu>
        ) : (
          <MenuPanel.Item key={el.item} icon={el.icon}>
            <NavLink to={el.item}>{el.title}</NavLink>
          </MenuPanel.Item>
        )
      )}
    </MenuPanel>
  );
});

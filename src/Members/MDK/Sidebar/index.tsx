import React from "react";
import {
  PieChartOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Avatar, MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <Avatar
      size="large"
      style={{
        backgroundColor: "#F4F6F9",
        color: "#F1AC4D",
        fontSize: 25,
        fontWeight: "800",
        width: 98,
        height: 64,
        lineHeight: "64px",
        borderRadius: "32px",
      }}
    >
      DTD
    </Avatar>,
    "Avatar"
  ),
  getItem(
    <PieChartOutlined
      style={{ fontSize: 30, transform: "translateX(30px)" }}
    />,
    "Home"
  ),
  getItem(
    <UsergroupAddOutlined
      style={{ fontSize: 30, transform: "translateX(30px)" }}
    />,
    "Group"
  ),
  getItem(
    <FileTextOutlined
      style={{ fontSize: 30, transform: "translateX(30px)" }}
    />,
    "File"
  ),
];

const Sidebar = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 240,
        height: "100%",
        backgroundColor: "#fff",
      }}
      className="border-gray-300"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;

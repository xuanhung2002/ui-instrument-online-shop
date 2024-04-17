import React from "react";
import { Avatar, Badge, Button, Col, Dropdown, Row, Space } from "antd";
import {
  BellOutlined,
  DownOutlined,
  FormOutlined,
  MessageOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function HeaderItemComponent() {
  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col >
          <Button type="text" size="large">
            <BellOutlined  style={{ fontSize: '25px' }} />
          </Button>
        </Col>
        <Col >
          <Button type="text" size="large">
          <Badge count={10} overflowCount={99} size="small" style={{borderRadius:"10px" ,paddingLeft:"5px", paddingRight:"5px", marginTop: '3px', marginRight: '-3px' }}>
              <ShoppingCartOutlined style={{ fontSize: '25px' }} />
            </Badge>
          </Button>
        </Col>
        <Col >
          <Button type="text" size="large">
            <MessageOutlined  style={{ fontSize: '25px' }} />
          </Button>
        </Col>
        <Col >
          <Button type="text" size="large">
            <ProfileOutlined  style={{ fontSize: '25px' }} />
          </Button>
        </Col>
        <Col style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
          <a type="button" style={{ marginLeft: "auto" }}>
            <Dropdown menu={menuProps} placement="bottomRight">
              <Space>
                <Avatar size={"small"} icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </Dropdown>
          </a>
        </Col>
      </Row>
    </div>
  );
}

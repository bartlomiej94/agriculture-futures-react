import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { Divider, Menu, Space, Typography } from "antd";
import { RouteStrings } from "../../../../../Routes";

import { BellOutlined, GlobalOutlined, PieChartOutlined, ShopOutlined, StockOutlined } from "@ant-design/icons";
import styles from "./SideMenu.module.scss";

const SideMenu: React.FC<any> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDashboard = location.pathname.startsWith(RouteStrings.Dashboard);

    if (!isDashboard) return null;

    const menuItems = [
        {
            title: "Assets",
            icon: <PieChartOutlined />,
            path: RouteStrings.Dashboard,
        },
        {
            title: "Markets",
            icon: <StockOutlined />,
            path: RouteStrings.MarketsPage,
        },
        {
            title: "Orders",
            icon: <ShopOutlined />,
            path: null,
        },
        {
            title: "Logistics",
            icon: <GlobalOutlined />,
            path: null,
        },
        {
            title: "Notifications",
            icon: <BellOutlined />,
            path: null,
        },
    ];

    return (
        <div className={styles.container}>
            <Space direction="vertical">
                {isDashboard && (
                    <Typography.Title level={2} className="agriax-green">
                        agriax
                    </Typography.Title>
                )}
            </Space>
            <Divider style={{ marginTop: "-1px", marginBottom: 0 }} />

            <Menu mode="inline" style={{ width: "100%" }}>
                {menuItems.map((item, idx) => (
                    <>
                        <Menu.Item
                            key={idx}
                            style={{ margin: 0, height: "64px", fontSize: "16px" }}
                            className={location.pathname === item.path && "ant-menu-item-selected"}
                            icon={item.icon}
                            onClick={() => navigate(item.path)}
                        >
                            {item.title}
                        </Menu.Item>
                        <Menu.Divider />
                    </>
                ))}
            </Menu>
        </div>
    );
};

export default SideMenu;
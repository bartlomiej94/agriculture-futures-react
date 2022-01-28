import * as React from "react";

import { Avatar, Button, Menu, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteStrings } from "../../../../Routes";

import { getAuthId, logoutUser } from "../../../storage/LocalAuthManager";


import { AuditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const Header: React.FC<any> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isAuthed, setIsAuthed] = React.useState<boolean>(false);

    const isDashboard = location.pathname.startsWith(RouteStrings.Dashboard);

    React.useEffect(() => {
        setIsAuthed(!!getAuthId());
    }, [location]);

    if (location.pathname.startsWith(RouteStrings.LoginPage)) {
        return null;
    };

    return (
        <div className={[styles.container, isDashboard && styles.dashboard].join(" ")}>
            {!isDashboard && (
                <Typography.Title level={2} className={styles.logo}>
                    agriax
                </Typography.Title>
            )}
            <Space size={48}>
                <Typography.Text className={styles.title}>
                    Learn
                </Typography.Text>
                <Typography.Text className={styles.title}>
                    Sellers
                </Typography.Text>
                <Typography.Text className={styles.title}>
                    Buyers
                </Typography.Text>
                <Typography.Text className={styles.title}>
                    Company
                </Typography.Text>
                <Typography.Text className={styles.title}>
                    Investors
                </Typography.Text>
            </Space>
            
            {!isAuthed && (
                <div className={[styles.buttonsGroup, isAuthed && styles.authed].join(" ")}>
                        <Space size={24}>
                            <Typography.Text
                                className={styles.title}
                                onClick={() => navigate(RouteStrings.LoginPage)}
                            >
                                {t("actions:signIn")}
                            </Typography.Text>
                            <Button
                                type="primary"
                                onClick={() => navigate(RouteStrings.ApplicationFlowStepContactInfo)}
                            >
                                {t("buttons:start")}
                            </Button>
                        </Space>
                </div>
            )}
        </div>
    );
};

export default Header;
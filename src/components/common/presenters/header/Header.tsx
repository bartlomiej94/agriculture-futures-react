import * as React from "react";

import { Avatar, Button, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteStrings } from "../../../../Routes";

import { LocalAuthManager } from "../../../storage/LocalAuthManager";

import { UserOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const Header: React.FC<any> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isAuthed, setIsAuthed] = React.useState<boolean>(false);

    React.useEffect(() => {
        const authManager = new LocalAuthManager();
        const auth = authManager.get();

        if (auth.id && auth.email) {
            setIsAuthed(true);
        };
    }, [location]);

    return (
        <div className={styles.container}>
            <Typography.Title level={2} className={styles.logo}>
                agriax
            </Typography.Title>
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
            
            <div className={styles.buttonsGroup}>
                {isAuthed ? (
                    <Avatar className={styles.avatar} size={40} icon={<UserOutlined />} />
                ) : (
                    <Space size={24}>
                        <Typography.Text className={styles.title}>
                            {t("actions:signIn")}
                        </Typography.Text>
                        <Button
                            type="primary"
                            onClick={() => navigate(RouteStrings.ApplicationFlowStepContactInfo)}
                        >
                            {t("buttons:start")}
                        </Button>
                    </Space>
                )}
            </div>
        </div>
    );
};

export default Header;
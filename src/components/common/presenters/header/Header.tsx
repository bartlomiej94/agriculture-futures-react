import * as React from "react";

import { Button, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RouteStrings } from "../../../../Routes";

import styles from "./Header.module.scss";

const Header: React.FC<any> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
        </div>
    );
};

export default Header;
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Space, Typography } from "antd";

import { RouteStrings } from "../../../../Routes";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./BackButton.module.scss";

interface Props {
    to: RouteStrings
};

const BackButton: React.FC<Props> = ({ to }: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Space
            className={styles.container}
            onClick={() => navigate(to)}
        >
            <Typography.Text type="secondary">
                <ArrowLeftOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">
                {t("common:back")}
            </Typography.Text>
        </Space>
    );
};

export default BackButton;
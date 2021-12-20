import * as React from "react";

import { Divider, Space, Steps, Typography } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import styles from "./Stepper.module.scss";

interface Props {
    current: string
    steps: string[]
    titles: string[]
    icons: JSX.Element[]
};

const Stepper: React.FC<Props> = ({ current, steps, titles, icons }: Props) => {
    const { t } = useTranslation();
    const { Step } = Steps;

    const stepIdx = steps.indexOf(current);
    const title = titles[stepIdx];

    return (
        <div className={styles.container}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Steps size="small" current={stepIdx}>
                    {steps.map((_, idx) => (
                        <Step key={idx} icon={idx < stepIdx ? <CheckCircleOutlined /> : icons[idx]} />
                    ))}
                </Steps>
                <Typography.Text type="secondary">
                    {t("common:step")} {stepIdx + 1}/{titles.length}
                </Typography.Text>
            </Space>
            <Typography.Title level={3}>
                {title}
            </Typography.Title>
            <Divider />
        </div>
    );
};

export default Stepper;
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Form, Input, Space, Table, Typography, Upload } from "antd";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@ant-design/icons";

import styles from "../ApplicationFlow.module.scss";

const ApplicationStepDocuments: React.FC<any> = () => {
    const { t } = useTranslation();
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/");
    };

    const columns = [
        {
            title: "Uploaded documents",
            dataIndex: 'document_name',
        },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t("titles:completeApplication")}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t("subtitles:completeApplication")}
                </Typography.Text>
            </div>
            <Form
                className={styles.form}
                layout={"vertical"}
                form={form}
                scrollToFirstError
                onFinish={handleSubmit}
            >
                <Stepper
                    current={RouteStrings.ApplicationFlowStepDocuments}
                    steps={RouteStrings.DEFAULT_PROCESS_FLOW_PATHS}
                    titles={RouteStrings.DEFAULT_PROCESS_FLOW_TITLES}
                    icons={RouteStrings.DEFAULT_PROCESS_FLOW_ICONS}
                />

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                    <div style={{ textAlign: "left" }}>
                        <Typography.Paragraph>
                            To finalize your application we require you to upload the following documents:
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            1. Proof of ID <br />
                            2. Utility bill <br />
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            You can access your account with a limited use by the time we verify your data.
                        </Typography.Paragraph>
                        <Divider />
                    </div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        style={{ width: "100%"}}
                        className={styles.uploadArea}
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <CloudUploadOutlined/>
                            Click to choose or drag documents here.
                        </Space>
                    </Upload>

                    <Table
                        columns={columns}
                    />

                    <Form.Item
                        name={"notes"}
                        label={<Typography.Title level={5}>{t("formLabels:notes")}</Typography.Title>}
                        rules={[{ message: t("errors:invalidData"), min: 5, max: 1000 }]}
                    >
                        <TextArea
                            data-cy="input_notes"
                            placeholder={t("placeholders:notes")}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" disabled>
                        {t("buttons:continue")}
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default ApplicationStepDocuments;
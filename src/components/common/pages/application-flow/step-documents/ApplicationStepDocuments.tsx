import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Form, Input, Space, Table, Typography, Upload } from "antd";
import BackButton from "../../../presenters/back-button/BackButton";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@ant-design/icons";

import { scrollTo } from "../../../../helpers/helpers";

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
            title: t("common:uploadedDocuments"),
            dataIndex: 'document_name',
        },
    ];

    React.useEffect(() => {
        scrollTo(0);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t("forms:titles:completeApplication")}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t("forms:subtitles:completeApplication")}
                </Typography.Text>
            </div>
            <Form
                className={styles.form}
                layout={"vertical"}
                form={form}
                scrollToFirstError
                onFinish={handleSubmit}
            >
                <BackButton to={RouteStrings.ApplicationFlowStepCreateAccount} />

                <Stepper
                    current={RouteStrings.ApplicationFlowStepDocuments}
                    steps={RouteStrings.DEFAULT_PROCESS_FLOW_PATHS}
                    titles={RouteStrings.DEFAULT_PROCESS_FLOW_TITLES}
                    icons={RouteStrings.DEFAULT_PROCESS_FLOW_ICONS}
                />

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                    <div style={{ textAlign: "left" }}>
                        <Typography.Paragraph>
                            {t("forms:subtitles:requiredDocumentsPrefix")}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            1. Proof of ID <br />
                            2. Utility bill <br />
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {t("forms:subtitles:requiredDocumentsSuffix")}
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
                            {t("common:documentUploadAreaText")}
                        </Space>
                    </Upload>

                    <Table
                        columns={columns}
                    />

                    <Form.Item
                        name={"notes"}
                        label={<Typography.Title level={5}>{t("forms:labels:notes")}</Typography.Title>}
                        rules={[{ message: t("forms:errors:invalidData"), min: 5, max: 1000 }]}
                    >
                        <TextArea
                            data-cy="input_notes"
                            placeholder={`(${t("common:optional")}) ${t("forms:placeholders:notes")}`}
                        />
                    </Form.Item>

                    <div className={styles.formButton}>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled>
                                {t("buttons:finalize")}
                            </Button>
                            <Button className="orange" type="primary">
                                {t("buttons:completeLater")}
                            </Button>
                        </Space>
                    </div>
                </Space>
            </Form>
        </div>
    );
};

export default ApplicationStepDocuments;
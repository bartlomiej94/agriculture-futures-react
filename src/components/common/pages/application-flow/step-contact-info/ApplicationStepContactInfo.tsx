import * as React from "react";
import { useTranslation } from "react-i18next";

import { DatePicker, Button, Form, Input, Typography } from "antd";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";

import styles from "../ApplicationFlow.module.scss";

const ApplicationStepContactInfo: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(RouteStrings.ApplicationFlowStepCreateAccount);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t("titles:registerAccount")}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t("subtitles:preRegisterAccount")}
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
                    current={RouteStrings.ApplicationFlowStepContactInfo}
                    steps={RouteStrings.DEFAULT_PROCESS_FLOW_PATHS}
                    titles={RouteStrings.DEFAULT_PROCESS_FLOW_TITLES}
                    icons={RouteStrings.DEFAULT_PROCESS_FLOW_ICONS}
                />
                <Form.Item
                    name={"first_name"}
                    label={<Typography.Title level={5}>{t("formLabels:firstName")}</Typography.Title>}
                    rules={[{ required: true, message: t("errors:invalidData"), min: 2, max: 100 }]}
                >
                    <Input
                        data-cy="input_first_name"
                    />
                </Form.Item>

                <Form.Item
                    name={"last_name"}
                    label={<Typography.Title level={5}>{t("formLabels:lastName")}</Typography.Title>}
                    rules={[{ required: true, message: t("errors:invalidData"), min: 2, max: 100 }]}
                >
                    <Input
                        data-cy="input_last_name"
                    />
                </Form.Item>

                <Form.Item
                    name={"birthdate"}
                    label={<Typography.Title level={5}>{t("formLabels:birthdate")}</Typography.Title>}
                    rules={[{ 
                        required: true,
                        message: t("errors:emptyDate"),
                    }]}
                >
                    <DatePicker
                        className={styles.datePicker}
                        format="DD-MM-YYYY"
                        inputReadOnly
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    {t("buttons:continue")}
                </Button>
            </Form>
        </div>
    );
};

export default ApplicationStepContactInfo;
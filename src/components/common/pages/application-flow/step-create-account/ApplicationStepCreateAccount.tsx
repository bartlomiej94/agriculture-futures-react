import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button, Form, Input, Spin, Typography } from "antd";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import styles from "../ApplicationFlow.module.scss";

const ApplicationStepCreateAccount: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [password, setPassword] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = () => {
        setLoading(true);

        // Mocked fetch
        setTimeout(() => {
            navigate(RouteStrings.ApplicationFlowStepDocuments);
        }, 1000);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t("titles:registerAccount")}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t("subtitles:registerAccount")}
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
                    current={RouteStrings.ApplicationFlowStepCreateAccount}
                    steps={RouteStrings.DEFAULT_PROCESS_FLOW_PATHS}
                    titles={RouteStrings.DEFAULT_PROCESS_FLOW_TITLES}
                    icons={RouteStrings.DEFAULT_PROCESS_FLOW_ICONS}
                />
                <Form.Item
                    name={"email"}
                    label={<Typography.Title level={5}>{t("formLabels:email")}</Typography.Title>}
                    rules={[{ required: true, message: t("errors:invalidEmail"), type: "email" }]}
                >
                    <Input
                        data-cy="input_email"
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    label={<Typography.Title level={5}>{t("formLabels:password")}</Typography.Title>}
                    rules={[{ required: true, message: t("errors:invalidPassword"), min: 2, max: 100 }]}
                >
                    <Input
                        data-cy="input_password"
                        type={showPassword ? "text" : "password"}
                        addonAfter={
                            <div onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </div>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name={"repeat_password"}
                    label={<Typography.Title level={5}>{t("formLabels:repeatPassword")}</Typography.Title>}
                    rules={[
                        { 
                            required: true,
                            message: t("errors:notMatchedPassword"),
                            validator: (_, value) =>
                                value === password ? Promise.resolve() : Promise.reject(t("errors:notMatchedPassword")),
                        }
                    ]}
                >
                    <Input
                        data-cy="input_repeat_password"
                        type={showPassword ? "text" : "password"}
                        addonAfter={
                            <div onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </div>
                        }
                    />
                </Form.Item>

                {loading ? (
                    <Spin />
                ) : (
                    <Button type="primary" htmlType="submit">
                        {t("buttons:continue")}
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default ApplicationStepCreateAccount;
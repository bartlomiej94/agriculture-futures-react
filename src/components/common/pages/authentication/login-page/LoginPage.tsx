import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useQuery } from "../../../../helpers/QueryParams";

import { Button, Divider, Form, Input, Space, Spin, Typography } from "antd";

import { getCredentialsByEmail, getCredentialsIdByEmail } from "../../../../../api/userService";
import { LocalAuthManager } from "../../../../storage/LocalAuthManager";

import styles from "../Authentication.module.scss";

const LoginPage: React.FC<any> = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const queryParams = useQuery();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [generalError, setGeneralError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        let id = "";

        try {
            const credentials = await getCredentialsByEmail(email);
            id = await getCredentialsIdByEmail(email);

            if (!credentials || credentials.email !== email || credentials.password !== password) {
                setLoading(false);
                return setGeneralError("We couldn't find a combination of provided e-mail address and password in our database.");
            };
        } catch (error) {
            setLoading(false);
            console.error(error);
        }

        const authManager = new LocalAuthManager();

        authManager.update({
            email,
            id,
        });

        navigate(queryParams.get("redirect") || "/");
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2} className="agriax-green">
                    agriax
                </Typography.Title>
            </div>
            <Form
                className={styles.form}
                layout="vertical"
                form={form}
                scrollToFirstError
                onFinish={handleSubmit}
                onChange={() => setGeneralError("")}
            >
                <Typography.Title level={4} className={styles.rowCenter}>
                    Login to your account
                </Typography.Title>
                <Divider />

                <Form.Item
                    name={"email"}
                    label={<Typography.Title level={5}>{t("forms:labels:email")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidEmail"), type: "email" }]}
                >
                    <Input
                        data-cy="input_email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    label={<Typography.Title level={5}>{t("forms:labels:password")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidPassword") }]}
                >
                    <Input
                        data-cy="input_password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Space direction="vertical" style={{ width: "100%", textAlign: "center" }} size={32}>
                    {generalError && (
                        <div className={styles.rowCenter}>
                            <Typography.Text className="agriax-error">
                                {generalError}
                            </Typography.Text>
                        </div>
                    )}

                    <div className={[styles.formButton, styles.rowCenter].join(" ")}>
                        {loading ? (
                            <Spin />
                        ) : (
                            <Button type="primary" htmlType="submit">
                                {t("buttons:login")}
                            </Button>
                        )}
                    </div>
                </Space>

            </Form>
        </div>
    );
};

export default LoginPage;
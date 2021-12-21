import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button, Form, Input, Space, Spin, Typography } from "antd";
import BackButton from "../../../presenters/back-button/BackButton";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { scrollTo } from "../../../../helpers/helpers";

import { getUsers } from "../../../../../api/userService";

import styles from "../ApplicationFlow.module.scss";

const ApplicationStepCreateAccount: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [password, setPassword] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isLogin, setIsLogin] = React.useState<boolean>(false);

    const handleSubmit = () => {
        setLoading(true);

        // Mocked fetch
        setTimeout(() => {
            navigate(RouteStrings.ApplicationFlowStepDocuments);
        }, 1000);
    };
    const fetchUsers = async () => {
        getUsers.then(res => {
            console.log(res);
        });
    };

    React.useEffect(() => {
        scrollTo(0);
        fetchUsers();
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t(`forms:titles:${isLogin ? "signIn" : "registerAccount"}`)}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t(`forms:subtitles:${isLogin ? "signIn" : "registerAccount"}`)}
                </Typography.Text>
            </div>
            <Form
                className={styles.form}
                layout={"vertical"}
                form={form}
                scrollToFirstError
                onFinish={handleSubmit}
            >
                <BackButton to={RouteStrings.ApplicationFlowStepContactInfo} />

                <Stepper
                    current={RouteStrings.ApplicationFlowStepCreateAccount}
                    steps={RouteStrings.DEFAULT_PROCESS_FLOW_PATHS}
                    titles={RouteStrings.DEFAULT_PROCESS_FLOW_TITLES}
                    icons={RouteStrings.DEFAULT_PROCESS_FLOW_ICONS}
                />
                <Form.Item
                    name={"email"}
                    label={<Typography.Title level={5}>{t("forms:labels:email")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidEmail"), type: "email" }]}
                >
                    <Input
                        data-cy="input_email"
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    label={<Typography.Title level={5}>{t("forms:labels:password")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidPassword"), min: 2, max: 100 }]}
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

                {!isLogin && (
                    <Form.Item
                        name={"repeat_password"}
                        label={<Typography.Title level={5}>{t("forms:labels:repeatPassword")}</Typography.Title>}
                        rules={[
                            { 
                                required: true,
                                message: t("forms:errors:notMatchedPassword"),
                                validator: (_, value) =>
                                    value === password ? Promise.resolve() : Promise.reject(t("forms:errors:notMatchedPassword")),
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
                )}

                <Space direction="vertical" style={{ width: "100%" }} size={32}>
                    <div className={styles.formButton}>
                        {loading ? (
                            <Spin />
                        ) : (
                            <Button type="primary" htmlType="submit">
                                {t("buttons:continue")}
                            </Button>
                        
                        )}
                    </div>

                    <div className={styles.rowCenter}>
                        {isLogin ? (
                            <Typography.Text>
                                {t("common:isNewUser")}&nbsp; 
                                <a onClick={() => setIsLogin(false)} style={{ fontWeight: "bold" }}>
                                    {t("common:register")}
                                </a>
                                &nbsp;{t("common:registerSuffix")}
                            </Typography.Text>
                        ) : (
                            <Typography.Text>
                                {t("common:isMember")}&nbsp;
                                <a onClick={() => setIsLogin(true)} style={{ fontWeight: "bold" }}>
                                    {t("common:signIn")}
                                </a>
                                &nbsp;{t("common:signInSuffix")}
                            </Typography.Text>
                        )}
                    </div>
                </Space>
            </Form>
        </div>
    );
};

export default ApplicationStepCreateAccount;
import * as React from "react";
import { useTranslation } from "react-i18next";
import { en } from "../../../../../i18n/en";
import moment from 'moment';

import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row, Select, Space, Tooltip, Typography } from "antd";
import Stepper from "../../../presenters/stepper/Stepper";

import { RouteStrings } from "../../../../../Routes";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Salutations, YesNos } from "../../../../../types/enums";

import { scrollTo } from "../../../../helpers/helpers";

import { LocalApplicationFlowDataManager } from "../../../../storage/LocalAppFlowDataManager";
import styles from "../ApplicationFlow.module.scss";

const ApplicationStepContactInfo: React.FC<any> = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const persistData = (values: any) => {
        const applDataManager = new LocalApplicationFlowDataManager();

        const appl = applDataManager.get();

        if (appl) {
            appl.salutation = values.salutation;
            appl.first_name = values.first_name;
            appl.last_name = values.last_name;
            appl.birthdate = values.birthdate.format("DD-MM-YYYY");
            appl.nationality = values.nationality;
            appl.address = {
                street: values.street,
                house_number: values.house_number,
                city: values.city,
                postcode: values.postcode,
                country: values.country,
            },
            appl.is_seller = values.is_seller;
    
            applDataManager.update(appl);
        }
    };

    const handleSubmit = (values: any) => {
        persistData(values);
        navigate(RouteStrings.ApplicationFlowStepCreateAccount);
    };

    const addressCountryOptions = () => {
        const codes = [];
        for (const [key] of Object.entries(en.en.countries)) {
            codes.push(key);
        };

        return codes.map((val, i) => {
            return (
                <Select.Option data-cy={`address_country_option_${i}`} key={i} value={val.toString()}>
                    {t(`countries:${val}`)}
                </Select.Option>
            );
        });
    };

    React.useEffect(() => {
        scrollTo(0);

        const applDataManager = new LocalApplicationFlowDataManager();
        const appl = applDataManager.get();

        if (appl == null) {
            return;
        }

        form.setFieldsValue({
            salutation: appl.salutation,
            first_name: appl.first_name,
            last_name: appl.last_name,
            birthdate: appl.birthdate && moment(appl.birthdate),
            nationality: appl.nationality,
            street: appl.address.street || "",
            house_number: appl.address.house_number || "",
            city: appl.address.city || "",
            postcode: appl.address.postcode || "",
            country: appl.address.country || "",
            is_seller: appl.is_seller,
        });
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography.Title level={2}>
                    {t("forms:titles:registerAccount")}
                </Typography.Title>
                <Typography.Text type="secondary">
                    {t("forms:subtitles:preRegisterAccount")}
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
                <Typography.Title className="agriax-green" level={4}>
                    Personal information
                </Typography.Title>
                <Form.Item
                    name={"salutation"}
                    label={<Typography.Title level={5}>{t("forms:labels:salutation")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:emptyOption") }]}
                >
                    <Select
                        data-cy="input_salutation"
                    >
                        <Select.Option data-cy={`address_country_option_0`} value={Salutations.Mr}>
                            {t(`salutations:${Salutations.Mr}`)}
                        </Select.Option>
                        <Select.Option data-cy={`address_country_option_1`} value={Salutations.Ms}>
                            {t(`salutations:${Salutations.Ms}`)}
                        </Select.Option>
                        <Select.Option data-cy={`address_country_option_2`} value={Salutations.Mrs}>
                            {t(`salutations:${Salutations.Mrs}`)}
                        </Select.Option>
                        <Select.Option data-cy={`address_country_option_3`} value={Salutations.Miss}>
                            {t(`salutations:${Salutations.Miss}`)}
                        </Select.Option>
                        <Select.Option data-cy={`address_country_option_4`} value={Salutations.Dr}>
                            {t(`salutations:${Salutations.Dr}`)}
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"first_name"}
                    label={<Typography.Title level={5}>{t("forms:labels:firstName")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidData"), min: 2, max: 100 }]}
                >
                    <Input
                        data-cy="input_first_name"
                    />
                </Form.Item>

                <Form.Item
                    name={"last_name"}
                    label={<Typography.Title level={5}>{t("forms:labels:lastName")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidData"), min: 2, max: 100 }]}
                >
                    <Input
                        data-cy="input_last_name"
                    />
                </Form.Item>

                <Form.Item
                    name={"birthdate"}
                    label={<Typography.Title level={5}>{t("forms:labels:birthdate")}</Typography.Title>}
                    rules={[{ 
                        validator: (_, value) => !value
                            ? Promise.reject(t("forms:errors:emptyDate"))
                            : moment().diff(value, "years") >= 18
                                ? Promise.resolve()
                                : Promise.reject(t("forms:errors:under18")),
                    }]}
                >
                    <DatePicker
                        className={styles.datePicker}
                        format="DD-MM-YYYY"
                        inputReadOnly
                        onChange={value => console.log("years:", value?.diff(moment(), "years"))}
                    />
                </Form.Item>

                <Form.Item
                    name={"nationality"}
                    label={<Typography.Title level={5}>{t("forms:labels:nationality")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidData") }]}
                >
                    <Select
                        data-cy="input_nationality"
                    >
                        {addressCountryOptions()}
                    </Select>
                </Form.Item>

                <Divider />
                <Typography.Title className="agriax-green" level={4}>
                    Address of residence
                </Typography.Title>

                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item
                            name={"street"}
                            label={<Typography.Title level={5}>{t("forms:labels:street")}</Typography.Title>}
                            rules={[{ required: true, message: t("forms:errors:invalidData"), min: 2, max: 100 }]}
                        >
                            <Input
                                data-cy="input_street"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={"house_number"}
                            label={<Typography.Title level={5}>{t("forms:labels:houseNumber")}</Typography.Title>}
                            rules={[{ message: t("forms:errors:invalidData"), min: 1, max: 10 }]}
                        >
                            <Input
                                data-cy="input_house_number"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item
                            name={"city"}
                            label={<Typography.Title level={5}>{t("forms:labels:city")}</Typography.Title>}
                            rules={[{ required: true, message: t("forms:errors:invalidData"), min: 2, max: 100 }]}
                        >
                            <Input
                                data-cy="input_city"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={"postcode"}
                            label={<Typography.Title level={5}>{t("forms:labels:postcode")}</Typography.Title>}
                            rules={[{ required: true, message: t("forms:errors:invalidData"), min: 1, max: 10 }]}
                        >
                            <Input
                                data-cy="input_postcode"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={"country"}
                    label={<Typography.Title level={5}>{t("forms:labels:country")}</Typography.Title>}
                    rules={[{ required: true, message: t("forms:errors:invalidData") }]}
                >
                    <Select
                        data-cy="input_country"
                    >
                        {addressCountryOptions()}
                    </Select>
                </Form.Item>

                <Divider />
                <Typography.Title className="agriax-green" level={4}>
                    Additional information
                </Typography.Title>

                <Form.Item
                    name={"is_seller"}
                    label={
                        <Space>
                            <Typography.Title level={5}>{t("forms:labels:isSeller")}</Typography.Title>
                            <Tooltip
                                title={t("forms:tooltips:isSeller")}
                                color="lime"
                                className={styles.labelTooltip}
                            >
                                <InfoCircleOutlined />
                            </Tooltip>
                        </Space>
                    }
                    rules={[{
                        required: true,
                        message: t("forms:errors:emptyOption"),
                    }]}
                >
                    <Radio.Group>
                        <Space>
                            <Radio value={true}>{t(`common:${YesNos.Yes}`)}</Radio>
                            <Radio value={false}>{t(`common:${YesNos.No}`)}</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <div className={styles.formButton}>
                    <Button type="primary" htmlType="submit">
                        {t("buttons:continue")}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ApplicationStepContactInfo;
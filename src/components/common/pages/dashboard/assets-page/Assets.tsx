import * as React from "react";

import { Avatar, Button, Col, Divider, PageHeader, Row, Space, Statistic, Typography } from "antd";
import Card from "../../../presenters/card/Card";

import { BankOutlined, CreditCardOutlined } from "@ant-design/icons";
import styles from "./Assets.module.scss";

const Assets = () => {
    return (
        <div>
            <PageHeader
                style={{ background: "#fff"}}
                title="Your assets"
            />
            <Row className={styles.cardContainer} gutter={12}>
                <Col span={8}>
                    <Card
                        children={
                            <div style={{ height: "65px" }}>
                                <Statistic
                                    title="Balance"
                                    value="$25,302.34"
                                />
                            </div>
                        }
                        buttons={[
                            {
                                text: "Instant deposit",
                                icon: <CreditCardOutlined />,
                                callback: () => {},
                                classes: ["orange"],
                            },
                            {
                                text: "Withdraw",
                                icon: <BankOutlined />,
                                callback: () => {},
                            }
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        children={
                            <div style={{ height: "65px" }}>
                                <Statistic
                                    title="Balance"
                                    value="$25,302.34"
                                />
                            </div>
                        }
                        buttons={[
                            {
                                text: "Instant deposit",
                                icon: <CreditCardOutlined />,
                                callback: () => {},
                                classes: ["orange"],
                            }
                        ]}
                    />
                    </Col>
                <Col span={8}>
                    <Card
                        children={
                            <div style={{ height: "65px" }}>
                                <Space direction="vertical">
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                    <Typography.Title level={5}>
                                        Invite friends and get a free delivery
                                    </Typography.Title>
                                </Space>
                            </div>
                        }
                        buttons={[
                            {
                                text: "Invite",
                                callback: () => {},
                            }
                        ]}
                    />
                    {/* <Card
                        className={styles.card}
                    >
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                        <Typography.Title level={5}>
                            Invite friends and get a free delivery
                        </Typography.Title>
                        <Divider />
                        <Button type="primary">
                            Get invitation code
                        </Button>
                    </Card> */}
                </Col>
            </Row>
        </div>
    );
};

export default Assets;
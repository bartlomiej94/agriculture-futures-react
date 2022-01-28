import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Avatar, Button, PageHeader, Space, Table, Tabs, Typography } from "antd";

import { getFuturesTabs } from "../../../helpers/helpers";
import { getAllIndexesOrAssets } from "../../../../api/marketService";

import { MarketObject } from "../../../../types/market";
import { MarketObjectTypes } from "../../../../types/enums";
import { RouteStrings } from "../../../../Routes";

import { ArrowDownOutlined, ArrowUpOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import styles from "./MarketList.module.scss";

interface Props {
    title: string
    data: MarketObject[]
    type: MarketObjectTypes
    tab: string
    onTabChange: (value: string) => void
    onButtonClick: () => void
}

const MarketList: React.FC<Props> = ({ title, data, type, tab, onTabChange, onButtonClick }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { TabPane } = Tabs;

    const columns = [
        {
            dataIndex: "icon",
            width: 30,
            render: (value) => <Avatar src={value} />
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (value, record) => `${record.category} ${value}`
        },
        {
            title: "Price [kg]",
            dataIndex: "price",
            render: (value) => `$${value}`,
        },
        {
            title: "Change [24h]",
            dataIndex: "change",
            render: (value) => (
                <Typography.Text className={`agriax-${value >= 0 ? "green" : "error"}`}>
                    {value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{Math.abs(value)}%
                </Typography.Text>
            )
        },
        {
            title: "Volume [kg]",
            dataIndex: "volume",
        },
        {   
            dataIndex: "watch",
            render: (value) => value ? (
                <StarFilled className="agriax-green" />
            ) : (
                <StarOutlined className="agriax-green" />
            )
        }
    ];

    return (
        <div>
            <PageHeader
                style={{ background: "#fff"}}
                title={title}
            />
            <Space size={32} style={{ padding: "16px" }}>
                <Button type={type === MarketObjectTypes.Asset ? "primary" : "ghost"} onClick={onButtonClick}>
                    Assets
                </Button>
                <Button type={type === MarketObjectTypes.Index ? "primary" : "ghost"} onClick={onButtonClick}>
                    Indexes
                </Button>
            </Space>
            <Tabs
                defaultActiveKey={tab}
                type="card"
                onChange={value => onTabChange(value)}
            >
                {getFuturesTabs().map((future, idx) => (
                    <TabPane tab={future} key={`${idx}`}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{
                                position: ["bottomCenter"]
                            }}
                            loading={!data}
                            rowClassName={styles.tableRow}
                            onRow={(record) => {
                                return {
                                    onClick: () => navigate(`${RouteStrings.MarketsPage}/${record.id}/${idx}`)  
                                };
                            }}
                        />
                    </TabPane>
                ))}
            </Tabs>

        </div>
    );
};

export default MarketList;
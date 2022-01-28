import * as React from "react";
import { useParams } from "react-router";
import moment from "moment";

import { Card, Col, PageHeader, Row, Space, Typography } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Line } from '@ant-design/charts';
import SpinCenter from "../../../presenters/spin-center/SpinCenter";
import OrderHistory from "../../../presenters/order-history/OrderHistory";
import Orderbook from "../../../presenters/orderbook/Orderbook";
import { applePrices } from "../../../../storage/mock-data/apples";

import { getMarketObjectById } from "../../../../../api/marketService";

import styles from "../Dashboard.module.scss";
import localStyles from "./MarketDrilldown.module.scss";

const MarketDrilldown: React.FC<any> = () => {
    const params = useParams();
    const type = params.id.split("_")[0];
    const id = params.id.split("_")[1];

    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<any>();

    const getMarket = async () => {
        setLoading(true);

        try {
            const marketInfo = await getMarketObjectById(type, id);
            setData(marketInfo);
            console.log(marketInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 250);
        }
    };

    let date;
    const chartData = applePrices.map((item, idx) => {
        if (idx === 0) {
            date = moment().subtract(applePrices.length, "days");
            console.log("date", date);
        }

        date.add(1, "days");
        
        return {
            date: date.format("DD-MM-YYYY"),
            price: item,
        };
    });

    const config = {
        data: chartData,
        xField: 'date',
        yField: 'price',
    };

    React.useEffect(() => {
        getMarket();
    }, []);
    
    if (loading || !data) return (
        <div className={styles.container}>
            <SpinCenter />
        </div>
    );

    return (
        <div className={styles.container}>
            <PageHeader
                style={{ background: "#fff"}}
                title={`${data.categoryName} ${data.name}`}
            />
            <div style={{ padding: "12px" }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <div className={localStyles.chart}>
                            <div className={localStyles.chartPrice}>
                                <Space size={8}>
                                    <Typography.Title>${applePrices[applePrices.length - 1]}</Typography.Title>
                                    <Typography.Title style={{ color: "#00d61d" }} level={3}>
                                        <ArrowUpOutlined />{(applePrices[applePrices.length - 1] / (applePrices[applePrices.length - 1] - applePrices[0]) * 100).toFixed(2)}%
                                    </Typography.Title>
                                </Space>
                            </div>
                            <div className={localStyles.chartTimeframes}>
                                <Space>
                                    <Typography.Title level={5}>1H</Typography.Title>
                                    <Typography.Title level={5}>1D</Typography.Title>
                                    <Typography.Title level={5}>1W</Typography.Title>
                                    <Typography.Title level={5}>1M</Typography.Title>
                                    <Typography.Title level={5}>1Y</Typography.Title>
                                    <Typography.Title level={5} style={{ color: "#00a199" }}>ALL</Typography.Title>
                                </Space>
                            </div>
                            <Line {...config} color="#00a199" yAxis={false} padding={[50, 15, 0, 15]}/>
                        </div>
                        <div style={{ paddingTop: "16px" }}>
                            <Card>
                                <OrderHistory />  
                            </Card>
                        </div>
                    </Col>

                    <Col span={8}>
                        <Card style={{ height: "100%" }}>
                            <Orderbook />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MarketDrilldown;
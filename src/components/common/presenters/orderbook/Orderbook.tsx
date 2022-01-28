import * as React from "react";

import { Card, Divider, Typography } from "antd";
import OrderbookRow from "./orderbook-row/OrderbookRow";

import { orderbookLongs, orderbookShorts } from "../../../../components/storage/mock-data/orderbook";

import styles from "./Orderbook.module.scss";

const Orderbook: React.FC<any> = () => {
    return (
        <div className={styles.container}>
            <Typography.Title level={3}>
                Orderbook
            </Typography.Title>
            <Divider />
            <div className={styles.header}>
                <div>
                    <Typography.Title level={5}>
                        Price
                    </Typography.Title>
                </div>
                <div>
                    <Typography.Title level={5}>
                        Size
                    </Typography.Title>
                </div>
            </div>
            <div className={styles.orderbook}>
                {orderbookShorts.reverse().map(ob => (
                    <OrderbookRow value={ob.value} fill={ob.fill} isShort />
                ))}
                <Card style={{ height: "75px", borderStyle: "dashed" }}>
                    <Typography.Title level={4}>
                        3.99
                    </Typography.Title>
                </Card>
                {orderbookLongs.map(ob => (
                    <OrderbookRow value={ob.value} fill={ob.fill} />
                ))}
            </div>
        </div>
    );
};

export default Orderbook;
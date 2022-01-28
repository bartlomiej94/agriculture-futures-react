import * as React from "react";

import { Col, Row, Typography } from "antd";

import styles from "./OrderbookRow.module.scss";

interface Props {
    value: number
    fill: number
    isShort?: boolean
}

const OrderbookRow: React.FC<Props> = ({ value, fill, isShort }) => {
    return (
        <div className={styles.container}>
            <div style={{ width: `${fill}%` }} className={[styles.row, isShort && styles.short].join(" ")}>
                <Typography.Text strong className={styles.price}>
                    {value.toFixed(2)}
                </Typography.Text>
                <Typography.Text strong className={styles.size}>
                    {(4839.23242 * fill / 100).toFixed(3)}
                </Typography.Text>
            </div>
        </div>
    );
};

export default OrderbookRow;
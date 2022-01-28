import * as React from "react";

import { Spin } from "antd";

import styles from "./SpinCenter.module.scss";

const SpinCenter: React.FC<any> = () => {
    return (
        <div className={styles.container}>
            <Spin />
        </div>
    );
};

export default SpinCenter;
import * as React from "react";

import Assets from "./assets-page/Assets";
import MarketList from "../../presenters/market-list/MarketList";

import styles from "./Dashboard.module.scss";

const Dashboard: React.FC<any> = () => {
    return (
        <div className={styles.container}>
            <Assets/>
            {/* <MarketList title="Watchlist" /> */}
        </div>
    );
};

export default Dashboard;
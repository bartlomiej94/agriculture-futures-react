import * as React from "react";

import MarketList from "../../../presenters/market-list/MarketList";

import { getAllIndexesOrAssets } from "../../../../../api/marketService";

import { MarketObjectTypes } from "../../../../../types/enums";

import styles from "../Dashboard.module.scss";

const MarketsPage: React.FC<any> = () => {
    const [marketData, setMarketData] = React.useState();
    const [type, setType] = React.useState<MarketObjectTypes>(MarketObjectTypes.Asset);
    const [activeTab, setActiveTab] = React.useState<string>("0");

    const getMarketObjects = async () => {
        setMarketData(null);
        const indexes = await getAllIndexesOrAssets(parseInt(activeTab), type === MarketObjectTypes.Index);

        setMarketData(indexes);

        console.log("indexes", indexes);
    };

    React.useEffect(() => {
        getMarketObjects();
    }, [activeTab, type]);

    return (
        <div className={styles.container}>
            <MarketList
                title="Markets"
                data={marketData}
                type={type}
                tab={activeTab}
                onTabChange={(value: string) => setActiveTab(value)}
                onButtonClick={() => {}}
            />
        </div>
    );
};

export default MarketsPage;
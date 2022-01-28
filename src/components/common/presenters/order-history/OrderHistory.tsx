import * as React from "react";

import { Avatar, Empty, PageHeader, Table } from "antd";

const OrderHistory: React.FC<any> = () => {
    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            render: (value, record) => `${record.category} ${value}`
        },
        {
            title: "Price [kg]",
            dataIndex: "price",
            render: (value) => `$${value}`,
        },
        {
            title: "Size [kg]",
            dataIndex: "volume",
        },
    ];

    return (
        <div>
            <PageHeader
                title="Open orders"
                style={{ paddingLeft: 0, paddingTop: 0 }}
            />
            <Table
                locale={{
                    emptyText: <Empty description="No Orders" />
                }}
                columns={columns}
            />
        </div>
    );
};

export default OrderHistory;
import * as React from "react";

import { PageHeader, Space, Table, Tag, Typography } from "antd";

import { RightOutlined } from "@ant-design/icons";
import styles from "../Dashboard.module.scss";

const ApplicationsPage: React.FC<any> = () => {
    const applications = [
        {
          key: '1',
          type: "Farm registration",
          created_at: "10-10-2021",
          some_data: "something something",
          status: <Tag color="green">Approved</Tag>
        },
        {
          key: '2',
          type: "Farm registration",
          created_at: "11-12-2021",
          some_data: "extra stuff",
          status: <Tag color="gold">In Review</Tag>
        },
    ];

    const columns = [
        {
            title: "Type",
            dataIndex: 'type',
        },
        {
            title: "Created at",
            dataIndex: 'created_at',
        },
        {
            title: "Some data",
            dataIndex: 'some_data',
        },
        {
            title: "Status",
            dataIndex: 'status',
        },
        {
            title: "",
            dataIndex: 'lastCol',
            width: "100px",
            render: () => (
                <Space>
                    <Typography.Text className="agriax-green">
                        View
                    </Typography.Text>
                    <RightOutlined style={{ fontSize: "12px" }} className="agriax-green" />
                </Space>
            )
        },
    ];
    return (
        <div className={styles.container}>
            <PageHeader
                style={{ background: "#fff"}}
                title="Your applications"
            />
            <Table
                columns={columns}
                dataSource={applications}
                pagination={{
                    position: ["bottomCenter"]
                }}
            />
        </div>
    );
};

export default ApplicationsPage;
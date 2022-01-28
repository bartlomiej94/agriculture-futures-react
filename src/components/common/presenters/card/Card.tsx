import * as React from "react";

import { Button, Card as AntdCard, Divider, Space } from "antd";

interface Props {
    children: any
    height?: number
    buttons?: {
        text: string
        icon?: any
        callback: () => void
        classes?: string[]
    }[]
};

const Card: React.FC<Props> = ({ children, height, buttons }: Props) => {
    return (
        <AntdCard
            style={{ height: height || 200 }}
        >
            {children}

            {buttons && (
                <>
                <Divider />
                    <Space size={16}>
                        {buttons.map(button => (
                            <Button
                                type="primary"
                                onClick={button.callback}
                                className={button.classes?.join(" ")}
                            >
                                {button.icon} {button.text}
                            </Button>
                        ))}
                    </Space>
                </>
            )}
            
        </AntdCard>
    );
};

export default Card;
import * as React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import { IdcardOutlined, UserOutlined, SolutionOutlined } from "@ant-design/icons";
import Header from "./components/common/presenters/header/Header";
import ApplicationStepContactInfo from "./components/common/pages/application-flow/step-contact-info/ApplicationStepContactInfo";
import ApplicationStepCreateAccount from "./components/common/pages/application-flow/step-create-account/ApplicationStepCreateAccount";
import ApplicationStepDocuments from "./components/common/pages/application-flow/step-documents/ApplicationStepDocuments";

export class RouteStrings {
    // User
    public static ApplicationFlowStepContactInfo = "/apply";
    public static ApplicationFlowStepCreateAccount = "/apply/create-account";
    public static ApplicationFlowStepDocuments= "/apply/documents";

    public static readonly DEFAULT_PROCESS_FLOW_PATHS = [
        RouteStrings.ApplicationFlowStepContactInfo,
        RouteStrings.ApplicationFlowStepCreateAccount,
        RouteStrings.ApplicationFlowStepDocuments,
    ];

    public static readonly DEFAULT_PROCESS_FLOW_TITLES = [
        "Contact details",
        "Account credentials",
        "Upload documents",
    ];

    public static readonly DEFAULT_PROCESS_FLOW_ICONS = [
        <UserOutlined />,
        <SolutionOutlined />,
        <IdcardOutlined />,
    ];
};

export const Routes: React.FC<any> = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" element={null} /> 
                <Route path={RouteStrings.ApplicationFlowStepContactInfo} element={<ApplicationStepContactInfo />} />
                <Route path={RouteStrings.ApplicationFlowStepCreateAccount} element={<ApplicationStepCreateAccount />} />
                <Route path={RouteStrings.ApplicationFlowStepDocuments} element={<ApplicationStepDocuments />} /> 
            </Switch>
        </BrowserRouter>
    );
};


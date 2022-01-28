import * as React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import { IdcardOutlined, UserOutlined, SolutionOutlined } from "@ant-design/icons";
import Header from "./components/common/presenters/header/Header";
import SideMenu from "./components/common/pages/dashboard/side-menu/SideMenu";
import Home from "./components/common/pages/home/Home";
import LoginPage from "./components/common/pages/authentication/login-page/LoginPage";
import Dashboard from "./components/common/pages/dashboard/Dashboard";
import MarketsPage from "./components/common/pages/dashboard/markets-page/MarketsPage";
import MarketDrilldown from "./components/common/pages/dashboard/market-drilldown/MarketDrilldown";
import ApplicationsPage from "./components/common/pages/dashboard/applications-page/ApplicationsPage";
import ApplicationStepContactInfo from "./components/common/pages/application-flow/step-contact-info/ApplicationStepContactInfo";
import ApplicationStepCreateAccount from "./components/common/pages/application-flow/step-create-account/ApplicationStepCreateAccount";
import ApplicationStepDocuments from "./components/common/pages/application-flow/step-documents/ApplicationStepDocuments";

import { getAuthId } from "./components/storage/LocalAuthManager";
import { Navigate } from "react-router";

export class RouteStrings {
    // User
    public static LoginPage = "/login";
    public static Dashboard = "/dashboard";
    public static MarketsPage = RouteStrings.Dashboard + "/markets";
    public static MarketDrilldown = RouteStrings.MarketsPage + "/:id/:expiry"
    public static ApplicationsPage = RouteStrings.Dashboard + "/applications";

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

const getRedirectURL = () => {
    const loc: string = window.location.toString();
    const currentPageURLChunk = loc.replace(window.location.origin, "");
    return RouteStrings.LoginPage + "?redirect=" + encodeURIComponent(currentPageURLChunk);
};

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!getAuthId();

    return (
        isAuthenticated ? children : <Navigate to={getRedirectURL()} />
    );
};

export const Routes: React.FC<any> = () => {
    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
                <SideMenu />
                <Header />
            </div>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path={RouteStrings.LoginPage} element={<LoginPage />} />
                <Route path={RouteStrings.ApplicationFlowStepContactInfo} element={<ApplicationStepContactInfo />} />
                <Route path={RouteStrings.ApplicationFlowStepCreateAccount} element={<ApplicationStepCreateAccount />} />
                <Route path={RouteStrings.ApplicationFlowStepDocuments} element={
                    <ProtectedRoute>
                        <ApplicationStepDocuments />
                    </ProtectedRoute>
                }/>
                <Route path={RouteStrings.Dashboard} element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }/>
                <Route path={RouteStrings.ApplicationsPage} element={
                    <ProtectedRoute>
                        <ApplicationsPage />
                    </ProtectedRoute>
                }/>
                <Route path={RouteStrings.MarketsPage} element={
                    <ProtectedRoute>
                        <MarketsPage />
                    </ProtectedRoute>
                }/>
                <Route path={RouteStrings.MarketDrilldown} element={
                    <ProtectedRoute>
                        <MarketDrilldown />
                    </ProtectedRoute>
                }/>
            </Switch>
        </BrowserRouter>
    );
};


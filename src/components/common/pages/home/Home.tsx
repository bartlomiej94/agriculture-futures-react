import * as React from "react";

import { RouteStrings } from "../../../../Routes";
import { useNavigate } from "react-router";

import { getAuthId } from "../../../../components/storage/LocalAuthManager";

const Home: React.FC<any> = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!!getAuthId()) {
            navigate(RouteStrings.Dashboard);
        };
    }, []);

    return (
        <div>

        </div>
    );
};

export default Home;
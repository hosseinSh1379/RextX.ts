import {Route, Routes} from "react-router-dom";
import Layout from "~/layout/layout.tsx";
import Home from "~/feature/Home/home.tsx";

export function AppRoutes() {
    return <Routes>
        <Route
            path="/"
            element={
                <Layout>
                    <Home/>
                </Layout>
            }
        />
    </Routes>
}
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./router/appRoutes";
import {Provider} from "react-redux";
import {store} from "~/store/store.ts";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </Provider>

    )
}

export default App

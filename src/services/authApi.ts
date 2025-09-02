import {apiPath, type ApiResponse, wrap} from "~/utils/Network.ts";
import axios from "axios";
// this function example
async function getUserLoggedInApi() {
    return wrap<Record<string, any>>(await axios.get(apiPath(`/users/1`)))
}

export {
    getUserLoggedInApi
}
import _ from "lodash";
import type {AxiosResponse} from "axios";
import {env} from "./env";

const BASE_API_URL = env("VITE_BASE_API_URL")
const BASE_ASSET_URL = env("VITE_BASE_ASSET_URL")

export function apiPath(path:string): string {
    if (path.startsWith("/")) {
        path = path.substring(1)
    }
    return BASE_API_URL + path
}
export function url(path:string): string {
    if (path.startsWith("/")) {
        path = path.substring(1)
    }
    return BASE_ASSET_URL + path
}

export function isHttpCodeSuccess(code:number) {
    return _.inRange(code, 200, 299)
}

export interface ApiResponse<T> {
    data?: T,
    error?: ErrorResponse,
    success: boolean,

    onSuccess(block: (result: T) => void): this

    onError(block: (errorResponse: ErrorResponse) => void): this

    isSuccess(): boolean

    mapSuccess<T2>(transform: (src: T) => T2): ApiResponse<T2>
}

class ApiResponseImpl<T> implements ApiResponse<T> {
    data?:T
    error?:ErrorResponse
    success!:boolean

    isSuccess(): boolean {
        return this.success
    }

    onSuccess(block: (result:T) => void): this {
        if (this.isSuccess()) {
            block(this.data!)
        }
        return this
    }

    onError(block: (errorResponse:ErrorResponse) => void): this {
        if (!this.isSuccess()) {
            block(this.error!)
        }
        return this
    }

    mapSuccess<T2>(transform: (source:T) => T2): ApiResponseImpl<T2> {
        const res = new ApiResponseImpl<T2>();
        if (this.isSuccess()) {
            res.data = transform(this.data!)
        } else {
            res.error = this.error
        }
        res.success = this.success
        return res
    }

}

export interface ErrorResponse {
    error?: string,
}

export function wrap<T>(
    result: AxiosResponse<T | ErrorResponse>
): ApiResponse<T> {
    if (isHttpCodeSuccess(result.status)) {
        return wrapSuccessResult(result.data as T,true)
    } else {
        return wrapErrorResult(result.data as ErrorResponse, false)
    }
}

export function wrapSuccessResult<T>(result: T, success: boolean = false): ApiResponseImpl<T> {
    return _.tap(new ApiResponseImpl(), (response) => {
        response.data = result
        response.success = success
    })
}

export function wrapErrorResult<T>(result: ErrorResponse, success: boolean = false): ApiResponseImpl<T> {
    return _.tap(new ApiResponseImpl(), (response) => {
        response.error = result
        response.success = success
    })
}
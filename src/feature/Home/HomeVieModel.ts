import {BaseViewModel} from "~/base/BaseViewModel.ts";
import type {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {getUserLoggedInApi} from "~/services/authApi.ts";

export interface HomeState {
    count: number;
    user: Record<string, any> | null;
}

export type HomeReducers = {
    plusCount: CaseReducer<HomeState>;
    minusCount: CaseReducer<HomeState>;
    setUser: CaseReducer<HomeState, PayloadAction<Record<string, any>>>;
};

export class HomeViewModel extends BaseViewModel<HomeState, HomeReducers> {
    protected reducers = {
        plusCount: (state: HomeState) => {
            state.count++
        },
        minusCount: (state: HomeState) => {
            state.count--;
        },
        setUser: (state: HomeState, action: PayloadAction<Record<string, any>>) => {
            state.user = action.payload;
        }
    };
    sliceName = "home";
    initialState: HomeState = {count: 0, user: null};


    increment() {
        this.dispatch(this.slice.actions.plusCount());
    }

    decrement() {
        this.dispatch(this.slice.actions.minusCount())
    }

    async login() {
        const response = await getUserLoggedInApi()
        response.onSuccess(result => {
            if (result) {
                this.dispatch(this.slice.actions.setUser(result));
            }
        })
    }
}

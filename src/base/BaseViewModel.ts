import {
    createSlice,
    type Dispatch,
    type SliceCaseReducers, type ValidateSliceCaseReducers
} from "@reduxjs/toolkit";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "~/store/store.ts";


export abstract class BaseViewModel<
    TState,
    R extends SliceCaseReducers<TState>
> {
    abstract sliceName: string;
    abstract initialState: TState;
    protected abstract reducers: ValidateSliceCaseReducers<TState, R>;

    store!: TState;
    dispatch!: Dispatch;
    get slice() {
        return createSlice({
            name: this.sliceName,
            initialState: this.initialState,
            reducers: this.reducers,
        });
    }


    protected setUp() {}
    protected cleanUp() {}

    private isUp = false;

    _start() {
        if (this.isUp) this._stop();
        this.setUp();
        this.isUp = true;
    }

    _stop() {
        if (this.isUp) this.cleanUp();
        this.isUp = false;
    }
}

export function useViewModel<STATE, ACTION extends SliceCaseReducers<STATE> , VM extends BaseViewModel<STATE ,ACTION>>(
    getViewModel: () => VM
): VM {
    const [vm] = useState(getViewModel);
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((s: RootState) => s[vm.sliceName] as STATE);

    vm.dispatch = dispatch;
    vm.store = state;

    useEffect(() => {
        vm._start();
        return () => vm._stop();
    }, []);

    return vm;
}

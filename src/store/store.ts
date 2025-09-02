import {configureStore} from '@reduxjs/toolkit'
import viewModels from "~/store/register.ts";
const reducers = Object.fromEntries(
    viewModels.map(vm => [vm.sliceName, vm.slice.reducer])
);
export const store = configureStore({
    reducer: reducers
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
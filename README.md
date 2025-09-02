# React + Redux Toolkit MVVM Example

This project demonstrates a **type-safe MVVM architecture** in React using Redux Toolkit.  
It provides a **BaseViewModel**, custom `useViewModel` hook, and a registry to manage ViewModels.

## 📣 Acknowledgements

This project, or any related work inspired by it, is based on and inspired by [this template](https://github.com/amir1376/react-template).


## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/hosseinSh1379/RextX.ts.git
cd RextX.ts
```
2.Install dependencies:
```bash
npm install
# or
yarn install
```

3.Start the development server:
```bash
npm run dev
# or
yarn dev
```

---
# 🏗️ Creating a ViewModel

1.Create a new file inside src/feature/<FeatureName>/<FeatureName>ViewModel.ts.
```ts
import { BaseViewModel } from "~/base/BaseViewModel.ts";
import type { CaseReducer } from "@reduxjs/toolkit";

export interface ExampleState {
  value: number;
}

export type ExampleReducers = {
  increase: CaseReducer<ExampleState>;
  decrease: CaseReducer<ExampleState>;
};

export class ExampleViewModel extends BaseViewModel<ExampleState, ExampleReducers> {
  sliceName = "example";
  initialState: ExampleState = { value: 0 };

  protected reducers = {
    increase: (state: ExampleState) => { state.value++; },
    decrease: (state: ExampleState) => { state.value--; },
  };

  increment() {
    this.dispatch(this.slice.actions.increase());
  }

  decrement() {
    this.dispatch(this.slice.actions.decrease());
  }
}


```

# Explanation:

` BaseViewModel<T, R> `: Base class handling slice creation, state, dispatch, and lifecycle (_start / _stop).

sliceName: Unique slice name in Redux store.

initialState: Default state.

reducers: Defines state mutations.

increment() / decrement(): Methods dispatching the corresponding actions.

# 📝 Using the ViewModel in Components

```ts
import { useViewModel } from "~/base/useViewModel.ts";
import { ExampleViewModel } from "~/feature/Example/ExampleViewModel.ts";

export default function ExampleComponent() {
  const vm = useViewModel(() => new ExampleViewModel());

  return (
    <div>
      <div>Value: {vm.store.value}</div>
      <button onClick={() => vm.increment()}>+</button>
      <button onClick={() => vm.decrement()}>-</button>
    </div>
  );
}

```
# 📌 Registering ViewModels

```ts
import { ExampleViewModel } from "~/feature/Example/ExampleViewModel.ts";
import { HomeViewModel } from "~/feature/Home/HomeViewModel.ts";

export const viewModels = [
  new ExampleViewModel(),
  // Add more ViewModels here
];

```
# Explanation:
viewModels: Array of all ViewModel instances for global access.
Adding a ` new ViewModel ` : Just create it and add to this array.

# ✅ Benefits

Type-Safe: Full `TypeScript` support for state and actions.

`MVVM` Architecture: Separates UI from business logic.

Reusable `ViewModels`: Can be used across multiple components.

Optional Actions: Payload can be optional with default values.

Easy Testing: Business logic is encapsulated in ViewModels.

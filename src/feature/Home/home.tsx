import {useViewModel} from "~/base/BaseViewModel.ts";
import {type HomeReducers, type HomeState, HomeViewModel} from "~/feature/Home/HomeVieModel.ts";
import * as React from "react";
import {Helmet} from "react-helmet"

const LibraryLink: React.FC<{
    name: string, href: string
}> = (props) => <a className="text-blue-500" href={props.href}>
    {props.name}
</a>;
export default function Home() {
    const vm = useViewModel<HomeState, HomeReducers, HomeViewModel>(() => new HomeViewModel())
    return <div className="min-h-screen container gap-4 flex flex-col justify-center items-center">
        <Helmet>
            <meta charSet="utf-8"/>
            <title>React X</title>
        </Helmet>

        <div className="md:w-1/2 card shadow-lg bg-base-300">
            <div className="card-body">
                <div className="card-title">
                    Introduction
                </div>
                <p>
                    this is a template for reactjs app that using
                    <div className="inline space-x-4 mx-4">
                        <LibraryLink name="vite" href="https://vitejs.dev/"/>
                        <LibraryLink name="typescript" href="https://www.typescriptlang.org/"/>
                        <LibraryLink name="react-router" href="https://reactrouter.com"/>
                        <LibraryLink name="tailwindcss" href="https://tailwindcss.com/"/>
                        <LibraryLink name="daysiui" href="https://daisyui.com/"/>
                        <LibraryLink name="react-redux" href="https://react-redux.js.org/"/>
                    </div>
                    with <strong>MVVM</strong> architecture
                </p>
                <div className="card-actions justify-end">
                    <a className="btn btn-primary" href="https://github.com/hosseinSh1379/RextX.ts.git">
                        View In Github
                    </a>
                </div>
            </div>
        </div>
        <div className="card shadow-lg bg-base-200">
            <div className="card-body">
                <div className="card-title">
                    Counter sample
                </div>
                <p>
                    Press the Button to increment counter
                </p>
                <div className="card-actions justify-center">
                    <button className="btn normal-case"
                            onClick={() => vm.increment()}>
                        you hit me <strong className="mx-2">{vm.store.count}</strong> times
                    </button>
                </div>
            </div>
        </div>
        <div className={'flex flex-col items-center justify-center gap-4'}>
            <button onClick={() => vm.login()} className={'btn btn-success'}>Login</button>
            {
                vm.store.user != null && (
                    <>
                        <div>username: {vm.store.user.username}</div>
                        <div>name: {vm.store.user.name}</div>
                    </>
                )
            }
        </div>
    </div>
}
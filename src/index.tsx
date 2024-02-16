import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PorchLock } from "./pages/PorchLock";
import { Layout } from "./pages/Layout";
import { BedroomLock } from "./pages/BedroomLock";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/escape-room/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"porch-lock"} element={<PorchLock/>}/>
                    <Route path={"bedroom-lock"} element={<BedroomLock/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);
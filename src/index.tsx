import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from "./pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import { PorchLock } from "./pages/PorchLock";
import { BedroomLock } from "./pages/BedroomLock";
import { ChipopaLock } from "./pages/ChipopaLock";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"porch-lock"} element={<PorchLock/>}/>
                <Route path={"bedroom-lock"} element={<BedroomLock/>}/>
                <Route path={"chipopa-lock"} element={<ChipopaLock/>}/>
            </Routes>
        </HashRouter>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);
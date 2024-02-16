import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Puzzle1 } from "./pages/Puzzle1";
import { Layout } from "./pages/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/escape-room/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"puzzle1"} element={<Puzzle1/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);
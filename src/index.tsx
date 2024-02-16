import React from 'react';
import { createRoot } from 'react-dom/client';
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PorchPuzzle } from "./pages/PorchPuzzle";
import { Layout } from "./pages/Layout";
import { BedroomPuzzle } from "./pages/BedroomPuzzle";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/escape-room/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"porch-puzzle"} element={<PorchPuzzle/>}/>
                    <Route path={"bedroom-puzzle"} element={<BedroomPuzzle/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);
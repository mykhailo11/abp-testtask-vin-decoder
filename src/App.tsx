import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Home from "@/layouts/home/Home";
import Variable from "@/layouts/variables/Variable";
import Variables from "@/layouts/variables/Variables";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="variables">
                        <Route index element={<Variables />} />
                        <Route path=":variableId" element={<Variable />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

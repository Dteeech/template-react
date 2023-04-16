import Router from "./components/Router.jsx"
import Nav from "./components/Nav.jsx"
import { BrowserRouter } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Router />
        </BrowserRouter>
    );
}

export default App;

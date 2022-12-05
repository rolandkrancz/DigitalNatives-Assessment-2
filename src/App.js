import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import AddUser from './pages/AddUser/AddUser';
import Home from './pages/Home/Home';

const App = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/new" exact element={<AddUser />}></Route>
                <Route path="/" exact element={<Home />}></Route>
            </Routes>
        </Router>
    )
}

export default App
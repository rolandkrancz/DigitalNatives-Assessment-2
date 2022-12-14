import React from 'react'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import AddUser from './pages/AddUser/AddUser';
import EditUser from './pages/EditUser/EditUser';
import Home from './pages/Home/Home';

const App = () => {

    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/new" exact element={<AddUser />}></Route>
                <Route path="/edit/:uid" exact element={<EditUser />}></Route>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default App
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import AddUser from './pages/AddUser/AddUser';
import EditUser from './pages/EditUser/EditUser';
import Home from './pages/Home/Home';

const App = () => {
    return (
        <div className='container'>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/new" exact element={<AddUser />}></Route>
                    <Route path="/:uid" exact element={<EditUser />}></Route>
                    <Route path="/" exact element={<Home />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from './Components/redux/store'; // Make sure to import your store

// Import Components
import HeaderNavigator from './Components/Layout/HeaderNavigator';
import Footer from './Components/Layout/Footer';
import Main from './Components/Main_pages/Main';
import About from './Components/Main_pages/About';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Management from './Components/Main_pages/Management';
import EditTask from './Components/Tasks/EditTask';
import AddTask from './Components/Tasks/AddTask';
import Favorites from './Components/Main_pages/dropDown/Favorites';
import Finished from './Components/Main_pages/dropDown/Finished';
import Importants from './Components/Main_pages/dropDown/Importants';
import EditProfile from './Components/Main_pages/dropDown/EditProfile';

function App() {
  return (
    <Provider store={store}>
      <div style={{ position: 'relative' }} className="App">
        <Router>
          <HeaderNavigator />
          <main>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Main Pages */}
              <Route path="/main" element={<Main />} />
              <Route path="/about" element={<About />} />

              {/* Tasks Pages */}
              <Route path="/tasks/favorites" element={<Favorites />} />
              <Route path="/tasks/finished" element={<Finished />} />
              <Route path="/tasks/importants" element={<Importants />} />
              <Route path="/tasks/edit_profile/:userId" element={<EditProfile />} />

              {/* Task Management */}
              <Route path="/addTask" element={<AddTask />} />
              <Route path="/tasks" element={<Management />}>
                <Route path=":taskId" element={<EditTask />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

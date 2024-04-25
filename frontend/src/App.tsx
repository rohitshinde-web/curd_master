import './App.css';
// filename app.js
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PersonLists from './components/user-list.component';
import CreateUser from './components/add-user-list.component';
import UpdateUserList from './components/update-user-list.component';
function App() {
  const navigation = useNavigate();

  const goToCreatePage = () =>{
    navigation('/add-createUser',{
      state:{
        action:"Create",
        id:0
      }
    })
  }
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        bezKoder
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Tutorials
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add-createUser"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<PersonLists/>} />
        <Route path="/add-createUser" element={<CreateUser/>} />
        <Route path="/update-createUser" element={<UpdateUserList/>} />
      </Routes>
    </div>
  </div>
  );
}

export default App;


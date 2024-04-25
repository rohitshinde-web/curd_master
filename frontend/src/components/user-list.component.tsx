import React, { useState, useEffect } from "react";
import userDataService from "../service/userData.service";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PersonLists() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customer_ids, setcustomer_ids] = useState({
    customer_id: "",
  });
  const handelDelete = () => {
    userDataService
      .delete(Number(customer_ids))
      .then((res) => {
        console.log(res);
        setcustomer_ids({
          customer_id: "",
        });
        navigate("/");
        handleClose();
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const handelEdit = (id) => {
    if(!id){
      return console.log('error')
    }else{
    navigate("update-createUser", {
      state: {
        id: id,
      },
    });
  }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    userDataService
      .get()
      .then((res) => {
        const setUsers = res.data;
        setUser(setUsers.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToDeleteModalOpen = (id) => {
    setcustomer_ids(id);
    handleOpen();
  };
  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>CUSTOMER_ID</th>
              <th>CUSTOMER_NAME</th>
              <th>CONTACT_NAME</th>
              <th>ADDRESS</th>
              <th>CITY</th>
              <th>POSTAL_CODE</th>
              <th>COUNTRY</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={item.customer_id}>
                  <td>{item.customer_id}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.contact_name}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.postal_code}</td>
                  <td>{item.country}</td>
                  <td className="flex">
                    <a
                      href="javascript:"
                      onClick={() => handelEdit(item.customer_id)}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                    <Link to={`/user/${item.customer_id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handleToDeleteModalOpen(item.customer_id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button onClick={() => handelDelete()}>DELETE</Button>
            <Button onClick={() => handleClose()}>NO</Button>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default PersonLists;

// export default class PersonList extends React.Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//    userDataService.get().then(res => {
//    const persons = res.data;
//    const array = persons.data;
//    console.log(array)
//    this.setState({persons: array });
//    console.log('rohit', this.state.persons)
//   })
//   }
//   render() {

// }

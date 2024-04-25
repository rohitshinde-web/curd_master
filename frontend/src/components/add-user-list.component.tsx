import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import userDataService from "../service/userData.service";

type Inputs = {
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
};

type ActionInputs = {
  edit: string;
  create: string;
};

const CreateUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { action, id } = state || {};
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [user, setUser] = useState({
    customer_name: "",
    contact_name: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    submitted: false,
  });

  useEffect(() => {
    if (!id) {
      console.log("getcreateuser");
    } else {
      getUserById(id);
    }
  }, []);

  const handleInput = (event) => {
    console.log(user);
    event.preventDefault();
    const { customer_name, value } = event.target;
    console.log("target", event.target);
    console.log(customer_name, value);
    setUser({ ...user });
  };

  const getUserById = (id) => {
    try {
      userDataService.getById(id).then((response) => {
        setUser({
          customer_name: response.data.customer_name,
          contact_name: response.data.contact_name,
          address: response.data.address,
          city: response.data.city,
          postal_code: response.data.postal_code,
          country: response.data.country,
          submitted: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (event, value) => {
    try {
      setIsLoading(true);
      userDataService.create(event).then((response) => {
        if (response.status === 201) {
          setUser({
            customer_name: "",
            contact_name: "",
            address: "",
            city: "",
            postal_code: "",
            country: "",
            submitted: true,
          });
          navigate("/");
        }
      });
    } catch (error) {}
  };

  const handleEditSubmit = () => {
    const values = getValues();
    console.log("submit " + user + " " + values);
  };

  console.log(watch());
  return (
    <div className="submit-form">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">CREATE USER</h2>
            {/* <p className="text-secondary mb-5 text-center">Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque et neque id ligula mattis commodo.</p> */}
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"></hr>
          </div>
        </div>
      </div>
      {action === "Edit" ? (
        <form>
          <div>
            <div className="form-group">
              <label htmlFor="customer_name">customer_name</label>
              <input
                type="text"
                className="form-control"
                id="customer_name"
                defaultValue={user.customer_name}
                required
                name="customer_name"
                {...register("customer_name", { required: true })}
              />
              {errors.customer_name && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact_name">contact_name</label>
              <input
                type="text"
                className="form-control"
                id="contact_name"
                defaultValue={user.contact_name}
                required
                name="contact_name"
                {...register("contact_name", { required: true })}
              />
              {errors.contact_name && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                defaultValue={user.address}
                required
                name="address"
                {...register("address", { required: true })}
              />
              {errors.address && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">city</label>
              <input
                type="text"
                className="form-control"
                id="city"
                defaultValue={user.city}
                required
                name="city"
                {...register("city", { required: true })}
              />
              {errors.city && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="postal_code">postal_code</label>
              <input
                type="text"
                className="form-control"
                id="postal_code"
                required
                defaultValue={user.postal_code}
                name="postal_code"
                {...register("postal_code", { required: true })}
              />
              {errors.postal_code && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                defaultValue={user.country}
                required
                name="country"
                {...register("country", { required: true })}
              />
              {errors.country && <span>This field is required</span>}
            </div>

            <button
              type="submit"
              className="btn btn-success"
              onClick={() => handleEditSubmit()}
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-group">
              <label htmlFor="customer_name">customer_name</label>
              <input
                type="text"
                className="form-control"
                id="customer_name"
                required
                name="customer_name"
                {...register("customer_name", { required: true })}
              />
              {errors.customer_name && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact_name">contact_name</label>
              <input
                type="text"
                className="form-control"
                id="contact_name"
                required
                name="contact_name"
                {...register("contact_name", { required: true })}
              />
              {errors.contact_name && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                name="address"
                {...register("address", { required: true })}
              />
              {errors.address && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">city</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                name="city"
                {...register("city", { required: true })}
              />
              {errors.city && <span>This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="postal_code">postal_code</label>
              <input
                type="text"
                className="form-control"
                id="postal_code"
                required
                name="postal_code"
                {...register("postal_code", { required: true })}
              />
              {errors.postal_code && <span>This field is required</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                name="country"
                {...register("country", { required: true })}
              />
              {errors.country && <span>This field is required</span>}
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateUser;

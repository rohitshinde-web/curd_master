import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import userDataService from "../service/userData.service";

type Inputs = {
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
};
function UpdateUserList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = state;
  const {
    register,
    handleSubmit,
    setValue,
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
  });

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
    //  getUserById(id)
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const getUserById = (id) => {
    userDataService.getById(id).then((response) => {
      const data = response.data;
      console.log(data);
      setUser(data);
      setValue("customer_name", data.customer_name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("contact_name", data.contact_name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("address", data.address, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("city", data.city, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("postal_code", data.postal_code, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("country", data.country, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };
  const onSubmit: SubmitHandler<Inputs> = (event) => {
    try {
      console.log("event " + JSON.stringify(event));
      setIsLoading(true);
      userDataService
        .update(id, event)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
  return (
    <div className="submit-form">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">EDIT USER</h2>
            {/* <p className="text-secondary mb-5 text-center">Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque et neque id ligula mattis commodo.</p> */}
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"></hr>
          </div>
        </div>
      </div>
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
              defaultValue={user.customer_name}
              onChange={() => handleInputChange(user)}
              //   onChange={handleInputChange}
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

          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserList;

import React,{useEffect,Fragment} from 'react'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, userSelector, clearState } from "../UserSlice";
import { useNavigate, Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const Services = () => {
   const dispatch = useDispatch();
   const { register, errors, handleSubmit } = useForm();
   const navigate = useNavigate();

   const { isFetching, isSuccess, isError, errorMessage } =
     useSelector(userSelector);

   const onSubmit = (data) => {
     dispatch(loginUser(data));
   };

   useEffect(() => {
    console.log("SERVICES PAGE");

     return () => {
       dispatch(clearState());
     };
   }, []);

   useEffect(() => {
     if (isSuccess) {
       dispatch(clearState());
       navigate("/dashboard");
      console.log("NAVIGATING TO DASHBOARD")
      // return <Navigate to="/dashboard" />;
     }

     if (isError) {
       toast.error(errorMessage);
       dispatch(clearState());
     }
   }, [isSuccess, isError]);


  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Banking Services
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <input
                id="account_number"
                type="number"
                name="account_number"
                placeholder="Enter the user's account number"
                required
                {...register("account_number", { required: true })}
              />
              <button type="submit" className="registration-button">
                {isFetching ? (
                  <p> Redirecting...</p>
                ) : (
                  <p>Login</p>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Services

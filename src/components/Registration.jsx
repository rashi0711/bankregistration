import React,{useEffect,Fragment} from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { registerUser, userSelector, clearState } from "../UserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Registration = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);


  useEffect(() => {
     if (isSuccess) {
      dispatch(clearState());
      navigate("/services");
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
           User Registration
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
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter the user's full name"
                    required
                    // ref={register({required: true})} 
                    {...register('name', { required: true })} />
                    
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter the user's email address"
                    required
                    {...register('email', { required: true })}
                    />
                <input
                    id="account_number"
                    type="number"
                    name="account_number"
                    placeholder="Enter the user's account number"
                    required
                    {...register('account_number', { required: true })} />
                <button type="submit" className='registration-button'>
                  {
                    isFetching ? (
                      <p> Registration in process...</p>
                    ) : ( 
                      <p>Register User</p>
                    )
                  }
                </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Registration

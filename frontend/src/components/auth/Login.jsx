import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/reducerSlices/userSlice";
import { Loader2Icon } from "lucide-react";


const Login = () => {
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

      const {isLoading} =useSelector(store=>store.user)
  const navigate= useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         dispatch(setLoading(true))
      const res = await axios.post("http://localhost:4000/login",input, {
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      console.log(res.data.success)
      if(res.data.success){
        toast.success(res.data.msg)
        navigate('/')
      }else{
        toast.error(res.data.msg)
      }
        
      
    } catch (error) {
      console.log(error);
      
    } finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>

      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-1/2 rounded-md border border-gray-200 p-4 my-10"
        >
          <h1 className="font-bold text-3xl mb-5">Login</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="phone"
              id="phone"
              placeholder="enter your phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="enter your password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>

          <div className="w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="phone">Role</Label>
            <RadioGroup className="flex items-center my-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="job seeker"
                  name="role"
                  checked={input.role === "job seeker"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>



          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Button
              type="submit"
              className="bg-[#095028] hover:bg-[#053B48] p-5 text-xl"
            >
              {isLoading?<Loader2Icon/>:"submit"}
            </Button>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <p className="">
              Don't have an account?
              <span className="mx-1">
                <Link to={"/signup"} className="text-blue-900">
                  Signup
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

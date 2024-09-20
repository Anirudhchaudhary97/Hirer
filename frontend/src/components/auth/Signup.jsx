import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { json, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/reducerSlices/userSlice";
import { Loader2Icon } from "lucide-react";


const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

     const {isLoading}=useSelector((store)=>store.user)
         const dispatch=useDispatch()
          const navigate= useNavigate()
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
        dispatch(setLoading(true))
      const res = await axios.post("http://localhost:4000/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      console.log(res.data)
      if(res.status=='200'){
        toast.success(res.data.msg)
        navigate('/login')
      }
        
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg)
    }finally{
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
          <h1 className="font-bold text-3xl mb-5">Signup</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              type="text"
              id="fullname"
              placeholder="anirudh chaudhary"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="anirudh7@gmail.com"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="phone"
              id="phone"
              placeholder="9826453640"
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
              placeholder="create password"
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
                <Label htmlFor="r1">job seeker</Label>
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
            <Label htmlFor="password">Profile Image</Label>
            <Input
              type="file"
              name='file'
              id="profile"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <Button
              type="submit"
              className="bg-[#095028] hover:bg-[#053B48] p-5 text-xl"
            >
            {isLoading?<Loader2Icon/>:"Submit"}
            </Button>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
            <p className="">
              Already have an account?
              <span className="mx-1">
                <Link to={"/login"} className="text-blue-800">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/reducerSlices/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logic for logout
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
        
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 ">
        <div>
          <Link to={"/"}>
            {" "}
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#053B48]">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex gap-5 font-medium items-center text-lg cursor-pointer">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            <li>
              <Link to={"/browse"}>Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#12a150] hover:bg-[#095028]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profileImage}
                    alt="profileImage"
                  />
                   <AvatarFallback>
                    {user?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profileImage}
                      alt="@shadcn"
                    />
                     <AvatarFallback>
                    {user?.fullName?.charAt(0)}
                  </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 bg-[#F0FCFF]">
                  <div className="flex w-fit items-center gap-2">
                    <User2 />
                    <Button variant="link">
                      <Link to={"/profile"}>View Profile</Link>
                    </Button>
                  </div>
                  <div className=" flex w-fit items-center gap-2">
                    <LogOut />
                    <Button variant="link" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 ">
        <div>
        <Link to={'/'}> <h1 className="text-2xl font-bold">
            Job<span className="text-[#053B48]">Portal</span>
          </h1></Link> 
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex gap-5 font-medium items-center text-lg cursor-pointer">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/jobs'}>Jobs</Link></li>
            <li><Link to={'/browse'}>Browse</Link></li>
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
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Anirudh chaudhary</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 bg-[#F0FCFF]">
                  <div className="flex w-fit items-center gap-2">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className=" flex w-fit items-center gap-2">
                    <LogOut />
                    <Button variant="link">Logout</Button>
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

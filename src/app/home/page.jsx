"use client";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [menus, setMenus] = useState([]);
  const [count, setCount] = useState();
  const getUserName = async () => {
    try {
      const res = await axios.get("/api/getcookies");
      console.log(res.data.result.value);
      try {
        if (res.data.result.value) {
          setUserName(res.data.result.value);
        }
      } catch (e) { }
    } catch (e) { }
  };

  const loadMenus = async () => {
    const res = await axios.get("/api/getmenus");
    console.log(res.data);
    try {
      if (res.data) {
        setMenus(res.data);
        setCount(Array(res.data.length).fill(0));
      }
    } catch (e) { }
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      const newCount = Array(res.data.length).fill(0);
      for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < res.data.length; j++) {
          if (cart[i].name === res.data[j].name) {
            newCount[j] = cart[i].count;
          }
        }
      }
      setCount(newCount);
    }
  };


  useEffect(() => {
    try {
      getUserName();
      loadMenus();
    } catch (e) { }
  }, []);
  const handleClick = (index, increment) => {
    if (!userName) {
      alert("Please login to continue");
      return;
    }
    const cart = [];
    for (let i = 0; i < menus.length; i++) {
      count[i] && cart.push({ name: menus[i].name, count: count[i] });
    }
    setCount((prevCount) => {
      const newCount = [...prevCount];
      newCount[index] = Math.max(newCount[index] + increment, 0);
      localStorage.setItem("cart", JSON.stringify(cart));
      return newCount;
    });
  };

  return (
    <ScrollArea className="h-screen">
      {userName.length > 0 ? <NavbarLogin item={userName} /> : <Navbar />}
      <div className=" flex flex-col gradient-bg-footer w-screen min-h-screen pt-[100px] overflow-auto">
        {/* See all the menus */}
        <h1 className="text-white text-4xl font-bold ml-10 p-5">Menus</h1>
        {/* <RishabhMenu /> */}
        <div className="flex justify-left gap-8 ml-10">
          <Dialog className="select-none">
            <DialogTrigger asChild>
              <div className="gradient-bg-transactions border-2 border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer w-[366px] h-[300px] p-3 rounded-lg">
                <div>
                  <Image
                    alt="hii surya"
                    src={"/rishabhPhoto.png"}
                    width={300}
                    height={300}
                    className="rounded-2xl m-5 h-[200px] w-[300px]"
                  />
                </div>
                <div className=" px-7">
                  <div className="text-white font-mono font-black text-2xl">Rishab</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle className="select-none">Rishabhs</DialogTitle>
                <DialogDescription className="flex items-center justify-center p-3">
                  <ScrollArea className="h-[500px] w-full">
                    {menus.length > 0 &&
                      menus.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center justify-between blue-glassmorphism select-none mb-2"
                        >
                          <Image
                            alt="hii surya"
                            src={"/dummyPhoto.jpg"}
                            width={180}
                            height={200}
                            className="rounded-2xl m-5 w-[130px] h-[130px]"
                          />
                          <div className="flex">
                            <div className="flex items-center justify-center flex-col w-full">
                              <h1 className="text-white text-2xl font-black font-mono mr-auto">
                                {item.name}
                              </h1>
                              <p className="text-white text-md font-extralight mr-auto">
                                {item.contents}
                              </p>
                              <h1 className="text-white text-2xl font-bold mr-auto">
                                Price: {item.price}
                              </h1>
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            <Minus
                              className="w-4 h-4 m-4 bg-[#282828] hover:bg-[#202020] active:bg-black text-white font-bold rounded-xl"
                              onClick={() => handleClick(index, -1)}
                            />
                            <span className="w-[10px]">{count[index]}</span>
                            <Plus
                              className="w-4 h-4 m-4 bg-[#282828] hover:bg-[#202020] active:bg-black text-white font-bold rounded-xl"
                              onClick={() => handleClick(index, 1)}
                            />
                          </div>
                        </div>
                      ))}
                    <ScrollBar />
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <div className="gradient-bg-transactions border-2 rounded-lg border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer p-3 w-[366px] h-[300px]">
                <div>
                  <Image
                    alt="hii surya"
                    src={"/AswinsPhoto.png"}
                    width={400}
                    height={400}
                    className="rounded-2xl m-5 w-[300px] h-[200px]"
                  />
                </div>
                <div className="px-7">
                  <div className="text-white font-mono font-black text-2xl">Ashwin</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <div className="gradient-bg-transactions border-2 rounded-lg border-[#282828] hover:border-[#202020] active:border-black select-none cursor-pointer p-3 w-[366px] h-[300px]">
                <div>
                  <Image
                    alt="hii surya"
                    src={"/dummyPhoto.jpg"}
                    width={200}
                    height={200}
                    className="rounded-2xl m-5 w-[300px] h-[200px]"
                  />
                </div>
                <div className="px-7">
                  <div className="text-white font-mono font-black text-2xl">Main Canteen</div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="white-glassmorphism text-white">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="h-0.5 w-3/4 bg-[#303030] mt-10 m-5"></div>
        {/* See all the popular items in a carousel */}
        <h1 className="text-white text-4xl font-bold ml-10 p-5">
          Popular Right Now
        </h1>
        <div className="max-w-screen mt-2 mb-20 px-20 ">
          <Carousel className="text-white mt-5">
            <CarouselPrevious className="text-white bg-[#323232] p-0 m-0" />
            <CarouselNext className="text-white bg-[#323232] m-0 p-0" />
            <CarouselContent className="ml-1 gap-1">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <CarouselItem className="basis-1/4 p-0" key={index}>
                    <Card className="gradient-bg-transactions border-[#282828] select-none p-0">
                      <CardContent className="p-0 flex items-center justify-center">
                        <Image
                          alt="hii surya"
                          src={"/dummyPhoto.jpg"}
                          width={200}
                          height={100}
                          className="rounded-2xl m-2 w-1/2"
                        />
                      </CardContent>
                      <CardFooter className="flex-col">
                        <CardTitle className="text-white font-mono p-0 m-0">
                          Laundramat {index}
                        </CardTitle>
                        <CardDescription className="text-white font-mono p-0 m-0">
                          4.5
                        </CardDescription>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default Page;

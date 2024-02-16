"use client";
import NavbarLogin from "../../components/NavbarLogin";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

let windowClose1 = false;
let myTasks = [];
const l = [
  {
    _id: {
      $oid: "65bc7bcbe8a81a5959904b39",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd2e8a81a5959904b3c",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7bd3e8a81a5959904b3f",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7d97e8a81a5959904b4a",
    },
    taskTitle: "task3",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f3de8a81a5959904b51",
    },
    taskTitle: "task4",
    type: "priority delivery",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bc7f60e8a81a5959904b54",
    },
    taskTitle: "task10",
    type: "delivery of books",
    fromLocation: "gh1",
    toLocation: "gh5",
    fromUsername: "surya.nara0123",
    toUsername: "",
    __v: 0,
  },
  {
    _id: {
      $oid: "65bcf3a8175a810ae50aee95",
    },
    taskTitle: "food venum",
    type: "delivery of food",
    fromLocation: "rishabhs",
    toLocation: "gh5",
    fromUsername: "sajit",
    toUsername: "",
    __v: 0,
  },
];
const TaskWindow = ({ item }) => {
  const [windowClose, setWindowClose] = useState(false);
  return (
    <div>
      {!windowClose && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 white-glassmorphism rounded-md shadow-md p-5 px-7 border-black border-2 mx-auto">
          <AiOutlineClose
            className="absolute top-3 right-3 cursor-pointer font-black z-0"
            onClick={() => {
              setWindowClose(true);
              windowClose1 = true;
            }}
          />
          <h1 className="font-black text-white text-1xl">{item.type}</h1>
          <h1 className="font-black text-white text-1xl">
            From: {item.fromLocation}
          </h1>
          <h1 className="font-black text-white text-1xl">
            To: {item.toLocation}
          </h1>
          <h1 className="font-black text-white text-1xl">
            From: {item.fromUsername}
          </h1>
          <h1 className="font-black text-white text-1xl">
            To: {item.toUsername}
          </h1>
          <button
            className="bg-[#A952e3] py-2 px-12 ml-4 mr-7 rounded-md cursor-pointer hover:bg-[#A546bd]"
            onClick={() => {
              setWindowClose(true);
              windowClose1 = true;
              myTasks.push(item);
              let index = l.indexOf(item);
              l.splice(index, 1);
            }}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

const Page = ({ params }) => {
  const [hoverTask, setHoverTask] = useState([false, 0, 0]);
  const [myHoverTask, setMyHoverTask] = useState([false, 0, 0]);
  const [taskToggle, settaskToggle] = useState([false, 0]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the counter
      setCounter((prevCounter) => prevCounter + 1);
    }, 500); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="min-h-screen gradient-bg-footer">
      <NavbarLogin item={params.id} />
      <div className="gradient-bg2 flex flex-col h-[400px] items-center justify-center">
        <h1 className="font-black text-3xl">Welcome {params.id}</h1>
        <h1 className="font-bold text-1xl">
          See all tasks you are eligible for in this page
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gradient-bg-transaction white-glassmorphism mt-2">
        <h1 className="font-bold text-2xl my-3">Available Tasks</h1>
      </div>
      <div className="gradient-bg3 grid grid-cols-4 grid-flow-row gap-4 my-3 p-2">
        {l.map((item, index) => {
          return (
            <div className="" onClick={() => {}}>
              <div
                key={item._id.$oid}
                className="bg-white rounded-md shadow-md p-4 cursor-pointer hover:bg-[#f0f0f0]"
                onMouseEnter={() => setHoverTask([true, index, item._id.$oid])}
                onMouseLeave={() => setHoverTask([false, index, item._id.$oid])}
                onClick={() => {
                  settaskToggle([true, item]);
                  windowClose1 = false;
                }}
              >
                <h1 className="font-bold text-1xl">{item.taskTitle}</h1>
                {hoverTask[0] & (hoverTask[2] == item._id.$oid) ? (
                  <div className="fixed blue-glassmorphism rounded-md shadow-md p-2 border-black border-2 mx-auto">
                    <h1 className="font-black text-white text-1xl">
                      {item.type}
                    </h1>
                    <h1 className="font-black text-white text-1xl">
                      From: {item.fromLocation}
                    </h1>
                    <h1 className="font-black text-white text-1xl">
                      To: {item.toLocation}
                    </h1>
                    <h1 className="font-black text-white text-1xl">
                      From: {item.fromUsername}
                    </h1>
                    <h1 className="font-black text-white text-1xl">
                      To: {item.toUsername}
                    </h1>
                  </div>
                ) : // console.log("hello")
                null}
              </div>
            </div>
          );
        })}
      </div>
      {taskToggle[0] & !windowClose1 ? (
        <TaskWindow item={taskToggle[1]} />
      ) : null}
    </div>
  );
};

export default Page;

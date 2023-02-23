import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  
  const [name , setName] = useState("");

  const loadHomePage = async () => {
    try {
      const res = await fetch("https://boisterous-mochi-ee786e.netlify.app/.netlify/functions/server/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setName(data.name);

      if (!res.status === 200) {
        throw new Error("User Not Authenticated");
      }
      } catch (err) {
        toast.error(err);
      }
    };

    useEffect(() => {
      loadHomePage();
    }, []);

  return (
    <div>
      <div className='text-center'>
        <div className='text-4xl font-bold text-sky-600'>Welcome Back !!!</div>
        <div className='text-2xl font-semibold mt-4'>Hey {name ? name.split(" ")[0] : "User"} , Good To See You</div>
      </div>
    </div>
  )
}

export default Home
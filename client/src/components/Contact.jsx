import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {

  const [userData , setUserData] = useState({name:"" , email:"" , phone:"" , message:""});

  const loadContactPage = async () => {
    try {
      const res = await fetch("https://react-users-collection.onrender.com/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setUserData({...userData , name:data.name , email:data.email , phone:data.phone});

      if (!res.status === 200) {
        throw new Error("User Not Authenticated");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    loadContactPage();
  }, []);

  const handleInputs = (e) =>{
    let name = e.target.name ;
    let val = e.target.value ;
    setUserData({...userData , [name]:val})
    
  }

  const sendData = async (e)=>{
    e.preventDefault()

    const {name,email,phone,message} = userData

    const res = await fetch('/contact' , {
      method: "POST",
      headers : {
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify({
        name,email,phone,message
      })
    })

    const data = await res.json()

    if(res.status === 201){
      toast.success("Data sent successfully")
      setUserData({...userData , message:""})
    }else{
      toast.error(data.message)
    }

  }
  
  return (
    <div className="contactPage px-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 shadow-lg rounded-md">
          <div className="font-semibold">Phone</div>
          <div>{userData.phone}</div>
        </div>
        <div className="text-center p-4 shadow-lg rounded-md">
          <div className="font-semibold">Email</div>
          <div>{userData.email}</div>
        </div>
        <div className="text-center p-4 shadow-lg rounded-md">
          <div className="font-semibold">Address</div>
          <div>Near New Delhi - Sector 32</div>
        </div>
      </div>

      <div className="userContact shadow-lg p-4">
        <header className="text-center font-semibold text-lg mb-4">
          Get in Touch
        </header>
        <form method="POST" onSubmit={sendData} className="contactForm grid grid-cols-3">
          <input
            value={userData.name}
            onChange={handleInputs}
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <input
            value={userData.email}
            onChange={handleInputs}
            name="email"
            type="text"
            placeholder="Enter your email"
          />
          <input
            value={userData.phone}
            onChange={handleInputs}
            name="phone"
            type="phone"
            placeholder="Enter your phone"
          />

          <textarea
            name="message"
            value={userData.message}
            onChange={handleInputs}
            placeholder="Enter Message"
            className="col-span-3 resize-none w-full h-32"
          ></textarea>

          <button
            className="submitBtn col-span-3 m-auto whitespace-nowrap text-white text-sm p-2 px-4 rounded-sm shadow-md cursor-pointer mt-4"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

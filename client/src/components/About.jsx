import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const About = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const loadAboutPage = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/about",
        {
          method: "GET",
          credentials: 'include' ,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      setData(data);

      if (!res.status === 200) {
        throw new Error("User Not Authenticated");
      }
    } catch (err) {
      toast.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    loadAboutPage();
  }, []);

  return (
    <div className="aboutPage">
      <form
        method="GET"
        className="aboutBox shadow-lg rounded-md p-4 grid grid-cols-3"
      >
        <div>
          <div>
            <img
              width="100"
              src="https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
              alt="Pic"
            />
            <div>change pic</div>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2">
          <div>
            <div>{data.name}</div>
            <div className="text-sky-600">Web Developer</div>
            <div>
              Ranking <b>1/10</b>
            </div>
          </div>
          <div className="editProfile bg-gray-200 justify-self-end h-min p-2 px-3 rounded-md cursor-pointer">
            Edit Profile
          </div>
        </div>

        <div className="col1">
          <ul>
            <li>Gamer</li>
            <li>Web Developer</li>
            <li>Comedian</li>
            <li>Instagram</li>
            <li>Traveller</li>
          </ul>
        </div>

        <div className="col2">
          <ul>
            <li>Use id</li>
            <li>Name</li>
            <li>Email</li>
            <li>Phone</li>
            <li>Profession</li>
          </ul>
        </div>

        <div className="col3">
          <ul>
            <li className="text-sky-600">{data._id}</li>
            <li className="text-sky-600">{data.name}</li>
            <li className="text-sky-600">{data.email}</li>
            <li className="text-sky-600">{data.phone}</li>
            <li className="text-sky-600">Web Developer</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default About;

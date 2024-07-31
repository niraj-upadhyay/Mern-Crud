import React, { useEffect, useState, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Detail() {


  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const getdata = useCallback(async () => {
    const res = await fetch(`/register/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      alert("Error: Unable to find data");
      console.log("Error");
    } else {
      setUserdata(data);
      console.log("Get Data");
    }
  }, [id]);

  useEffect(() => {
    getdata();
  }, [getdata]);

  const deleteuser = async(id)=>{
    const res2 =  await fetch(`/register/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const deletedata = await res2.json();
    console.log(deletedata);
  
    if(res2.status === 401 || !deletedata){
      console.log("error");
    }else{
      console.log("user deleted");
      navigate("/");
    }
  }


  return (
    <div className="container mt-4">
      <h1 style={{ fontWeight: 400 }}>Welcome Niraj Upadhyay</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="d-flex justify-content-end mb-3">
           <Link to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2"><EditIcon /></button></Link>
            <button className="btn btn-danger" onClick={()=>deleteuser(getuserdata._id)}><DeleteIcon /></button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-2">
                Name : <span>{getuserdata.name}</span>
              </h3 >
              <h3 className="mt-2">
                Age : <span>{getuserdata.age}</span>
              </h3>
              <p className="mt-2">
                <EmailIcon /> : Email : <span>{getuserdata.email}</span>
              </p>
              <p className="mt-2">
                <WorkIcon /> : Work : <span>{getuserdata.work}</span>
              </p>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-4">
                <SmartphoneIcon /> : Mobile : <span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-2">
                <LocationOnIcon /> : Location : <span>{getuserdata.add}</span>
              </p>
              <p className="mt-2">
                Description :{" "}
                <span> {getuserdata.desc}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

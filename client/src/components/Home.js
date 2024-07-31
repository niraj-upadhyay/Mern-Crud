import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function Home() {

  const [getuserdata,setUserdata] = useState([]);
   console.log(getuserdata);
  const getpdata = async (e) => {
   

    const res = await fetch("/register", {
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
      // alert("Get Data");
      console.log("Get Data");
    }
  };

 useEffect(()=>{
  getpdata();
 },[]);


  //  Delete user

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
    getpdata();
  }
}





  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <Link   className="btn btn-primary"  to ="/register" >Add Data</Link>
        </div>

        <table className="table mt-4">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
              {
                getuserdata.map((element,id)=>{
                  return(
                    <>
                <tr>
                    <th scope="row">{id+1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>7{element.mobile}</td>
                    <td className="d-flex justify-content-between ">
                      <Link to={`view/${element._id}`}><button className="btn btn-success"><VisibilityIcon/></button> </Link> 
                      <Link to={`edit/${element._id}`}> <button className="btn btn-primary"><EditIcon/></button></Link>
                      <button className="btn btn-danger" onClick={()=>deleteuser(element._id)}><DeleteIcon/></button>
                    </td>
                  </tr>
                    </>
                  )
                })
              }
           

            
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

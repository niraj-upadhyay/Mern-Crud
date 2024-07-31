import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Register() {

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [work, setWork] = useState("");
  const [add, setAdd] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const getdata = useCallback(async () => {
    if (id) {
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
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setMobile(data.mobile);
        setWork(data.work);
        setAdd(data.add);
        setDesc(data.desc);
        console.log("Get Data");
      }
    }
  }, [id]);

  useEffect(() => {
    getdata();
  }, [getdata]);

  const updatedata = async (e) => {
    e.preventDefault();
  
    const method = id ? "PATCH" : "POST";
    const url = id ? `/register/${id}` : "/register";
  
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      }),
    });
  
    const text = await res.text(); // Get response as text
    try {
      const data = JSON.parse(text); // Try to parse as JSON
      console.log(data);
  
      if (res.status === 404 || !data) {
        alert("Error: Unable to submit data");
        console.log("Error");
      } else {
        alert(id ? "Data updated successfully" : "Data added successfully");
        navigate("/"); // Redirect to the homepage or another page after submitting
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Response text:", text);
      alert("Error: Invalid server response");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card mt-4">
          <h2 className="text-center mt-4">{id ? "Update Form" : "Register Form"}</h2>
          <div className="container">
            <form onSubmit={updatedata}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mt-2">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="age">Age:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      id="age"
                      name="age"
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="work">Work:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                      id="work"
                      name="work"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mt-2">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      id="mobile"
                      name="mobile"
                    />
                  </div>

                  <div className="mt-2">
                    <label htmlFor="add">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={add}
                      onChange={(e) => setAdd(e.target.value)}
                      id="add"
                      name="add"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 mb-4">
                <label htmlFor="desc">Description:</label>
                <textarea
                  className="form-control"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  id="desc"
                  name="desc"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

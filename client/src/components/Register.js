import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [work, setWork] = useState("");
  const [add, setAdd] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();


  const addinpdata = async (e) => {
    e.preventDefault();

    const res = await fetch("/register", {
        method: "POST",
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

    const data = await res.json();

    if (res.status === 400 || res.status === 500 || !data) {
        alert(data.error || "Error: Unable to submit data");
        console.log("Error:", data.error || "Unable to submit data");
    } else if (res.status === 201) {
        alert("Data added successfully");
        navigate("/");
    }
};

  return (
    <>
      <div className="container mt-5">
        <div className="card mt-4">
          <h2 className="text-center mt-4">Registration Form</h2>
          <div className="container">
            <form onSubmit={addinpdata}>
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
              <div className="text-center">
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

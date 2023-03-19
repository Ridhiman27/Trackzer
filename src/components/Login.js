import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {

  const host = "http://localhost:5000";
  const history = useHistory();
  const[credentials,setCredentials]=useState({email:"",password:""});

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({email:credentials.email,password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authtoken);
      history.push('/');
      props.showAlert("Login Successfully","success");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Login to continue to TrackZer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            required
            className="form-control"
            value={credentials.email}
            id="exampleInputEmail1"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            required
            name="password"
            value={credentials.password}
            className="form-control"
            id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
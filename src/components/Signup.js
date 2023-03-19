import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const host = "http://localhost:5000";
  const history = useHistory();
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createUser`,{
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
      props.showAlert("Successfully Signed Up","success");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            onChange={onChange}
            type="text"
            name='name'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            type="email"
            name='email'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            type="password"
            name='password'
            className="form-control"
            id="exampleInputPassword1"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label" >
            Confirm Password
          </label>
          <input
            onChange={onChange}
            type="password"
            className="form-control"
            required
            minLength={5}
            name='cpassword'
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup

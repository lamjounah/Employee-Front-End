/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import React from 'react'
import { createEmployee, getEmployee } from "../services/EmployeeService"
import { useNavigate } from "react-router-dom"


const EmployeeComponent = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')

    const [errors,setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })
    
    const navigator =useNavigate();
            let id = 1;
             useEffect(() => {
                if(id ){
                    getEmployee(id).then((Response)=>{
                        setFirstName(Response.data.firstName);
                        setLastName(Response.data.lastName);
                        setEmail(Response.data.email);
                    }).catch(error=>{
                        console.error(error);
                    })
                }
             })
   
     function saveEmployee(e){
        
        e.preventDefault(); 
        if(validateForm()){
        const  employee = {firstName,lastName,email}
        console.log(employee)

        createEmployee(employee).then((Response)=>{
            console.log(Response.data);
            navigator('/employees');
        })
       }
     }
      function validateForm(){
        let valid =true;
        const errorsCopy = {... errors}
        if(firstName.trim()){
            errorsCopy.firstName='';
        }else{
            errorsCopy.firstName= 'First name is required ';
            valid = false ;
        }
        if(lastName.trim()){
            errorsCopy.lastName='';
        }else{
            errorsCopy.lastName= 'last name is required ';
            valid = false ;
        }
        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email= ' Email name is required ';
            valid = false ;
        }

        setErrors(errorsCopy);
        return valid;

      }


  return (
    <div>
        <br/><br/>
        <div className="container">
            <div className="row">
                <div className="card  col-md-6 offset-md-3 ">
                    <h2 className="text-center"> Add Employee </h2>
                    <div className="card-body">
                        <form>
                            <div className="from-group mb-2">
                                <label className="form-label">First Name </label>
                                <input type="text" placeholder="enter FN"
                                 name="firstName"
                                 value={firstName}
                                 className={`form-control ${errors.firstName? 'is-invalid':''} `}
                                 onChange={(e)=> setFirstName(e.target.value)}
                                 ></input>
                                 {errors.firstName &&<div className="invalid-feedback">{errors.firstName}</div>}

                            </div>
                            <div className="from-group mb-2">
                                <label className="form-label">last Name </label>
                                <input type="text" placeholder="enter LN"
                                 name="lastName"
                                 value={lastName}
                                 className={`form-control ${errors.lastName? 'is-invalid':''} `}
                                 onChange={(e)=> setLastName(e.target.value)}
                                 ></input>
                                 {errors.lastName &&<div className="invalid-feedback">{errors.lastName}</div>}

                            </div>
                            <div className="from-group mb-2">
                                <label className="form-label"> Email </label>
                                <input type="text" placeholder="enter email"
                                 name="Email"
                                 value={email}
                                 className={`form-control ${errors.email? 'is-invalid':''} `}
                                 onChange={(e)=> setEmail(e.target.value)}
                                 ></input>
                          {errors.email &&<div className="invalid-feedback">{errors.email}</div>}


                            </div>
                            <button className="btn btn-success" onClick={saveEmployee}>Submit </button>

                        </form>

                    </div>

                </div>

            </div>


        </div>
        <br/><br/>

    </div>

  )
}

export default EmployeeComponent
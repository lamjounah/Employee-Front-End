/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import React from 'react'
import { createEmployee, deleteEmployee, getEmployee, updateEmpolyee } from "../services/EmployeeService"
import { useNavigate ,useParams } from "react-router-dom"

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        socialSecurityCode: '',
        gender: '',
        socialStatus: '',
        address: '',
        country: '',
        region: '',
        city: '',
        numberRoute: '',
        postalCode: '',
        phoneNumber: '',
        postalAddress: '',
        bankName: '',
        accountNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setEmployee(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);
   
    function saveOrUpdateEmployee(e) {
        e.preventDefault(); 
        if (validateForm()) {
            if (id) {
                updateEmpolyee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
        for (const key in employee) {
            if (key in employee) {
                if (employee[key].trim()) {
                    errorsCopy[key] = '';
                } else {
                    errorsCopy[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                    valid = false;
                }
            }
        }
        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h2 className="text-center">Add Employee</h2>
                        <div className="card-body">
                            <form>
                                {Object.keys(employee).map((key, index) => (
                                    <div className="from-group mb-2" key={index}>
                                        <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                        <input
                                            type="text"
                                            placeholder={`Enter ${key}`}
                                            name={key}
                                            value={employee[key]}
                                            className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                            onChange={(e) => setEmployee({ ...employee, [key]: e.target.value })}
                                        />
                                        {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                                    </div>
                                ))}
                                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
        </div>
    );
}

export default EmployeeComponent;

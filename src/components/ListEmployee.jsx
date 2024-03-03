/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        listEmployee().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee </h2>
        } else {
            return <h2 className='text-center'>Add Employee </h2>
        }
    }

    function removeEmployee(id) {
        deleteEmployee(id).then((response) => {
            getAllEmployee();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">List Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}> Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Social Security Code</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Social Status</th>
                        <th scope="col">Address</th>
                        <th scope="col">Country</th>
                        <th scope="col">Region</th>
                        <th scope="col">City</th>
                        <th scope="col">Number Route</th>
                        <th scope="col">Postal Code</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Postal Address</th>
                        <th scope="col">Bank Name</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">CVV</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.socialSecurityCode}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.socialStatus}</td>
                            <td>{employee.address}</td>
                            <td>{employee.country}</td>
                            <td>{employee.region}</td>
                            <td>{employee.city}</td>
                            <td>{employee.numberRoute}</td>
                            <td>{employee.postalCode}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.postalAddress}</td>
                            <td>{employee.bankName}</td>
                            <td>{employee.accountNumber}</td>
                            <td>{employee.expirationDate}</td>
                            <td>{employee.cvv}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;

/* eslint-disable no-unused-vars */

import React,{useEffect, useState} from 'react';
import { listEmployee } from '../services/EmployeeService';
import { useNavigate ,useParams } from 'react-router-dom';

const ListEmployeeComponent = () => {
    
    const [employees,setEmployees] = useState([])


    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        listEmployee().then((Response) => {
            setEmployees(Response.data);
        }).catch(error=>{
            console.error(error);
        })
    },[])

    function addNewEmployee(){
      navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }
    
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee </h2>
        }else{
            return <h2 className='text-center'>Add Employee </h2>

        }
    }

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">List Employees</h2>
            <button className='btn btn-primary mb-2'  onClick={addNewEmployee}> Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
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
                            <td>
                                <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;

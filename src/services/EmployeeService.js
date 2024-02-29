import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8083/api/employees';

export const listEmployee = () => axios.get(REST_API_BASE_URL);

export const createEmployee =(employee) => axios.post(REST_API_BASE_URL,employee);
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId);


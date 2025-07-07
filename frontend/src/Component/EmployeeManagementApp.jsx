import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';


const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateEmpObj, setUpdateEmpObj] = useState(null);
    const [employeeData, setEmployeeData] = useState({
  employees: [], // ✅ must be an array
  pagination: {
    totalEmployees: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 5
  }
});

const fetchEmployees = async (search = '', page = 1, limit = 5) => {
  try {
    const response = await GetAllEmployees(search, page, limit);
    if (response?.success) {
      setEmployeeData(response.data); // ✅ Direct assignment
    } else {
      notify("Failed to fetch employees", "error");
    }
  } catch (err) {
    console.log(err);
    notify("Something went wrong", "error");
  }
};



    useEffect(()=>{
        fetchEmployees();
    },[])

    const handleAddEmployee = ()=>{
        setShowModal(true)
    }

    const handleUpdatedEmployee = (empObj)=>{
        console.log('update obj', empObj);
        setUpdateEmpObj(empObj);
        setShowModal(true);
    }
    
    const handleDeleteEmployee = async (emp)=> {
        try{
            const {message, success} = await DeleteEmployeeById(emp._id);
            fetchEmployees();
            if(success){
                        notify(message, 'success');
                    }else{
                        notify(message, 'error');
                    }
        }catch(err){
            console.log(err);
            notify(err, 'error');

        }
    }

    //search function 
    const handleSearch = (e)=>{
        const term = e.target.value;
        fetchEmployees(term);
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Employee Management App</h1>
            <div className='w-100 d-flex justify-content-center '>
                <div className='w-80 border bg-light p-3W' style={{width: '80%'}}>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <button className='btn btn-primary'
                        onClick={()=> handleAddEmployee()}
                        >
                            Add
                            </button>
                        <input 
                        type="text" 
                        placeholder='Search Employees...' 
                        className='form-control w-50'
                        onChange={handleSearch}
                        />
                    </div>

                    <EmployeeTable
                    handleUpdatedEmployee={handleUpdatedEmployee}
                 fetchEmployees={fetchEmployees}
                 employees = {employeeData.employees} 
                 pagination = {employeeData.pagination}
            handleDeleteEmployee={handleDeleteEmployee}
            />

            <AddEmployee
            updateEmpObj={updateEmpObj}
            fetchEmployees={fetchEmployees}
                  showModal={showModal}
                  setShowModal={setShowModal}
            />
            </div>
            </div>
            
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />

        </div>
    );
}

export default EmployeeManagementApp;

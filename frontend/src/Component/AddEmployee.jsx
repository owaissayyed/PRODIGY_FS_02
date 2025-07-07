import React, { useState, useEffect } from 'react';
import { CreateEmployee, updateEmployeeById } from '../api';
import { notify } from '../utils';


const AddEmployee = ({showModal, setShowModal, fetchEmployees, updateEmpObj}) => {
    const [employee, SetEmployee] = useState({
        name:'',
        email:'',
        phone:'',
        department:'',
        salary:'',
        profileImage: null
    })
    const [updateMode, setUpadateMode] = useState(false);

    useEffect(() => {
  if (updateEmpObj) {
    setUpadateMode(true);
    SetEmployee({
      name: updateEmpObj.name || '',
      email: updateEmpObj.email || '',
      phone: updateEmpObj.phone || '',
      department: updateEmpObj.department || '',
      salary: updateEmpObj.salary || '',
      profileImage: updateEmpObj.profileImage || null,
      id: updateEmpObj._id || updateEmpObj.id || ''
    });
  } else {
    setUpadateMode(false);
    resetEmployeeStates();
  }
}, [updateEmpObj]);

    const resetEmployeeStates = ()=>{
        SetEmployee({
        name:'',
        email:'',
        phone:'',
        department:'',
        salary:'',
        profileImage: null
    })
    }

    const handleClose = () => {
    setShowModal(false);
}

const handleChange = (e) => {
    const {name, value} = e.target;
    SetEmployee({...employee, [name]: value})
}

const handleFileChange = (e) =>{
    SetEmployee({...employee, profileImage: e.target.files[0]});
}

const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(employee);
    try{
        const {success, message} =
        updateMode ? 
        await updateEmployeeById(employee, employee.id) : 
        await CreateEmployee(employee);
        console.log(success, message);
        if(success){
            notify(message, 'success');
        }else{
            notify(message, 'error');
        }
        setShowModal(false);
        resetEmployeeStates();
        fetchEmployees();
    }catch(err){
        notify('Failed to create Employee', 'error')
    }
}
    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`}
            tabIndex={-1} role='dialog' style={{
                display: showModal ? 'block' : 'none'
            }}
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5>
                            {updateMode ? 'Update Employee' : 'Add Employee' }
                        </h5>
                        <button type='button' className='btn-close' onClick={()=> handleClose()}></button>
                    </div>

                    <div className='modal-body'>
                        <form onSubmit={(e)=> handleSubmit(e)}>
                            <div className='md-3 '>
                                <label className='form-label'>Name</label>
                                <input 
                                type="text" 
                                className='form-control'
                                name='name'
                                value={employee.name}
                                onChange={handleChange}
                                required                                />
                            </div>

                            <div className='md-3 '>
                                <label className='form-label'>Email</label>
                                <input 
                                type="text" 
                                className='form-control'
                                name='email'
                                value={employee.email}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className='md-3 '>
                                <label className='form-label'>Phone</label>
                                <input 
                                type="text" 
                                className='form-control'
                                name='phone'
                                value={employee.phone}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className='md-3 '>
                                <label className='form-label'>Department</label>
                                <input 
                                type="text" 
                                className='form-control'
                                name='department'
                                value={employee.department}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className='md-3 '>
                                <label className='form-label'>Salary</label>
                                <input 
                                type="text" 
                                className='form-control'
                                name='salary'
                                value={employee.salary}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className='md-3 '>
                                <label className='form-label'>Profile Image</label>
                                <input 
                                type="file" 
                                className='form-control'
                                name='profileImage'
                                onChange={handleFileChange}
                                />
                            </div>

                            <button className='btn btn-primary'>
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;

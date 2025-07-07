import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById } from '../api';

const EmployeeDetails = () => {
    const {id} = useParams();
    const [empDetails, setEmpDetails] = useState({})
    const navigate = useNavigate();
    console.log(id);

    const fetchEmpById = async ()=>{
        try{
                const {data} = await GetEmployeeById(id);
                console.log(data);
                setEmpDetails(data);
            }catch(err){
                notify('Failed to fetch Employee', 'error')
            }
    }
    useEffect(()=>{
        fetchEmpById();
    },[])
    return (
        <div className='container mt-5'>
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>

                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col md-3">
                        <img 
                        src={empDetails.profileImage || 'https://via.placeholder.com/150'} 
                        alt={empDetails.name}
                        className='img-fluid rounded' 
                        />
                    </div>

                    <div className="col-md-9">
                        <h4>{empDetails.name}</h4>
                        <p><strong>Email:</strong>  {empDetails.email}</p>
                        <p><strong>Phone:</strong>  {empDetails.phone}</p>
                        <p><strong>Department:</strong>  {empDetails.department}</p>
                        <p><strong>Salary:</strong>  {empDetails.salary}</p>
                    </div>

                    </div>

                    <button 
                    className="btn btn-primary"
                    onClick={()=> navigate('/employee')}
                    >
                        Back
                        </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;

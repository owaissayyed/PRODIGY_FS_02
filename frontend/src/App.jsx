import React from 'react';
import {BrowserRouter , Navigate, Route, Routes} from "react-router-dom"
import EmployeeManagementApp from './Component/EmployeeManagementApp';
import EmployeeDetails from './Component/EmployeeDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="employee"/>}/>
        <Route path='/employee' element={<EmployeeManagementApp/>}/>
        <Route path='/employee/:id' element={<EmployeeDetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

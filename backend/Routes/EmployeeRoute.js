const { createEmployee, getAllEmployees, getEmployeesId, deleteEmployeesById, updateEmployeeById } = require('../Controller/EmployeeController');
const { cloudinaryFileUploader } = require('../Middleware/FileUploader');

const routes = require('express').Router();

routes.get('/', getAllEmployees);

routes.post('/',cloudinaryFileUploader.single('profileImage') , createEmployee);

routes.put('/:id',cloudinaryFileUploader.single('profileImage') , updateEmployeeById);

routes.get('/:id', getEmployeesId);

routes.delete('/:id', deleteEmployeesById);

module.exports = routes;
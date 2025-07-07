const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req,res)=>{
    try{
        const body = req.body
         body.profileImage = req.file ? req.file?.path: null;
         const emp = new EmployeeModel(body);
         console.log(body);
         await emp.save()
         res.status(201).json({
            message:"Employee created",
            success: true,
         })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async (req,res)=>{
    try{
        const {name , email, phone , salary, department} = req.body
        const {id} = req.params;

        let updateData ={
            name, email, phone, department, salary, updatedAt: new Date()
        }

        if(req.file){
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            {new: true}
        )

        if(!updateEmployee){
            return res.status(404).json({
                message: 'Employee not found'
            });

        }

         res.status(200).json({
            message:"Employee Updated",
            success: true,
            data: updateEmployee 
         })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req,res)=>{
    try{
        let {page , limit, search} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;
        //page = 1 => (1-1) * 5 = 0 /In first page there is no skip of data
        //page = 2 => (2-1) * 5 = 5 /five data skip of first page 
        //page = 3 => (3-1) * 5 = 10 /First page 5 data skip 2nd page 5 data skip

        let searchCriteria = {};
        if(search){
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i' //case insensitive
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

         const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({updatedAt: -1});

            const totalPages = Math.ceil(totalEmployees / limit);
         res.status(200).json({
            message:"All Employees",
            success: true,
            data: {
                employees: emps,
                pagination:{
                    totalEmployees,
                    currentPage: page,
                    totalPages,
                    pageSize: limit
                }
            }
         })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
            console.log(err)
    }
}

const getEmployeesId = async (req,res)=>{
    try{
        const {id} = req.params;
         const emp = await EmployeeModel.findOne ({_id: id});
         res.status(200).json({
            message:"Get Employee Details",
            success: true,
            data: emp
         })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err,
        })
    }
}

const deleteEmployeesById = async (req,res)=>{
    try{
        const {id} = req.params;
         const emp = await EmployeeModel.findByIdAndDelete ({_id: id});
         res.status(200).json({
            message:"Employee Deleted",
            success: true,
         })
    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

module.exports ={
    createEmployee,
    getAllEmployees,
    getEmployeesId,
    deleteEmployeesById,
    updateEmployeeById
}
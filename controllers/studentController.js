const model = require('../models/index');

const studentController = {
    index: async(req, res) => {
        const students = await model.users.findAll();
        if(students) {
            res.status(200).json({
                status: true, 
                message: 'Student fetched successfully',
                data: students
            });
        } else {
            res.status(500).json({status: false, message: 'Student not found'})
        }
    }
}

module.exports = studentController
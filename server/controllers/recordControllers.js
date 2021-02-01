import Records from '../Model/Records.js'


class recordControllers{
    // View All records
    static getRecords(req,res){
        return res.status(200).json({
            message:"Record Founds",
            data:Records
        })
    }
    // Create a new Record
    static createRecord(req,res){
        const {title,type,comment,location,status,images,videos} = req.body;

        const newRecord = {
            id:Records.length +1,
            title,type,comment,location,status,images,videos
        }

        Records.push(newRecord);
        return res.status(201).json({
            status:res.statusCode,
            message:'Record Created Successfully!',
            data:newRecord
        })
    }
    // Getting a single record
    static getSingleRecord(req,res){
        const foundRecord = Records.find((record)=>record.id === parseInt(req.params.id));
        if(!foundRecord){
            return res.status(400).json({
                message:"Record not found"
            });
        }
        return res.status(200).json({message:"Record found",
        data:{status:res.statusCode,record:foundRecord}})
    
    }
}




export default recordControllers;
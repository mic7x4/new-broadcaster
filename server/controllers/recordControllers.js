import Records from '../Model/Records.js'


class recordControllers{
    static getRecords(req,res){
        return res.status(200).json({
            message:"Record Founds",
            data:Records
        })
    }

    static createRecord(req,res){
        const {title,type,comment,location,status,images,videos} = req.body;

        const newRecord = {
            id:Records.length +1,
            title,type,comment,location,status,images,videos
        }

        Records.push(newRecord);
        console.log(newRecord);
        return res.status(201).json({
            status:res.statusCode,
            message:'Record Created Successfully!',
            data:newRecord
        })
    }
}




export default recordControllers;
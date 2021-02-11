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
    // Edit record Comment 
    static editComment(req,res){
        const commentIndex = Records.findIndex((comment) => comment.id === parseInt(req.params.id,10));
        if(Records[commentIndex].status == 'draft'){
            if(commentIndex >= 0) {
            Records[commentIndex].comment = req.body.comment;
            return res.status(200).json({
                status:res.statusCode,
                message:"Comment updated Successfully!",
                data:Records[commentIndex]
            });
        }else{
        return res.status(404).json({
            status:res.statusCode,
            error:'Comment with given ID not found'
        });
        }
        }
        return res.status(400).json({
            status:res.statusCode,
            message:'You can\'t edit this record it is into Investigation'
        });
    }
    // Edit Record Location
    static editLocation(req,res) {
        const locationIndex = Records.findIndex((location) => location.id === parseInt(req.params.id,10));
        console.log(Records[locationIndex].id);
        if(Records[locationIndex].status === 'draft'){
            if(locationIndex>=0){
                Records[locationIndex].location = req.body.location;
                return res.status(200).json({
                    status:res.statusCode,
                    message:'Record Location updated Successfully',
                    data:Records[locationIndex]
                });
            }
            
        }
        return res.status(400).json({
            status:res.statusCode,
            message:"You can't edit this record"
        });
        }
        static deleteRecord(req,res){
            const findRecord = Records.find((record) => record.id === parseInt(req.params.id,10));
            if(findRecord.status === 'draft') {
                if(!findRecord){
                    return res.status(404).json({
                        message:'The record of the given id not found'
                    });
                }
                const index = Records.indexOf(findRecord);
                Records.splice(index,1);
                return res.status(200).json({
                    status:res.statusCode,
                    message:'Record has been deleted',
                    data:findRecord
                });
            }
            return res.status(400).json({
                status:res.statusCode,
                message:"You can't delete this Record"
            })
        }
    }





export default recordControllers;
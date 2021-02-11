import generalValidator from './index.js';
import Joi from 'joi';



const recordValidation = {
    createRecord: (req,res,next) =>{
        const schema = Joi.object().keys({
            type:Joi.string().required().message({message:'Provide type'}),
            location: Joi.string().required().message({message:'Provide type'}),
            comment: Joi.string().required().message({message:'Provide type'}),
            status:Joi.string().required().message({message:'Provide type'}),
            images:Joi.string().required().message({message:'Provide type'}),
            videos:Joi.string().required()
        });
    generalValidator(req.body,schema,res,next)
    },
    recordId:(req,res,next) => {
        const schema = Joi.object().keys({
            id:Joi.number().required()
        });
        generalValidator(req.params, schema, res, next);
    }
};

export default recordValidation;
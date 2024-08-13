const User = require("../schema/schema");

const service = {
    save: async function(data) {
        return await User.create(data); 
    },

    getAll:async function(){
        return await User.find();
    },

    findById:async function (id) {
        return await User.findById(id);
    },

    update:async function(id,data){
        const updatedData= await User.findOneAndUpdate({_id:id},data);
        return updatedData;
    },

    delete:async function(id){
        const deletedData=await User.findOneAndDelete({_id:id});
        return deletedData
        }
};

module.exports = service;

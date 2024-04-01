const mongoose=require('mongoose');

const regSchema= mongoose.Schema({
    UserName:String,
    BirthDate:Date,
    Email:String,
    Password:String,
    token: {
        type:String,
        default:null
    }
})

module.exports=mongoose.model('reg', regSchema)
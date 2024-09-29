const mongoose  =require('mongoose')
const Schema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    stock:Number,
    image:String,
  });
  
  module.exports=mongoose.model('Chains',Schema);
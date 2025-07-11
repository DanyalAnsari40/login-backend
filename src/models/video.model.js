import mongoose, { Schema } from "mongoose";
// we can  npm it with  this with( npm i mongoose-aggregate-paginate-v2)
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// we can   do hash passwor and we use the npm( nnpm i bcrypt jsonwebtoken)
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"; 


const videoSchema = new Schema({
videoFile:{

    type: String,//cloudnary
    required:true,
},
thumbnil:{
    type: String,//cloudnary
    required:true,
},
title:{
    type: String,
    required:true,
},
discription:{
    type: String,
    required:true,
},
discription:{
    type: String,//cloudnary
    required:true,
},
duration:{
    type:Number,
    required:true,
},
viwes:{
    type:Number,
    default:0
},
isPublish:{
    type:Boolean,
    default:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
}


}, { timestamps: true });



videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("video", videoSchema)
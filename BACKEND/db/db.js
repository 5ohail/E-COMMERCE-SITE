import mongoose from "mongoose";
import dotenv from "dotenv";
 const connect = async () => {
   await mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   }).then(()=>{
        console.log("connected to db")
    }).catch(err =>
      console.log(err)
    )
}
export default connect;
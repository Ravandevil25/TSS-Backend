import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcrypt";


export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string; // we’ll hash later
  id: string;

  avatar: string;
  phone: string;
  
  bluetooth_address: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}



const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    id: {type: String, required:true, unique: true},
    avatar: {type: String, required:false},
    phone: {type: String, required:true, unique: true},

    bluetooth_address: {type: String, required:true, unique: true},

  },
  { timestamps: true }
);

// // hash password before saving
// teacherSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // compare password method
// teacherSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };


export default mongoose.model<ITeacher>("Teacher", teacherSchema);

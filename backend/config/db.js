import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Cluster0', 
    });
    console.log('Successfully connected to MongoDB 👍');
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

//'mongodb + srv://vikas:Vikas12@cluster0.m8mslct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//'mongodb + srv://vikas:Vikas12@cluster0.m8mslct.mongodb.net/'

export default connectDB;

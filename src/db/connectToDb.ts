import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  try{
    const mongoUri: string | undefined = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is required');
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to database'); 
  }catch(error: unknown){
    console.error('Error connecting to database', error);
  }
};

connectToDatabase();
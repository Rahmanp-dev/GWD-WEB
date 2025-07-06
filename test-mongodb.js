const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

async function testMongoDBConnection() {
    console.log('🧪 Testing MongoDB Connection...\n');

    const MONGODB_URI = process.env.MONGODB_URI;

    console.log('🔍 Environment check:');
    console.log('   MONGODB_URI:', MONGODB_URI ? '✅ Found' : '❌ Not found');
    console.log('   NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Found' : '❌ Not found');
    console.log('   NEXTAUTH_URL:', process.env.NEXTAUTH_URL ? '✅ Found' : '❌ Not found');

    if (!MONGODB_URI) {
        console.error('\n❌ MONGODB_URI not found in .env.local');
        console.error('Expected: MONGODB_URI=mongodb://127.0.0.1:27017/gwd');
        console.error('\n💡 Make sure .env.local exists in the project root');
        process.exit(1);
    }

    console.log('\n🔍 MongoDB URI:', MONGODB_URI);

    try {
        console.log('\n⏳ Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });

        console.log('✅ MongoDB connected successfully!');
        console.log('📊 Database:', mongoose.connection.db.databaseName);
        console.log('🔗 Connection state:', mongoose.connection.readyState);

        // Test creating a simple document
        const TestSchema = new mongoose.Schema({
            test: String,
            timestamp: { type: Date, default: Date.now }
        });

        const TestModel = mongoose.model('Test', TestSchema);

        const testDoc = await TestModel.create({
            test: 'Connection test successful'
        });

        console.log('✅ Test document created:', testDoc._id);

        // Clean up test document
        await TestModel.deleteOne({ _id: testDoc._id });
        console.log('🧹 Test document cleaned up');

        await mongoose.disconnect();
        console.log('✅ MongoDB disconnected');
        console.log('\n🎉 All tests passed! MongoDB is working correctly.');

    } catch (error) {
        console.error('\n❌ MongoDB connection failed:');
        console.error('Error:', error.message);
        console.error('\n💡 Make sure MongoDB is running locally:');
        console.error('   mongod --dbpath /path/to/data/directory');
        console.error('\n💡 Or install MongoDB Community Edition:');
        console.error('   https://www.mongodb.com/try/download/community');
        process.exit(1);
    }
}

testMongoDBConnection(); 
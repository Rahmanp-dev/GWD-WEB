const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/gwd-web-db";

async function testConnection() {
    try {
        console.log('🔌 Testing MongoDB connection...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connection successful!');

        // Test if we can access the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📚 Available collections:', collections.map(c => c.name));

        await mongoose.connection.close();
        console.log('🔌 Connection closed successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.log('\n💡 Make sure MongoDB is running on localhost:27017');
        console.log('   You can start MongoDB with: mongod');
    }
}

testConnection(); 
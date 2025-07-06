// scripts/seed.ts
import mongoose from 'mongoose';

import Client from '../lib/models/Client';
import Inquiry from '../lib/models/Inquiry';
import Project from '../lib/models/Project';

const MONGODB_URI = "mongodb://localhost:27017/gwd-web-db";

const sampleClients = [
  { name: 'Creative Solutions Inc.', email: 'contact@creativesolutions.com', company: 'Creative Solutions Inc.' },
  { name: 'Tech Innovators LLC', email: 'hello@techinnovators.com', company: 'Tech Innovators LLC' },
  { name: 'Global Marketing Group', email: 'info@globalmarketing.com', company: 'Global Marketing Group' },
];

const sampleInquiries = [
  { name: 'Alice Johnson', email: 'alice@example.com', service: 'Web Dev', budget: '$5,000 - $10,000', status: 'new' },
  { name: 'Bob Williams', email: 'bob@example.com', service: 'App Dev', budget: '>$25,000', status: 'contacted' },
  { name: 'Charlie Brown', email: 'charlie@example.com', service: 'Marketing', budget: '<$5,000', status: 'approved' },
];

const sampleProjects = [
    { title: 'E-commerce Platform', client: 'Creative Solutions Inc.', service: 'Web Dev', budget: '$8,000', status: 'inProgress', startDate: new Date('2023-01-15'), endDate: new Date('2023-04-30') },
    { title: 'Mobile Banking App', client: 'Tech Innovators LLC', service: 'App Dev', budget: '$30,000', status: 'completed', startDate: new Date('2022-11-01'), endDate: new Date('2023-03-20') },
    { title: 'Social Media Campaign', client: 'Global Marketing Group', service: 'Marketing', budget: '$4,500', status: 'new', startDate: new Date('2023-05-01'), endDate: new Date('2023-06-01') },
];


const seedDatabase = async () => {
  console.log('Attempting to connect to the database...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.error('🔴 Database connection failed. Please ensure your MongoDB server is running on localhost:27017');
    console.error('Error details:', error);
    process.exit(1);
  }

  try {
    console.log('🧹 Clearing existing data...');
    await Client.deleteMany({});
    await Inquiry.deleteMany({});
    await Project.deleteMany({});

    console.log('🌱 Inserting new data...');
    await Client.insertMany(sampleClients);
    await Inquiry.insertMany(sampleInquiries);
    await Project.insertMany(sampleProjects);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('🔴 Error seeding the database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedDatabase(); 
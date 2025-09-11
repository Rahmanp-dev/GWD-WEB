// scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from '../lib/models/Client';
import Inquiry from '../lib/models/Inquiry';
import Project from '../lib/models/Project';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

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
    {
      title: "E-commerce Platform for Fashion Brand",
      slug: "ecommerce-fashion-platform",
      domain: "Web Dev",
      yearStart: 2022,
      yearEnd: 2023,
      descriptionMarkdown: "A full-stack e-commerce solution with a custom CMS and integrated payment gateways.",
      mediaUrls: ["/images/fashion-ecommerce.jpg"],
      featured: true,
      status: 'published'
    },
    {
      title: "Mobile App for Fitness Tracking",
      slug: "fitness-tracker-app",
      domain: "App Dev",
      yearStart: 2021,
      yearEnd: 2022,
      descriptionMarkdown: "A cross-platform mobile app for iOS and Android to track workouts, nutrition, and progress.",
      mediaUrls: ["/images/fitness-app.jpg"],
      featured: true,
      status: 'published'
    },
    {
        title: "Brand Identity and Marketing Campaign",
        slug: "brand-identity-campaign",
        domain: "Marketing",
        yearStart: 2023,
        yearEnd: 2023,
        descriptionMarkdown: "Developed a new brand identity and executed a multi-channel marketing campaign to increase brand awareness.",
        mediaUrls: ["/images/marketing-campaign.jpg"],
        featured: false,
        status: 'published'
    },
    {
        title: "3D Product Visualization for Furniture Company",
        slug: "3d-product-visualization",
        domain: "3D & Motion",
        yearStart: 2022,
        yearEnd: 2023,
        descriptionMarkdown: "Created photorealistic 3D visualizations of furniture products for use in online catalogs and marketing materials.",
        mediaUrls: ["/images/3d-product-viz.jpg"],
        featured: true,
        status: 'published'
    }
];

async function seedDatabase() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Database connected.');

  console.log('Clearing existing data...');
  await Client.deleteMany({});
  await Inquiry.deleteMany({});
  await Project.deleteMany({});

  console.log('Seeding clients...');
  await Client.insertMany(sampleClients);

  console.log('Seeding inquiries...');
  await Inquiry.insertMany(sampleInquiries);
  
  console.log('Seeding projects...');
  await Project.insertMany(sampleProjects);

  console.log('Database seeded successfully!');

  await mongoose.connection.close();
}

seedDatabase().catch(err => {
  console.error('Error seeding database:', err);
  mongoose.connection.close();
});

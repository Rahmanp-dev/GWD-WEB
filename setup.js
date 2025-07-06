#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GWD Global Freelancer Weapon Wheel...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
} else {
    console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Generate Prisma client
console.log('\n🔧 Setting up database...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');
} catch (error) {
    console.error('❌ Failed to generate Prisma client');
    process.exit(1);
}

// Run database migrations
console.log('\n🗄️ Running database migrations...');
try {
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    console.log('✅ Database migrations completed');
} catch (error) {
    console.error('❌ Failed to run database migrations');
    console.log('💡 Make sure your .env file has the correct DATABASE_URL');
    process.exit(1);
}

// Seed the database
console.log('\n🌱 Seeding database...');
try {
    execSync('npm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');
} catch (error) {
    console.error('❌ Failed to seed database');
    process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Visit http://localhost:3000 to see the landing page');
console.log('3. Visit http://localhost:3000/admin/login to access the admin dashboard');
console.log('   - Email: admin@gwd.com');
console.log('   - Password: admin123');
console.log('\n📚 Check the README.md for more information'); 
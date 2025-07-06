#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing server error...\n');

// Step 1: Create .env file
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

// Step 2: Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('\n📦 Installing dependencies...');
    console.log('Please run: npm install');
} else {
    console.log('\n✅ Dependencies are installed');
}

// Step 3: Check if Prisma is set up
const prismaPath = path.join(process.cwd(), 'prisma');
if (fs.existsSync(prismaPath)) {
    console.log('\n🗄️ Database setup needed:');
    console.log('Please run these commands:');
    console.log('1. npx prisma generate');
    console.log('2. npx prisma migrate dev --name init');
    console.log('3. npm run db:seed');
} else {
    console.log('\n❌ Prisma directory not found');
}

console.log('\n🚀 After running the above commands, start the server with:');
console.log('npm run dev');
console.log('\n📚 For more help, check TROUBLESHOOTING.md'); 
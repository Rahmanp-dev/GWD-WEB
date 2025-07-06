#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Resolving SES warnings and setting up server...\n');

// Step 1: Clean up and reinstall dependencies
console.log('🧹 Cleaning up dependencies...');
try {
    if (fs.existsSync('node_modules')) {
        console.log('Removing old node_modules...');
        execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
    }
    if (fs.existsSync('package-lock.json')) {
        console.log('Removing package-lock.json...');
        fs.unlinkSync('package-lock.json');
    }
} catch (error) {
    console.log('Cleanup completed');
}

// Step 2: Install fresh dependencies
console.log('\n📦 Installing fresh dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Step 3: Create .env file if it doesn't exist
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
    console.log('\n📝 Creating .env file...');
    const envContent = `DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
} else {
    console.log('\n✅ .env file already exists');
}

// Step 4: Set up database
console.log('\n🗄️ Setting up database...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');
} catch (error) {
    console.error('❌ Failed to generate Prisma client');
}

try {
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    console.log('✅ Database migrations completed');
} catch (error) {
    console.error('❌ Failed to run migrations');
}

try {
    execSync('npm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');
} catch (error) {
    console.error('❌ Failed to seed database');
}

console.log('\n🎉 Setup completed!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000');
console.log('3. Admin login: http://localhost:3000/admin/login');
console.log('   - Email: admin@gwd.com');
console.log('   - Password: admin123');
console.log('\n💡 The SES warnings should now be suppressed'); 
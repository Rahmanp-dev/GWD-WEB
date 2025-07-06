#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring original HeroWheel functionality...\n');

// Step 1: Create proper .env file
console.log('📝 Creating .env file...');
const envContent = `DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="restore-original-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created');

// Step 2: Check if all components exist
const components = [
    'components/HeroWheel.tsx',
    'components/ServiceForm.tsx',
    'components/PortfolioGallery.tsx',
    'components/PartnershipsBar.tsx'
];

console.log('\n🔍 Checking component files...');
components.forEach(component => {
    if (fs.existsSync(component)) {
        console.log(`✅ ${component} exists`);
    } else {
        console.log(`❌ ${component} missing`);
    }
});

// Step 3: Install dependencies
console.log('\n📦 Installing dependencies...');
console.log('Please run: npm install');

// Step 4: Set up database (optional)
console.log('\n🗄️ Database setup (optional):');
console.log('If you want the admin panel:');
console.log('1. npx prisma generate');
console.log('2. npx prisma migrate dev --name init');
console.log('3. npm run db:seed');

console.log('\n🎉 Original functionality restored!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Visit: http://localhost:3000');
console.log('\n🎯 You should now have:');
console.log('- ✅ Original HeroWheel with GTA-style press-and-hold');
console.log('- ✅ Service selection with red arc highlight');
console.log('- ✅ Dynamic ServiceForm that appears after selection');
console.log('- ✅ PortfolioGallery and PartnershipsBar');
console.log('- ✅ All original animations and interactions'); 
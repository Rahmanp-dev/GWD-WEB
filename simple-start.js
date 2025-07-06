#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up a simple working version...\n');

// Step 1: Create a simple .env file
console.log('📝 Creating .env file...');
const envContent = `DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="simple-secret-for-development"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created');

// Step 2: Create a simple package.json without problematic dependencies
console.log('\n📦 Creating simplified package.json...');
const packageJson = {
    "name": "gwd-simple",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "next": "14.0.4",
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "lucide-react": "^0.292.0",
        "framer-motion": "^10.16.4",
        "@use-gesture/react": "^10.3.1",
        "date-fns": "^2.30.0",
        "react-date-range": "^1.4.0"
    },
    "devDependencies": {
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "@types/react-date-range": "^1.4.8",
        "autoprefixer": "^10.0.1",
        "eslint": "^8",
        "eslint-config-next": "14.0.4",
        "postcss": "^8",
        "tailwindcss": "^3.3.0",
        "typescript": "^5"
    }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Simplified package.json created');

console.log('\n🎉 Basic setup completed!');
console.log('\n📋 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Visit: http://localhost:3000');
console.log('\n💡 This will give you a working frontend without database complexity'); 
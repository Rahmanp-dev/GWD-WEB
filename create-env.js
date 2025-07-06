#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Creating proper .env file for NextAuth.js...\n');

// Generate a secure secret
const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

const envPath = path.join(process.cwd(), '.env');

// Create .env content with proper NextAuth configuration
const envContent = `# Database Configuration
DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"

# Development Configuration
NODE_ENV="development"`;

// Write .env file
fs.writeFileSync(envPath, envContent);

console.log('✅ .env file created with proper NextAuth.js configuration');
console.log('📝 Generated secure NEXTAUTH_SECRET');
console.log('🌐 Set NEXTAUTH_URL to http://localhost:3000');
console.log('\n🚀 You can now start the server with: npm run dev'); 
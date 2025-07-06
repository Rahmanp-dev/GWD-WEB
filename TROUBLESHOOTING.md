# Troubleshooting Guide

## Server Error Solutions

### 1. Database Connection Issues

If you're getting server errors related to the database:

**Solution 1: Create .env file**
Create a `.env` file in the root directory with:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Solution 2: Install missing dependencies**
```bash
npm install
```

**Solution 3: Set up database**
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 2. Missing Dependencies

If you get module not found errors:

```bash
npm install tsx @tanstack/react-table react-beautiful-dnd recharts next-auth
```

### 3. Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

### 4. TypeScript Errors

If you get TypeScript compilation errors:

```bash
npm run build
```

### 5. Authentication Issues

If admin login doesn't work:

1. Make sure the database is seeded
2. Use these credentials:
   - Email: `admin@gwd.com`
   - Password: `admin123`

### 6. Quick Fix Script

Run this to fix most common issues:

```bash
# Create .env file
echo 'DATABASE_URL="file:./dev.db"' > .env
echo 'NEXTAUTH_SECRET="your-secret-key-here"' >> .env
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env

# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed

# Start server
npm run dev
```

## Common Error Messages

### "Cannot find module '@prisma/client'"
- Run: `npm install @prisma/client`
- Then: `npx prisma generate`

### "Environment variable not found: DATABASE_URL"
- Create `.env` file with the database URL

### "Failed to fetch" errors in admin dashboard
- The app will fall back to mock data if database is unavailable
- Check database connection and run migrations

### "Invalid credentials" on login
- Make sure database is seeded with admin user
- Use correct credentials: `admin@gwd.com` / `admin123`

## Getting Help

If you're still experiencing issues:

1. Check the browser console for JavaScript errors
2. Check the terminal for server error messages
3. Ensure all dependencies are installed
4. Verify the `.env` file exists and has correct values
5. Try running the setup script: `node setup.js` 
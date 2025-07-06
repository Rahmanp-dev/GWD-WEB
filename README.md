# GWD Global Freelancer Weapon Wheel

A comprehensive landing page and admin dashboard for GWD Global, featuring a dynamic service selector, inquiry management, and full project administration.

## Features

### Frontend
- **Hero Wheel**: GTA-style radial service selector with press-and-hold interaction
- **Dynamic Inquiry Form**: Auto-populated based on service selection
- **Portfolio Gallery**: Showcase of completed projects
- **Partnerships Bar**: Display of client logos and testimonials

### Admin Dashboard
- **Dashboard Overview**: KPI cards and revenue charts
- **Inquiries Management**: Data table with search, filtering, and bulk actions
- **Project Kanban Board**: Drag-and-drop project management
- **Client Directory**: Client information and project history
- **Analytics**: Revenue trends, service distribution, and conversion funnels
- **Settings**: Admin profile and notification preferences

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Drag & Drop**: react-beautiful-dnd
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gwd-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Seed the database with initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Usage

### Frontend
- Visit `http://localhost:3000` to see the landing page
- Use the Hero Wheel to select services and submit inquiries
- Browse the portfolio gallery and partnerships

### Admin Dashboard
- Visit `http://localhost:3000/admin/login`
- Login credentials:
  - Email: `admin@gwd.com`
  - Password: `admin123`

### Admin Features
- **Dashboard**: View KPIs and revenue trends
- **Inquiries**: Manage client inquiries with status updates
- **Projects**: Use the Kanban board for project management
- **Clients**: View client directory and project history
- **Analytics**: Analyze revenue, services, and conversions
- **Settings**: Configure admin profile and notifications

## API Endpoints

### Inquiries
- `GET /api/inquiries` - Fetch all inquiries
- `POST /api/inquiries` - Create new inquiry
- `GET /api/inquiries/[id]` - Get specific inquiry
- `PUT /api/inquiries/[id]` - Update inquiry
- `DELETE /api/inquiries/[id]` - Delete inquiry

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Clients
- `GET /api/clients` - Fetch all clients
- `POST /api/clients` - Create new client

### Analytics
- `GET /api/analytics` - Get dashboard analytics data

## Database Schema

### Models
- **Client**: Client information and relationships
- **Inquiry**: Service inquiries with status tracking
- **Project**: Project details and management
- **Admin**: Admin user accounts and settings

## Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   └── ...               # Frontend components
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

### Adding New Features
1. Create database migrations: `npx prisma migrate dev`
2. Update API routes in `app/api/`
3. Create React components in `components/`
4. Add pages in `app/` directory

### Database Management
- **Reset database**: `npx prisma migrate reset`
- **View database**: `npx prisma studio`
- **Generate client**: `npx prisma generate`

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Ensure environment variables are set
- Run `npm run build` for production build
- Use `npm start` to run production server

## Security Notes

- Change default admin credentials in production
- Use proper password hashing (bcrypt) in production
- Set secure NEXTAUTH_SECRET
- Configure proper CORS settings
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 
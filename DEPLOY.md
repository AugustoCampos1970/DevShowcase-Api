# DevShowcase API - Deploy Configuration for Render

This guide explains how to deploy the DevShowcase API to Render.com.

## Prerequisites

1. GitHub account with the repository
2. Render account (free tier available)
3. PostgreSQL database (Render PostgreSQL or Supabase)

## Deployment Steps

### 1. Set up PostgreSQL Database

#### Option A: Render PostgreSQL (Recommended)
1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `devshowcase-db`
   - **Database**: `devshowcase_db`
   - **User**: Keep default
   - **Region**: Choose closest to you
   - **Plan**: Free (for testing) or Starter for production
4. Click "Create Database"
5. Copy the "Internal Database URL"

#### Option B: Supabase
1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database

### 2. Deploy the API to Render

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

#### Basic Settings
- **Name**: `devshowcase-api`
- **Region**: Choose closest to you
- **Branch**: `main` or your deployment branch
- **Root Directory**: (leave empty)

#### Build & Start Commands
- **Build Command**: `npm install && npx prisma generate`
- **Start Command**: `npm start`

#### Environment Variables
Click "Advanced" → Add the following environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/database"

# Server
PORT=3000
NODE_ENV="production"

# Security
JWT_SECRET="your-secure-random-secret-key"
```

**Important**: Replace `DATABASE_URL` with your actual PostgreSQL connection string.

#### Instance Type
- **Instance Type**: Free (for testing) or Starter for production
- **Auto-Deploy**: Yes (optional)

5. Click "Create Web Service"

### 3. Run Database Migrations

After deployment, run migrations:

1. Go to your Render service dashboard
2. Click "Shell" tab
3. Run:
```bash
npx prisma migrate deploy
```

Or create a one-off command:
1. In Render Dashboard: "New +" → "Background Worker"
2. Configure:
   - **Name**: `run-migrations`
   - **Command**: `npx prisma migrate deploy`
   - **Environment**: Same as web service

### 4. Seed Database (Optional)

To populate with sample data:
```bash
node prisma/seed.js
```

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (Render sets this automatically)
- `NODE_ENV`: Environment (production, development)

### Optional
- `JWT_SECRET`: Secret for JWT tokens (if implementing auth)
- `API_PREFIX`: API route prefix (default: `/api`)

## Health Checks

Render automatically monitors:
- `/health` endpoint (returns 200 OK)
- Application logs

## Monitoring & Logs

1. **Logs**: View in Render Dashboard → Your Service → Logs
2. **Metrics**: CPU, Memory, Request rates
3. **Alerts**: Set up alerts for errors or high latency

## Custom Domain (Optional)

1. Go to Render Dashboard → Your Service → Settings
2. Click "Custom Domain"
3. Add your domain and follow DNS instructions

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL is correct
   - Verify database is running
   - Check firewall/network access

2. **Migrations Failed**
   - Check Prisma schema compatibility
   - Run `npx prisma migrate dev` locally first
   - Check database permissions

3. **Build Failed**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json
   - Check build logs for specific errors

### Logs Location
- Render Dashboard → Your Service → Logs
- Application logs: `console.log` statements
- Error logs: Uncaught exceptions

## Cost Estimation

### Free Tier
- Web Service: 750 hours/month
- PostgreSQL: 90 hours/month
- Bandwidth: 100GB/month

### Production (Starter)
- Web Service: $7/month
- PostgreSQL: $7/month
- Additional costs for higher traffic

## Security Best Practices

1. **Never commit `.env` files**
2. **Use strong secrets** for JWT
3. **Enable HTTPS** (automatic on Render)
4. **Set up CORS** appropriately
5. **Regularly update dependencies**

## Support

- Render Docs: https://render.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Issues: GitHub repository issues

## Rollback

If deployment fails:
1. Go to Render Dashboard → Your Service
2. Click "Manual Deploy"
3. Select previous working commit
4. Deploy

---

**Note**: Free tier services sleep after inactivity. First request may be slow to wake up the service.
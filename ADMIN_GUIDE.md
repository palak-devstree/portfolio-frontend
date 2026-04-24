# Admin Panel Guide

## 🔐 Accessing the Admin Panel

### Login
1. Navigate to http://localhost:5173/admin/login
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Click "Login"

You'll be redirected to the admin dashboard.

## 📊 Admin Dashboard

The admin dashboard (`/admin/dashboard`) provides:
- Overview of all content counts
- Quick access to all management pages
- Quick action buttons for creating content

## 🛠️ Management Pages

### Profile Editor (`/admin/profile`)

Edit your portfolio profile information:

**Basic Information:**
- Full Name
- Job Title
- Tagline
- Years of Experience
- Professional Summary
- Skills (comma-separated)

**Contact & Links:**
- Email
- Phone
- Location
- GitHub URL
- LinkedIn URL
- Twitter URL

**Current Focus:**
- Currently Learning (comma-separated)
- Currently Building (comma-separated)
- Currently Exploring (comma-separated)

**Tips:**
- All changes are saved immediately
- Success message appears after saving
- Use comma-separated values for lists (skills, learning, etc.)

### Projects Manager (`/admin/projects`)

Manage your portfolio projects:

**Features:**
- View all projects
- Delete projects
- See project status (building, done, planned)
- View tech stack
- Access GitHub and live demo links

**Coming Soon:**
- Create new projects
- Edit existing projects
- Reorder projects

### Blog Manager (`/admin/blog`)

Manage blog posts:

**Features:**
- View all blog posts
- See published/draft status
- Delete posts
- View tags

**Coming Soon:**
- Create new posts
- Edit existing posts
- Rich text editor
- Markdown support

## 🎨 UI Features

### Loading States
- Spinner animations during data fetching
- Loading messages for context
- Smooth transitions

### Error Handling
- Clear error messages
- Retry buttons for failed requests
- Automatic error logging

### Navigation
- Breadcrumb navigation
- Back to dashboard links
- Logout button in header

## 🔒 Security

### Authentication
- JWT token-based authentication
- Tokens stored in localStorage
- Automatic token inclusion in API requests
- Auto-redirect to login on auth failure

### Protected Routes
All `/admin/*` routes (except `/admin/login`) require authentication.

## 📝 Content Guidelines

### Profile
- Keep tagline under 500 characters
- Professional summary should be concise but informative
- List 5-10 key skills
- Update "Current Focus" sections regularly

### Projects
- Use clear, descriptive titles
- Write concise descriptions (1-2 sentences)
- Include relevant tech stack
- Add GitHub and live demo links when available

### Blog Posts
- Write engaging titles
- Create compelling excerpts
- Use relevant tags (3-5 per post)
- Publish only when ready

## 🚀 Workflow

### Typical Admin Session

1. **Login** → `/admin/login`
2. **Dashboard** → View content overview
3. **Edit Profile** → Update personal information
4. **Manage Content** → Add/edit/delete projects, blog posts, etc.
5. **Preview** → Visit public pages to see changes
6. **Logout** → Click logout button

### Best Practices

1. **Regular Updates**
   - Update profile monthly
   - Add new projects as you build them
   - Write blog posts regularly

2. **Content Quality**
   - Proofread before publishing
   - Use consistent formatting
   - Keep information current

3. **Security**
   - Logout when done
   - Don't share admin credentials
   - Change default password in production

## 🐛 Troubleshooting

### Can't Login
- Check credentials (admin/admin123)
- Verify backend is running (http://localhost:8000)
- Check browser console for errors

### Changes Not Saving
- Check network tab for API errors
- Verify you're authenticated
- Try refreshing and logging in again

### Page Not Loading
- Check backend is running
- Verify API URL in `.env.local`
- Check browser console for errors

## 📚 API Endpoints Used

### Profile
- `GET /api/v1/profile` - Fetch profile
- `PUT /api/v1/admin/profile` - Update profile

### Projects
- `GET /api/v1/projects` - List projects
- `DELETE /api/v1/admin/projects/:id` - Delete project

### Blog
- `GET /api/v1/blog` - List blog posts
- `DELETE /api/v1/admin/blog/:id` - Delete post

### Auth
- `POST /api/v1/auth/login` - Login

## 🎯 Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save (in forms)
- `Esc` - Close modals
- `Tab` - Navigate form fields

## 📱 Mobile Support

The admin panel is responsive and works on:
- Desktop (recommended)
- Tablets
- Mobile phones (limited functionality)

For best experience, use desktop or tablet.

## 🔄 Future Features

Coming soon:
- Bulk operations
- Content scheduling
- Analytics dashboard
- Media library
- SEO settings
- Export/import data

## 💡 Tips & Tricks

1. **Use Browser Bookmarks**
   - Bookmark `/admin/dashboard` for quick access

2. **Keep Backend Running**
   - Always ensure backend is running before using admin panel

3. **Test Changes**
   - Visit public pages to verify changes
   - Use incognito mode to see public view

4. **Regular Backups**
   - Export data regularly (feature coming soon)
   - Keep database backups

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs: `docker-compose logs api`
3. Refer to INTEGRATION_GUIDE.md
4. Check API docs: http://localhost:8000/docs

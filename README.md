# The Unfiltered Trail Blog

Field-tested guides for Aussies traveling Korea & Vietnam. Real costs, no sponsored fluff.

## 📁 Project Structure

```
my-blog/
├── index.html          # Main blog homepage
├── about.html          # About page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── create-post.html    # Admin post creation
├── edit-post.html      # Admin post editing
├── login.html          # Admin login
├── posts.json          # Blog posts data (static deployment)
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # JavaScript utilities
├── images/             # Blog images and media
│   ├── Whisk_*.jpg     # Travel photos
│   └── ...
└── posts/              # Individual post pages (for static deployment)
    ├── lalalalall-yaya.html
    ├── night-night.html
    └── ...
```

## 🚀 Post Management System

This blog uses a **hybrid system** that works both locally (localStorage) and on deployed websites (JSON-based).

### Local Development (localhost)
- Posts are stored in browser's `localStorage`
- Use `create-post.html` to add new posts
- Use `edit-post.html` to modify existing posts
- Posts appear immediately without manual steps

### Deployed Website (production)
- Posts are read from `posts.json` file
- Requires manual JSON updates for new posts
- Individual post files needed in `posts/` directory

## ✏️ Adding New Posts

### Step 1: Create Post Content
1. Open `create-post.html` in your browser
2. Login as admin if prompted
3. Fill out the post form:
   - **Title**: Post headline
   - **Categories**: Select relevant travel categories
   - **Images**: Upload and organize travel photos
   - **Content**: Write your travel story

4. Click "Publish Post"
5. Check browser console for JSON output

### Step 2: Update posts.json
1. Copy the JSON object from browser console
2. Open `posts.json` in your editor
3. Add the new post to the `"posts"` array (at the beginning for newest first)
4. Save the file

```json
{
  "posts": [
    {
      "id": "post-1234567890123",
      "title": "Your New Post Title",
      "slug": "your-new-post-title",
      "content": "Your post content here...",
      "excerpt": "Brief description...",
      "categories": ["Category1", "Category2"],
      "author": "Trail Explorer",
      "publishDate": "2025-07-27",
      "createdAt": "2025-07-27T10:00:00.000Z",
      "images": [
        {
          "url": "images/your-image.jpg",
          "name": "Image Description",
          "size": "250 KB"
        }
      ],
      "featured": false,
      "region": "Asia"
    }
    // ... existing posts
  ]
}
```

### Step 3: Create Individual Post Page
1. Create `posts/[slug].html` file (use the slug from your JSON)
2. Copy template structure from existing post files
3. Include post content, images, and metadata
4. Ensure proper navigation links

### Step 4: Deploy Changes
1. Upload updated `posts.json`
2. Upload new post HTML file
3. Upload any new images to `images/` directory
4. Test the website to ensure posts appear correctly

## 🖼️ Image Management

### Image Upload Process
- Images are automatically compressed during upload
- Maximum size: 2MB per image (recommended for performance)
- Supported formats: PNG, JPG, JPEG
- Images are stored in `images/` directory

### Image Optimization Tips
- Use descriptive file names
- Compress images before upload for better loading speed
- Consider using WebP format for better compression
- Include alt text for accessibility

## 🎨 Customization

### Categories
Current travel categories:
- 🏯 K-Culture & Palaces
- 🍢 Street Food & Night Markets
- 🏞️ Mountains & Rice Terraces
- 🏝️ Beaches, Bays & Islands
- 🌃 City Vibes & Night-life
- 💸 Budget Hacks & Transport

To add new categories:
1. Update category options in `create-post.html`
2. Add corresponding styling in `css/style.css`
3. Update index page category grid if needed

### Styling
- Main styles: `css/style.css`
- CSS variables for easy color customization
- Responsive design for mobile/tablet/desktop
- Pinterest-style masonry layouts

## 🔐 Admin Access

### Login System
- Admin authentication via `login.html`
- Session-based access control
- Protected creation and editing features

### Admin Features
- Create new posts (`create-post.html`)
- Edit existing posts (`edit-post.html`)
- Delete posts (from homepage when logged in)
- Admin UI indicators and controls

## 🌐 Deployment

### Static Hosting Requirements
- Any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- No server-side processing required
- All dynamic features work client-side

### Pre-deployment Checklist
- [ ] All posts added to `posts.json`
- [ ] Individual post HTML files created
- [ ] Images uploaded to `images/` directory
- [ ] Navigation links tested
- [ ] Mobile responsiveness verified
- [ ] SEO metadata updated

## 🔧 Technical Details

### Performance Features
- Lazy loading for images
- CSS variables for consistent theming
- Minified and optimized assets
- Mobile-first responsive design
- Efficient JSON-based data loading

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement approach
- Fallback systems for older browsers

### SEO Optimization
- Structured data markup
- Open Graph tags
- Twitter Card support
- Semantic HTML structure
- Fast loading times

## 📞 Support

For technical issues or questions:
- Check browser console for error messages
- Verify JSON syntax in `posts.json`
- Ensure all file paths are correct
- Test on multiple devices and browsers

---

**Remember**: This system gives you the flexibility of dynamic content creation while maintaining the reliability and speed of static hosting. The localStorage system allows for easy local development, while the JSON system ensures your posts work perfectly on any deployed website.

Happy blogging and safe travels! 🌏✈️
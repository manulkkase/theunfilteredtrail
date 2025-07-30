# The Unfiltered Trail - Jekyll + Netlify CMS Blog

Field-tested guides for Aussies traveling Korea & Vietnam. Real costs, no sponsored fluff.

## 🚀 Jekyll + Netlify CMS Setup Complete!

This repository has been successfully converted from a static HTML/JavaScript blog to a fully functional Jekyll + Netlify CMS blog.

## 📁 Project Structure

```
my-blog/
├── _config.yml         # Jekyll configuration
├── Gemfile            # Ruby dependencies
├── index.md           # Homepage (Jekyll)
├── about.md           # About page (Jekyll)
├── privacy.md         # Privacy policy (Jekyll) 
├── terms.md           # Terms of service (Jekyll)
├── _layouts/          # Jekyll layouts
│   ├── default.html   # Base layout
│   ├── home.html      # Homepage layout
│   └── post.html      # Blog post layout
├── _posts/            # Jekyll blog posts (Markdown)
│   ├── 2025-07-27-lalalalall-yaya.md
│   └── 2025-07-26-night-night.md
├── admin/             # Netlify CMS
│   ├── config.yml     # CMS configuration
│   └── index.html     # CMS admin interface
├── assets/images/     # Jekyll assets
│   └── *.jpg          # Travel photos
├── css/
│   └── style.css      # Styles
└── images/            # Legacy images (kept for compatibility)
    └── *.jpg
```

## 🚀 How to Use Jekyll + Netlify CMS

### For Content Creators (Non-Technical)
1. **Create Posts**: Visit `your-site.com/admin/` to access Netlify CMS
2. **Login**: Use your GitHub account or Netlify Identity
3. **Write Posts**: Use the visual editor to create blog posts
4. **Publish**: Posts are automatically saved to `_posts/` and deployed

### For Developers (Technical)

#### Local Development
1. **Install dependencies**:
   ```bash
   bundle install
   ```

2. **Run Jekyll locally**:
   ```bash
   bundle exec jekyll serve
   ```

3. **Access locally**:
   - Website: http://localhost:4000
   - Admin: http://localhost:4000/admin/

#### Creating Posts Manually
1. Create new `.md` file in `_posts/` directory
2. Use naming convention: `YYYY-MM-DD-post-title.md`
3. Include frontmatter with layout, title, date, categories, etc.

## ✏️ Netlify CMS vs Manual Post Creation

### Option 1: Netlify CMS (Recommended)
1. **Access Admin**: Go to `yoursite.com/admin/`
2. **Login**: Use GitHub or Netlify Identity
3. **Create Post**: Click "New Post" 
4. **Fill Fields**:
   - Title: Your post title
   - Date: Publication date
   - Categories: Travel categories 
   - Featured Image: Upload main image
   - Body: Write in markdown or rich text
5. **Save/Publish**: Posts automatically go to `_posts/` folder

### Option 2: Manual Post Creation
Create a new file in `_posts/` with this format:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-07-27 10:00:00 +1000
categories: ["K-Culture & Palaces", "City Vibes & Night-life"]
tags: ["Korea", "Travel", "Culture"]
featured_image: "/images/your-image.jpg"
excerpt: "Brief description of your post"
author: "The Curious Wanderer"
---

Your post content in Markdown format...

![Image Alt Text](/images/your-image.jpg)
```

## 🌐 Deployment to Netlify

### Automatic Deployment
1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Build Settings**:
   - Build command: `bundle exec jekyll build`
   - Publish directory: `_site`
3. **Environment Variables**: Add any needed ENV vars
4. **Auto Deploy**: Every push to main branch triggers rebuild

### Netlify CMS Setup
1. **Enable Git Gateway**: In Netlify dashboard → Site settings → Identity → Git Gateway
2. **Enable Identity**: Site settings → Identity → Enable Identity service  
3. **Registration**: Set to invite-only for security
4. **Admin Access**: Visit `/admin/` to access CMS

## 🖼️ Image Management

### Jekyll Assets
- Upload images to `assets/images/` directory
- Reference in posts: `![Alt text](/assets/images/image.jpg)`
- Netlify CMS automatically handles image uploads

### Legacy Images
- Existing images remain in `images/` directory for compatibility
- Use `/images/filename.jpg` for old images
- Gradually migrate to `assets/images/` for new content

## 🎨 Customization

### Travel Categories
Current travel categories in Netlify CMS:
- 🏯 K-Culture & Palaces
- 🍢 Street Food & Night Markets  
- 🏞️ Mountains & Rice Terraces
- 🏝️ Beaches, Bays & Islands
- 🌃 City Vibes & Night-life
- 💸 Budget Hacks & Transport

### Styling
- Main styles: `css/style.css`
- Jekyll layouts: `_layouts/`
- Responsive design with mobile-first approach
- Pinterest-style masonry layouts

## 🔧 Technical Features

### Jekyll Benefits
- **Static Site Generation**: Fast, secure, and scalable
- **Markdown Support**: Easy content creation
- **Liquid Templating**: Dynamic content generation
- **Plugin Ecosystem**: Extendable functionality

### SEO Optimization
- Jekyll SEO Tag plugin for meta tags
- Structured data markup
- Open Graph and Twitter Card support
- Sitemap generation
- RSS feed support

## 📋 Migration Summary

### Files Converted
✅ **Created**:
- `_config.yml` - Jekyll configuration
- `Gemfile` - Ruby dependencies  
- `_layouts/` - Jekyll templates
- `_posts/` - Blog posts in Markdown
- `index.md` - Jekyll homepage
- `about.md`, `privacy.md`, `terms.md` - Pages

✅ **Updated**: 
- `admin/config.yml` - Netlify CMS for Jekyll

❌ **Removed**:
- `index.html`, `create-post.html`, `edit-post.html`, `post.html`
- `login.html`, `debug.html`, `posts.json`
- `posts/` directory with individual HTML files

### What Changed
1. **Static HTML → Jekyll**: Dynamic template system with Liquid
2. **JSON Data → Markdown Posts**: Standard Jekyll post format  
3. **Custom Admin → Netlify CMS**: Professional content management
4. **Manual Deployment → Automated**: Git-based workflow

## 🚀 Next Steps

1. **Push to GitHub**: Commit all changes to your repository
2. **Deploy to Netlify**: Connect repo and configure build settings
3. **Enable Netlify Identity**: Set up user authentication
4. **Configure Git Gateway**: Allow CMS to commit to repository
5. **Test CMS**: Create your first post via `/admin/`

---

**Congratulations!** Your blog is now a fully functional Jekyll + Netlify CMS website. You can create posts through the admin interface at `/admin/` and they'll automatically appear on your site. 

Happy blogging and safe travels! 🌏✈️
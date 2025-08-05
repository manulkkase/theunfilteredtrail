# 🖼️ Image Optimization Guide (Simplified)

## 📖 **How to Use Responsive Images**

### **In Blog Posts (Markdown)**

Add images to your markdown posts using the simple include:

```liquid
{% include responsive-image.html 
   src="assets/images/seoul-street.jpg" 
   alt="Bustling street scene in Seoul" 
   caption="Seoul's vibrant Myeongdong district at night" %}
```

### **In Liquid Templates**

For more control in HTML templates:

```liquid
{% include responsive-image.html 
   src="assets/images/vietnam-beach.jpg" 
   alt="Beautiful beach in Vietnam" 
   caption="Pristine beaches of Phu Quoc Island" %}
```

### **Parameters Available:**

- `path`: Required. Path to image in assets/images/
- `alt`: Required. Alt text for accessibility
- `caption`: Optional. Image caption displayed below
- `class`: Optional. Additional CSS classes

## 🚀 **Generated Output Example**

Using Netlify's Image CDN, the plugin generates modern HTML like this:

```html
<figure class="responsive-image">
  <picture>
    <!-- WebP sources using Netlify Image CDN -->
    <source 
      srcset="/.netlify/images?url=assets/images/seoul-street.jpg&w=320&fm=webp&q=85 320w,
              /.netlify/images?url=assets/images/seoul-street.jpg&w=640&fm=webp&q=85 640w,
              /.netlify/images?url=assets/images/seoul-street.jpg&w=1280&fm=webp&q=85 1280w"
      sizes="(max-width: 320px) 100vw, (max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
      type="image/webp">
    
    <!-- JPEG fallback sources -->
    <source 
      srcset="/.netlify/images?url=assets/images/seoul-street.jpg&w=320&fm=jpg&q=85 320w,
              /.netlify/images?url=assets/images/seoul-street.jpg&w=640&fm=jpg&q=85 640w,
              /.netlify/images?url=assets/images/seoul-street.jpg&w=1280&fm=jpg&q=85 1280w"
      sizes="(max-width: 320px) 100vw, (max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px">
    
    <!-- Fallback img -->
    <img 
      src="/.netlify/images?url=assets/images/seoul-street.jpg&w=1280&fm=jpg&q=85" 
      alt="Bustling street scene in Seoul"
      loading="lazy"
      decoding="async"
      class="responsive-image__img">
  </picture>
  
  <figcaption class="responsive-image__caption">
    Seoul's vibrant Myeongdong district at night
  </figcaption>
</figure>
```

## ⚡ **Performance Benefits**

1. **Multiple formats**: WebP and JPEG via Netlify Image CDN
2. **On-demand resizing**: 320px, 640px, 1280px, 1920px
3. **Lazy loading**: Images load only when needed
4. **Aggressive caching**: 1-year browser cache with `immutable`
5. **Global CDN**: Netlify's worldwide edge network
6. **No build-time processing**: Faster Jekyll builds

## 📱 **Mobile Optimization**

- Full-width on mobile devices
- Optimized touch interactions
- Reduced shadows and animations
- Efficient bandwidth usage

## 🔧 **Configuration**

All settings are in `_config.yml`:

```yaml
responsive_image:
  base_path: assets/images
  sizes:
    - width: 320   # Mobile
    - width: 640   # Tablet  
    - width: 1280  # Desktop
    - width: 1920  # Large screens
  quality: 85
  strip: true
  cache: true
```

## 📁 **File Organization**

```
assets/
└── images/           # Original images only
    ├── seoul-street.jpg
    └── vietnam-beach.jpg

# No resized folder needed! 
# Netlify handles resizing on-demand via CDN
```

## 🚀 **Deployment**

Netlify automatically:
1. ✅ **Serves images via Image CDN** (no build processing needed)
2. ✅ **Generates WebP formats** on-demand
3. ✅ **Sets optimal caching headers** 
4. ✅ **Serves from global CDN** for maximum speed
5. ✅ **No npm dependencies** required!

**Major advantage**: Zero build errors, faster deployments! 🎉
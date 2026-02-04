# Images Directory

This directory is for blog post cover images and other static images.

## Image Guidelines

### Cover Images
- **Recommended size**: 1200x630px (16:9 aspect ratio)
- **Format**: WebP for better compression, with JPEG fallback
- **File size**: Keep under 200KB for optimal loading

### Naming Convention
Use descriptive names:
- `budgeting-tips-2026.webp`
- `home-workout-fitness.jpg`
- `investment-strategy.webp`

### Organization
```
public/images/
├── posts/
│   ├── finance/
│   └── fitness/
├── icons/
└── general/
```

### WebP Support
For modern browsers, use WebP format with JPEG fallback:
```html
<img src="/images/budgeting-tips-2026.webp" alt="Budgeting" />
```

### Current Images
No images have been uploaded yet. Add your blog post cover images here.

### Tips
- Compress images before uploading
- Use descriptive alt text for accessibility
- Consider using a CDN for production
- Use responsive images with Next.js Image component when possible
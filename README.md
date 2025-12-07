# Personal Website

A modern, responsive personal website and blog built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Home Page** - Welcome page with introduction and quick links
- 📝 **Blog** - Markdown-based blog system with dynamic routing
- 👤 **About Page** - Personal information and contact details
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 📱 **Mobile Responsive** - Works perfectly on all device sizes

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: Markdown files for blog posts
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
personal-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Individual blog post pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Site navigation
│   └── Footer.tsx         # Site footer
├── content/              # Content files
│   └── blog/             # Blog post markdown files
├── lib/                  # Utility functions
│   └── posts.ts          # Blog post utilities
└── public/               # Static assets
```

## Adding Blog Posts

1. Create a new Markdown file in `content/blog/` with the `.md` extension
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
---

# Your Post Title

Your content here...
```

3. The post will automatically appear on the blog page!

## Customization

### Updating Site Information

- **Site Title**: Edit `app/layout.tsx` metadata
- **Navigation Links**: Edit `components/Navigation.tsx`
- **Footer Links**: Edit `components/Footer.tsx`
- **About Page**: Edit `app/about/page.tsx`
- **Home Page**: Edit `app/page.tsx`

### Styling

The site uses Tailwind CSS. You can customize:
- Colors: Edit `app/globals.css`
- Components: Modify component files in `components/`
- Global styles: Update `app/globals.css`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

This site can be deployed to:
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Configure for static export (requires `output: 'export'` in `next.config.ts`)
- **Any Node.js hosting**: Run `npm run build` and `npm start`

### Build for Production

```bash
npm run build
npm start
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the maintainer.

---

Built with ❤️ using Next.js

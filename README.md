# Lokeshraj M — Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## 🚀 Live Preview

Open `index.html` in your browser, or use a local dev server:

```bash
# Option 1: Using npx (recommended)
npx http-server . -p 3000 -o

# Option 2: Using Python
python -m http.server 3000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## 📁 Project Structure

```
Portfolio/
├── index.html      # Main HTML page (all sections)
├── style.css       # Complete design system & responsive styles
├── script.js       # Interactivity, animations, and form handling
└── README.md       # This file
```

## ✨ Features

- **Dark Glassmorphic Theme** — Futuristic design with cyan/purple accents
- **Fully Responsive** — Mobile, tablet, and desktop optimized
- **Smooth Animations** — Scroll-reveal, typing effect, parallax blobs
- **Interactive Navigation** — Sticky nav with active section highlighting
- **Contact Form** — Validation with mailto fallback
- **SEO Optimized** — Meta tags, semantic HTML5, proper heading hierarchy
- **Zero Dependencies** — Pure HTML/CSS/JS (icons via Lucide CDN)

## 🌐 Deployment

### GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch** / root
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify
1. Drag and drop the `Portfolio` folder at [app.netlify.com/drop](https://app.netlify.com/drop)
2. Your site goes live instantly with a free URL

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this directory
3. Follow the prompts — deployed in seconds

## 🛠️ Customization

- **Colors**: Edit CSS variables in `:root` at the top of `style.css`
- **Content**: Update text directly in `index.html`
- **Animations**: Modify timing in `script.js` and keyframes in `style.css`

## 📝 License

This project is open source and free to use.

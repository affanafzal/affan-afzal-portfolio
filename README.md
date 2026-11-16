# Affan Afzal — Portfolio Website

A responsive portfolio made with **HTML, CSS, and vanilla JavaScript**. The visual style uses a dark charcoal background, vivid green accents, and a clean editorial layout.

## 1. Project files

```text
affan-afzal-portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── affan-profile.jpg
└── README.md
```

## 2. Personalise the website before publishing

Open `script.js` and find the configuration near the top:

```js
const PORTFOLIO_CONFIG = {
  githubUsername: "YOUR_GITHUB_USERNAME",
  contactEmail: "YOUR_EMAIL@example.com",
  repositoryLimit: 5,
  githubApiBase: "https://api.github.com",
  preferredTheme: "dark"
};
```

1. Replace `YOUR_GITHUB_USERNAME` with your GitHub username. For example, if your profile URL is `https://github.com/affan123`, enter `affan123`.
2. Replace `YOUR_EMAIL@example.com` with an email address you want to receive enquiries at.
3. Save the file.

The GitHub section uses GitHub's public API to show your avatar, display name, bio, public repository count, followers, and up to five recently updated public repositories. You do not need a GitHub token for public profile information. GitHub may apply anonymous API rate limits.

The contact form uses a `mailto:` link. It opens the visitor's email application; it does not send messages through a backend.

## 3. Preview locally

1. Extract the ZIP file.
2. Open the `affan-afzal-portfolio` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Check the page on desktop and mobile sizes.

Keep the `assets` folder beside `index.html`. Do not rename `affan-profile.jpg` unless you also update its path in `index.html`.

## 4. Publish it on GitHub

1. Sign in at [GitHub](https://github.com/).
2. Click **New repository**.
3. Name it `affan-afzal-portfolio`.
4. Choose **Public** and create the repository.
5. In the repository page, choose **Add file → Upload files**.
6. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder (including the photo).
7. Commit the files to the `main` branch.

Your source code will now be visible on GitHub. The website itself also links to your GitHub profile and fetches your public repositories after you configure the username in `script.js`.

### Optional: upload with Git commands

Run these commands from inside the extracted project folder after creating an empty GitHub repository:

```bash
git init
git add .
git commit -m "Create Affan Afzal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/affan-afzal-portfolio.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual username. If Git asks you to sign in, complete GitHub's browser authentication.

## 5. Host it on Vercel

### Method A — import from GitHub (recommended)

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New → Project**.
3. Import the `affan-afzal-portfolio` repository.
4. In project settings, keep the framework preset as **Other** (or leave it as detected).
5. Leave **Build Command** empty.
6. Leave **Output Directory** empty or set it to `.`.
7. Click **Deploy**.
8. Vercel will provide a live URL, such as `your-project.vercel.app`.

Whenever you push a new commit to the connected GitHub repository, Vercel can automatically redeploy the website.

### Method B — deploy with the Vercel CLI

Install Node.js first, then open a terminal in the project folder:

```bash
npm install -g vercel
vercel
```

Follow the prompts. For a production deployment, run:

```bash
vercel --prod
```

## 6. How the GitHub section works

The website requests these public endpoints:

- `https://api.github.com/users/YOUR_USERNAME`
- `https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=100`

The JavaScript sorts the display by the most recently updated repositories returned by GitHub and shows a small selection. A public GitHub profile is required. Private repositories are not displayed.

## 7. Before sharing your portfolio

- [ ] Set your GitHub username in `script.js`.
- [ ] Set your contact email in `script.js`.
- [ ] Confirm that your GitHub profile is public.
- [ ] Check your profile photo and mobile layout.
- [ ] Replace the sample project descriptions with links to real repositories when available.
- [ ] Add certificate verification URLs when you have them.
- [ ] Proofread your personal details.
- [ ] Push the final changes to GitHub and confirm the Vercel deployment.

## 8. Important content note

The project cards are presented as learning-project examples based on the project ideas in your portfolio context. Update each card with the actual project status and repository link before presenting it as completed work. The education entry is written as your current BS CS 3rd Semester at the University of Sargodha, as requested.

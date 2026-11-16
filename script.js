/* =========================================================
   AFFAN AFZAL — PORTFOLIO INTERACTIONS
   Edit the configuration values in this file before publishing.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. PERSONAL CONFIGURATION
   --------------------------------------------------------- */
const PORTFOLIO_CONFIG = {
  // Replace this with the exact username from github.com/USERNAME.
  githubUsername: "affan-afzal-portfolio",
  // Replace this with an email address you want visitors to contact.
  contactEmail: "affanafzal100@gmail.com",
  // Number of public repositories to display in the portfolio.
  repositoryLimit: 5,
  // GitHub API public endpoints do not require an access token.
  githubApiBase: "https://api.github.com",
  // Keep the interface in the dark green theme requested.
  preferredTheme: "dark"
};

/* ---------------------------------------------------------
   2. DOM HELPERS
   --------------------------------------------------------- */
const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function safelyRun(callback, fallback = null) {
  try {
    return callback();
  } catch (error) {
    console.warn("Portfolio interaction could not complete:", error);
    return fallback;
  }
}

function setText(element, value) {
  if (!element) return;
  element.textContent = value ?? "";
}

function setAttribute(element, name, value) {
  if (!element) return;
  element.setAttribute(name, value);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en").format(Number(value) || 0);
}

function safeExternalLink(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.href : "#";
  } catch {
    return "#";
  }
}

/* ---------------------------------------------------------
   3. MOBILE NAVIGATION
   --------------------------------------------------------- */
const menuToggle = select("#menuToggle");
const mainNav = select("#mainNav");
const navLinks = selectAll(".nav-link");

function closeNavigation() {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  setAttribute(menuToggle, "aria-expanded", "false");
  setAttribute(menuToggle, "aria-label", "Open navigation");
}

function openNavigation() {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.add("open");
  document.body.classList.add("menu-open");
  setAttribute(menuToggle, "aria-expanded", "true");
  setAttribute(menuToggle, "aria-label", "Close navigation");
}

function toggleNavigation() {
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  if (isOpen) closeNavigation();
  else openNavigation();
}

menuToggle?.addEventListener("click", toggleNavigation);

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeNavigation();
});

/* ---------------------------------------------------------
   4. ACTIVE SECTION NAVIGATION
   --------------------------------------------------------- */
function initialiseActiveNavigation() {
  const sections = selectAll("main section[id]");
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const target = link.getAttribute("href");
        const active = target === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   5. SCROLL REVEAL ANIMATIONS
   --------------------------------------------------------- */
function revealImmediately(elements) {
  elements.forEach((element) => element.classList.add("is-visible"));
}

function initialiseRevealAnimations() {
  const revealElements = selectAll(".reveal");
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealImmediately(revealElements);
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  revealElements.forEach((element) => observer.observe(element));
}

/* ---------------------------------------------------------
   6. CUSTOM POINTER GLOW
   --------------------------------------------------------- */
function initialisePointerGlow() {
  const glow = select(".cursor-glow");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!glow || !finePointer) return;

  let animationFrame = null;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  function updateGlow() {
    glow.style.left = `${pointerX}px`;
    glow.style.top = `${pointerY}px`;
    animationFrame = null;
  }

  document.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (animationFrame !== null) return;
    animationFrame = requestAnimationFrame(updateGlow);
  }, { passive: true });
}

/* ---------------------------------------------------------
   7. BACK-TO-TOP CONTROL
   --------------------------------------------------------- */
const backToTop = select("#backToTop");

function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateBackToTop, { passive: true });

/* ---------------------------------------------------------
   8. FOOTER YEAR
   --------------------------------------------------------- */
function setCurrentYear() {
  const yearElement = select("#currentYear");
  setText(yearElement, new Date().getFullYear());
}

/* ---------------------------------------------------------
   9. GITHUB PROFILE URLS
   --------------------------------------------------------- */
function getGithubUsername() {
  return String(PORTFOLIO_CONFIG.githubUsername || "").trim().replace(/^@/, "");
}

function hasGithubUsername() {
  const username = getGithubUsername();
  return username.length > 0 && username !== "YOUR_GITHUB_USERNAME";
}

function getGithubProfileUrl() {
  return `https://github.com/${encodeURIComponent(getGithubUsername())}`;
}

function getGithubApiUrl(path = "") {
  const base = PORTFOLIO_CONFIG.githubApiBase.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

function updateGithubLinks() {
  const profileLink = select("#githubProfileLink");
  const contactLink = select("#contactGithubLink");
  if (!hasGithubUsername()) return;

  const url = getGithubProfileUrl();
  if (profileLink) profileLink.href = url;
  if (contactLink) {
    contactLink.href = url;
    contactLink.textContent = `github.com/${getGithubUsername()} ↗`;
  }
}

/* ---------------------------------------------------------
   10. GITHUB API REQUEST HELPERS
   --------------------------------------------------------- */
async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    const error = new Error(`GitHub returned ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function getGithubErrorMessage(error) {
  if (error?.status === 404) {
    return "That GitHub username was not found. Check the username in script.js.";
  }
  if (error?.status === 403 || error?.status === 429) {
    return "GitHub's public API rate limit was reached. Please refresh later.";
  }
  if (!navigator.onLine) {
    return "You appear to be offline. Connect to the internet to load GitHub data.";
  }
  return "GitHub information could not be loaded. Check the username and try again.";
}

/* ---------------------------------------------------------
   11. GITHUB PROFILE RENDERING
   --------------------------------------------------------- */
function createGithubAvatar(avatarUrl, username) {
  const image = createElement("img", "github-avatar");
  image.src = safeExternalLink(avatarUrl);
  image.alt = `${username}'s GitHub avatar`;
  image.loading = "lazy";
  image.referrerPolicy = "no-referrer";
  image.addEventListener("error", () => {
    const fallback = createElement("div", "github-avatar-placeholder", "A");
    image.replaceWith(fallback);
  }, { once: true });
  return image;
}

function renderGithubProfile(profile) {
  const container = select("#githubProfile");
  const name = select("#githubName");
  const bio = select("#githubBio");
  const stats = select("#githubStats");
  if (!container) return;

  const existingAvatar = select(".github-avatar, .github-avatar-placeholder", container);
  const avatar = createGithubAvatar(profile.avatar_url, profile.login);
  if (existingAvatar) existingAvatar.replaceWith(avatar);
  else container.prepend(avatar);

  setText(name, profile.name || profile.login || "GitHub profile");
  setText(bio, profile.bio || "No public bio has been added yet.");
  setText(
    stats,
    `${formatNumber(profile.public_repos)} repositories  ·  ${formatNumber(profile.followers)} followers  ·  ${formatNumber(profile.following)} following`
  );
}

/* ---------------------------------------------------------
   12. GITHUB REPOSITORY CARD BUILDERS
   --------------------------------------------------------- */
function createRepositoryMeta(label, value, className = "") {
  const item = createElement("span", className);
  item.textContent = value ? `${label}: ${value}` : label;
  return item;
}

function createRepositoryCard(repository) {
  const card = createElement("article", "repo-item");
  const top = createElement("div", "repo-item-top");
  const link = createElement("a");
  const updated = createElement("span", "mono-text");
  const description = createElement("p");
  const metadata = createElement("div", "repo-meta");

  link.href = safeExternalLink(repository.html_url);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name || "Untitled repository";

  updated.textContent = repository.fork ? "FORK" : "PUBLIC";
  description.textContent = repository.description || "No description provided.";
  metadata.append(
    createRepositoryMeta("LANG", repository.language, "repo-language"),
    createRepositoryMeta("★", formatNumber(repository.stargazers_count)),
    createRepositoryMeta("⑂", formatNumber(repository.forks_count))
  );

  top.append(link, updated);
  card.append(top, description, metadata);
  return card;
}

function renderRepositories(repositories) {
  const list = select("#repoList");
  const count = select("#repoCount");
  if (!list) return;

  list.replaceChildren();
  const visibleRepositories = repositories
    .filter((repository) => !repository.private)
    .slice(0, PORTFOLIO_CONFIG.repositoryLimit);

  setText(count, String(visibleRepositories.length));

  if (!visibleRepositories.length) {
    list.append(createElement("p", "repo-empty", "No public repositories to show yet."));
    return;
  }

  visibleRepositories.forEach((repository) => {
    list.append(createRepositoryCard(repository));
  });
}

/* ---------------------------------------------------------
   13. GITHUB LOADING STATES
   --------------------------------------------------------- */
function setGithubLoading(isLoading) {
  const list = select("#repoList");
  const error = select("#githubError");
  if (error) setText(error, "");
  if (!list || !isLoading) return;
  list.replaceChildren(createElement("p", "repo-empty", "Loading public repositories…"));
}

function showGithubError(message) {
  const error = select("#githubError");
  const list = select("#repoList");
  if (error) setText(error, message);
  if (list) {
    list.replaceChildren(createElement("p", "repo-empty", "Repository information is unavailable."));
  }
}

async function loadGithubData() {
  if (!hasGithubUsername()) {
    const hint = "Add your GitHub username in script.js to display your live profile and repositories.";
    setText(select("#githubError"), hint);
    return;
  }

  const username = encodeURIComponent(getGithubUsername());
  setGithubLoading(true);
  updateGithubLinks();

  try {
    const profileUrl = getGithubApiUrl(`users/${username}`);
    const repositoriesUrl = getGithubApiUrl(
      `users/${username}/repos?sort=updated&per_page=100`
    );

    const [profile, repositories] = await Promise.all([
      fetchJson(profileUrl),
      fetchJson(repositoriesUrl)
    ]);

    renderGithubProfile(profile);
    renderRepositories(repositories);
  } catch (error) {
    console.error("GitHub profile loading failed:", error);
    showGithubError(getGithubErrorMessage(error));
  }
}

/* ---------------------------------------------------------
   14. CONTACT FORM — MAILTO FALLBACK
   --------------------------------------------------------- */
function getContactEmail() {
  return String(PORTFOLIO_CONFIG.contactEmail || "").trim();
}

function isConfiguredEmail(email) {
  return Boolean(email && email.includes("@") && !email.includes("YOUR_EMAIL"));
}

function readContactForm() {
  const form = select("#contactForm");
  if (!form) return null;

  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    message: String(data.get("message") || "").trim()
  };
}

function validateContactForm(values) {
  if (!values) return "The contact form could not be found.";
  if (!values.name || !values.email || !values.message) {
    return "Please complete all fields before preparing your email.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return "Please enter a valid email address.";
  }
  if (values.message.length < 8) {
    return "Please write a slightly longer message.";
  }
  return "";
}

function prepareMailto(values) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
  const body = encodeURIComponent(
    `Hello Affan,\n\n${values.message}\n\nFrom: ${values.name}\nReply email: ${values.email}`
  );
  return `mailto:${getContactEmail()}?subject=${subject}&body=${body}`;
}

function handleContactSubmit(event) {
  event.preventDefault();

  const feedback = select("#formFeedback");
  const values = readContactForm();
  const validationMessage = validateContactForm(values);

  if (validationMessage) {
    setText(feedback, validationMessage);
    return;
  }

  if (!isConfiguredEmail(getContactEmail())) {
    setText(feedback, "Please add your email address in script.js before using this form.");
    return;
  }

  setText(feedback, "Opening your email app with the message prepared…");
  window.location.href = prepareMailto(values);
}

function initialiseContactForm() {
  const form = select("#contactForm");
  if (!form) return;
  form.addEventListener("submit", handleContactSubmit);

  const emailLink = select("#emailLink");
  const email = getContactEmail();
  if (emailLink && isConfiguredEmail(email)) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = `${email} ↗`;
  }
}

/* ---------------------------------------------------------
   15. EXTERNAL LINK SAFETY
   --------------------------------------------------------- */
function initialiseExternalLinks() {
  selectAll('a[target="_blank"]').forEach((link) => {
    const currentRel = new Set((link.rel || "").split(" ").filter(Boolean));
    currentRel.add("noopener");
    currentRel.add("noreferrer");
    link.rel = [...currentRel].join(" ");
  });
}

/* ---------------------------------------------------------
   16. IMAGE FALLBACK
   --------------------------------------------------------- */
function initialiseProfileImageFallback() {
  const image = select(".profile-image");
  if (!image) return;

  image.addEventListener("error", () => {
    image.alt = "Profile photo could not be loaded. Check assets/affan-profile.jpg.";
    image.style.background = "linear-gradient(135deg, #18271a, #0a100c)";
    image.style.minHeight = "300px";
  }, { once: true });
}

/* ---------------------------------------------------------
   17. CONNECTION STATUS
   --------------------------------------------------------- */
function updateConnectionStatus() {
  const status = select(".github-status");
  if (!status) return;
  status.style.background = navigator.onLine ? "var(--green)" : "#e4a15e";
  status.style.boxShadow = navigator.onLine
    ? "0 0 12px var(--green)"
    : "0 0 12px #e4a15e";
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

/* ---------------------------------------------------------
   18. INITIALISE THE PORTFOLIO
   --------------------------------------------------------- */
function initialisePortfolio() {
  initialiseActiveNavigation();
  initialiseRevealAnimations();
  initialisePointerGlow();
  initialiseContactForm();
  initialiseExternalLinks();
  initialiseProfileImageFallback();
  updateBackToTop();
  updateConnectionStatus();
  setCurrentYear();
  updateGithubLinks();
  loadGithubData();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialisePortfolio, { once: true });
} else {
  initialisePortfolio();
}

/* ---------------------------------------------------------
   19. SMALL UTILITIES FOR FUTURE EXPANSION
   These functions are intentionally reusable as the portfolio
   grows: project filtering, accessible status messages, and
   simple formatting helpers can be connected to future UI.
   --------------------------------------------------------- */
function normaliseText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function truncateText(value, maximumLength = 140) {
  const text = String(value ?? "").trim();
  if (text.length <= maximumLength) return text;
  return `${text.slice(0, maximumLength - 1).trimEnd()}…`;
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function sortRepositoriesByUpdated(repositories = []) {
  return [...repositories].sort((first, second) => {
    return new Date(second.updated_at) - new Date(first.updated_at);
  });
}

function filterRepositories(repositories = [], searchTerm = "") {
  const query = normaliseText(searchTerm);
  if (!query) return [...repositories];
  return repositories.filter((repository) => {
    const searchable = [
      repository.name,
      repository.description,
      repository.language
    ].map(normaliseText).join(" ");
    return searchable.includes(query);
  });
}

function getRepositorySummary(repository = {}) {
  return {
    name: repository.name || "Untitled",
    language: repository.language || "Not specified",
    stars: Number(repository.stargazers_count) || 0,
    forks: Number(repository.forks_count) || 0,
    updated: formatDate(repository.updated_at),
    url: safeExternalLink(repository.html_url)
  };
}

function announceToScreenReader(message) {
  let liveRegion = select("#portfolioLiveRegion");
  if (!liveRegion) {
    liveRegion = createElement("div");
    liveRegion.id = "portfolioLiveRegion";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.style.position = "absolute";
    liveRegion.style.width = "1px";
    liveRegion.style.height = "1px";
    liveRegion.style.padding = "0";
    liveRegion.style.margin = "-1px";
    liveRegion.style.overflow = "hidden";
    liveRegion.style.clip = "rect(0, 0, 0, 0)";
    document.body.append(liveRegion);
  }
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function debounce(callback, delay = 150) {
  let timeoutId;
  return (...argumentsList) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...argumentsList);
    }, delay);
  };
}

function throttle(callback, interval = 100) {
  let waiting = false;
  return (...argumentsList) => {
    if (waiting) return;
    callback(...argumentsList);
    waiting = true;
    window.setTimeout(() => {
      waiting = false;
    }, interval);
  };
}

function getScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return 0;
  return Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function copyTextToClipboard(value) {
  if (!navigator.clipboard?.writeText) {
    return Promise.reject(new Error("Clipboard access is unavailable."));
  }
  return navigator.clipboard.writeText(String(value));
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function buildQueryString(parameters = {}) {
  const query = new URLSearchParams();
  Object.entries(parameters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.set(key, String(value));
  });
  return query.toString();
}

function getInitials(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function clampNumber(value, minimum, maximum) {
  const number = Number(value);
  if (!Number.isFinite(number)) return minimum;
  return Math.min(maximum, Math.max(minimum, number));
}

function pluralise(count, singular, plural = `${singular}s`) {
  return Number(count) === 1 ? singular : plural;
}

function createStatusMessage(message, type = "info") {
  return {
    message: String(message || ""),
    type: ["info", "success", "warning", "error"].includes(type) ? type : "info",
    createdAt: new Date().toISOString()
  };
}

/* Keep the helper names available in the browser console for
   beginner-friendly experimentation and future enhancements. */
window.PortfolioHelpers = {
  normaliseText,
  truncateText,
  formatDate,
  sortRepositoriesByUpdated,
  filterRepositories,
  getRepositorySummary,
  announceToScreenReader,
  debounce,
  throttle,
  getScrollProgress,
  prefersReducedMotion,
  copyTextToClipboard,
  isValidHttpUrl,
  buildQueryString,
  getInitials,
  clampNumber,
  pluralise,
  createStatusMessage
};

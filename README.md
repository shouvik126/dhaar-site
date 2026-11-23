# Dhaar (उधार) — Official Web & Compliance Portal

This folder (`dhaar-site`) contains the complete static website and legal compliance suite for the **Dhaar** mobile app (`com.shouvikpradhan.dhaar`). It is designed to be hosted directly as a **GitHub Pages** site or any static hosting service (Cloudflare Pages, Netlify, Vercel).

---

## 📁 Site Structure

| File | Purpose | App Store / Play Store Requirement |
| :--- | :--- | :--- |
| `index.html` | App landing page with hero, feature breakdown, interactive dual-engine loan calculator, waterfall architecture preview, FAQ, and store badges. | **Marketing URL / Website** |
| `privacy.html` | Comprehensive Privacy Policy detailing 100% offline SQLite storage, zero cloud tracking, device permissions (`CAMERA`, `READ_MEDIA_IMAGES`), and user rights. | **Privacy Policy URL** (Apple Guideline 5.1 & Google Play User Data Policy) |
| `terms.html` | Terms of Service & End User License Agreement (EULA) with explicit **Non-Banking / Record-Keeping Tool Disclaimer** protecting against financial licensing issues. | **Terms of Service URL** |
| `data-safety.html` | Detailed breakdown of the Google Play Data Safety questionnaire, data categories, and step-by-step instructions for in-app data deletion, record deletion, and OS-level purge. | **Account / Data Deletion URL** (Google Play Console requirement) |
| `support.html` | Official customer support desk, troubleshooting guide for field agents, FAQ, issue tracker links, and pre-formatted email support launcher. | **App Store Support URL** & **Play Store Contact Website** |
| `guide.html` | In-depth operational user manual explaining Loan Origination (LOS), Loan Servicing (LMS), Payment Waterfall, DPD Delinquency buckets, and PTP tracking. | **User Documentation & Guide** |
| `css/style.css` | Custom responsive CSS matching the app's signature design system (Obsidian Charcoal `#18181B` & Periwinkle Violet `#6E56CF`). | UI Styling |
| `js/main.js` | Interactive scripting: responsive navigation, FAQ accordion toggle, dynamic financial EMI/Amortization calculator. | Frontend Logic |
| `assets/` | High-resolution app icons (`icon.png`, `icon-512.png`), Apple touch icon (`apple-touch-icon.png`), and favicons. | Branding & Media |
| `.nojekyll` | Ensures GitHub Pages serves all assets and ignores Jekyll processing. | GitHub Pages Config |

---

## 🚀 How to Host on GitHub Pages

You have two convenient options to host this on GitHub Pages:

### Option A: Host via `gh-pages` branch (Recommended for clean URLs)
You can deploy just the contents of `dhaar-site/` to a dedicated `gh-pages` branch:

```bash
# From the repository root
git subtree push --prefix dhaar-site origin gh-pages
```
Then go to your GitHub repository:
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch: `gh-pages`, folder: `/ (root)`.
4. Your site will be live at: `https://<your-username>.github.io/<repo-name>/`!

### Option B: Host directly from the `/docs` or root of a separate repo
If you maintain a dedicated website repository (e.g. `shouvikpradhan/dhaar-site`), simply push the contents of `dhaar-site/` as the root of that repository and select **main branch / root** in GitHub Pages settings.

---

## 📋 URLs to Use in App Store Connect & Google Play Console

Once published at `https://<your-username>.github.io/<repo-name>/` (or your custom domain `https://dhaar.app`):

| Console Field | Recommended URL |
| :--- | :--- |
| **Privacy Policy URL** (Apple & Google) | `https://<your-domain>/privacy.html` |
| **Support URL** (Apple App Store Connect) | `https://<your-domain>/support.html` |
| **Marketing URL** (Apple App Store Connect) | `https://<your-domain>/` |
| **Data Deletion URL** (Google Play Console) | `https://<your-domain>/data-safety.html` |
| **Terms of Service URL** (Optional/Public) | `https://<your-domain>/terms.html` |
| **App Documentation** (Optional/Guide) | `https://<your-domain>/guide.html` |

---

## 💻 Local Testing

To preview the website locally on your computer:

```bash
cd dhaar-site
python3 -m http.server 8000
```
Then open `http://localhost:8000` in any web browser.

# 📝 VisualEditor: Auto-Insert References Header

[![MediaWiki Extension](https://img.shields.io/badge/MediaWiki-Extension-006699?style=for-the-badge&logo=wikipedia)](https://www.mediawiki.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![PHP](https://img.shields.io/badge/PHP-8.1+-777BB4?style=for-the-badge&logo=php&logoColor=white)](#)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

> A smart enhancement for the MediaWiki `Cite` extension that automatically detects and injects a localized Level 2 section heading when a user inserts a References list via VisualEditor.

## 📖 Description

In MediaWiki's VisualEditor (VE), users frequently insert a "References list" after adding citations to an article. However, newer editors often forget to manually create a `== References ==` section heading beforehand, resulting in orphaned reference blocks at the bottom of pages. 

This patch introduces **context-aware DOM manipulation** to the `ve-cite` module. When a user triggers the "Insert References list" command, the script:
1. Traverses the document model to check if a relevant heading already exists.
2. If missing, automatically generates a localized Level 2 heading (e.g., "References").
3. Inserts both the heading and the reference list block in a single, seamless undoable transaction.
4. Includes a wiki-configurable default state (via `i18n` translation keys) allowing specific wikis to disable the auto-insertion if desired.

---

## 📑 Table of Contents
- [Description](#-description)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Credits & Acknowledgements](#-credits--acknowledgements)
- [License](#-license)
- [Contact](#-contact)

---

## 📸 Screenshots

Here is a step-by-step look at the feature in action within the VisualEditor environment:

| 1. Adding Citations | 
|:---:|:---:|
| ![Adding Citations] <img width="1893" height="945" alt="Screenshot (138)" src="https://github.com/user-attachments/assets/9ddaf170-2691-4206-a75d-abca48da76ca" />

|2. Editing References |
 | ![Editing References] <img width="1920" height="923" alt="Screenshot (139)" src="https://github.com/user-attachments/assets/a0e85e5f-7d5a-415d-ad6f-1ffa41b48254" />
 |
| *User adds footnotes to the article text using the VisualEditor Cite tool.* | *Interacting with the generated citation block.* |

| 3. The Insertion Process | 
|:---:|:---:|
| ![Insertion Process] <img width="1920" height="945" alt="Screenshot (140)" src="https://github.com/user-attachments/assets/5ae2b936-cab0-4ddb-a726-3c55f1eccf4a" />

 | 4. Smart Auto-Heading Output |
| ![Final Output] <img width="1908" height="931" alt="Screenshot (141)" src="https://github.com/user-attachments/assets/b5bb6b83-59aa-44b9-83c8-af2557404425" />
 |
| *VisualEditor DOM updating the view as the command is executed.* | *The final output: The script automatically detects the missing header and injects the "References" H2 above the grey list block.* |

---

## 💻 Tech Stack

* **Frontend Logic:** Object-Oriented JavaScript (ES6+), VisualEditor Data Model (`ve.dm`), VisualEditor Content Editable (`ve.ce`).
* **Backend Integration:** PHP (MediaWiki Hooks, ExtensionRegistry).
* **Internationalization (i18n):** MediaWiki JSON dictionary keys (`en.json`, `qqq.json`) for localization.
* **Environment:** XAMPP, Apache, MySQL, Local MediaWiki Core (v1.45+).

---

## 🚀 Installation

To test this code locally, you need a functioning MediaWiki core installation with the VisualEditor and Cite extensions enabled.

1. **Clone the MediaWiki Core** (if you haven't already):
   ```bash
   git clone [https://gerrit.wikimedia.org/r/mediawiki/core.git](https://gerrit.wikimedia.org/r/mediawiki/core.git) mediawiki
   cd mediawiki

2. **Navigate to the Extensions directory and clone Cite:**

Bash
cd extensions
git clone [https://gerrit.wikimedia.org/r/mediawiki/extensions/Cite.git](https://gerrit.wikimedia.org/r/mediawiki/extensions/Cite.git)
cd Cite

3. **Fetch this specific patch/branch:**
https://gerrit.wikimedia.org/r/c/mediawiki/extensions/Cite/+/1248931


4. **Enable the extension in your LocalSettings.php:**

PHP
wfLoadExtension( 'Cite' );

## 🕹️ Usage

Once the extension is installed and your local server is running:

1. Open your local wiki in your browser (e.g., `http://localhost/mediawiki/index.php/Main_Page`).
2. Append `?debug=true` to the URL to bypass the ResourceLoader cache and load fresh JavaScript.
3. Click the **Edit** tab to launch VisualEditor.
4. Type a sentence and add a footnote using the **Cite** button in the toolbar.
5. In the top toolbar, click **Insert > More > References list**.
6. The script will automatically insert a Level 2 `References` heading directly above the list block.

---

## 🤝 Contributing

This project is part of the open-source Wikimedia ecosystem. 

If you would like to contribute, please follow the standard Wikimedia Gerrit workflow rather than GitHub Pull Requests:

1. Read the [Wikimedia Developer Guide](https://www.mediawiki.org/wiki/Developer_account).
2. Push your patches to [Gerrit Code Review](https://gerrit.wikimedia.org/).
3. Ensure all PHP and JavaScript code passes the Jenkins CI linters before requesting a review.

---

## 🏆 Credits & Acknowledgements

* **Wikimedia Foundation:** For maintaining the core architecture of MediaWiki and VisualEditor.
* **Mentorship:** Special thanks to senior Wikimedia architects **Ed Sanders (Esanders)** and **Thiemo Kreuz** for their extensive code reviews, architectural guidance on EditCheck integration, and deep insights into MediaWiki i18n standards.

---

## 📄 License

Distributed under the **GPL-2.0-or-later** License. See the standard MediaWiki `COPYING` file or visit [GNU's website](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) for more information.

---

## 📫 Contact

**Vikas** 
* GitHub: https://github.com/only-vikas
* LinkedIn: www.linkedin.com/in/vikaskannur
* Email: vkannur504@gmaul.com

Project Link: https://github.com/only-vikas/Cite  | https://github.com/only-vikas/Cite

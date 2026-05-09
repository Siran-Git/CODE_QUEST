# 🔮 Code Quest — The Lost Variables

An interactive storytelling game that teaches coding concepts through a fantasy adventure.
Supports **English** and **Tamil (தமிழ்)** with two difficulty modes.

---

## 📁 Project Structure

```
code-quest/
│
├── index.html                  ← Main entry point
│
├── assets/
│   ├── css/
│   │   └── style.css           ← All game styles
│   │
│   └── js/
│       ├── translations.js     ← All UI text (English + Tamil)
│       ├── steps.js            ← All story scenes & challenges
│       └── main.js             ← Game engine (loads last)
│
├── .vscode/
│   └── settings.json           ← VS Code workspace settings
│
├── README.md
└── .gitignore
```

---

## 🚀 Run Locally

1. Open the `code-quest/` folder in **VS Code**
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
4. Game opens at `http://localhost:5500`

No build tools or npm needed — plain HTML + CSS + JS.

---

## ✏️ How to Edit Content

| File | What to change |
|---|---|
| `assets/js/translations.js` | Button labels, UI text, victory messages in EN & TA |
| `assets/js/steps.js` | Story scenes, codex concepts, challenge questions & hints |
| `assets/css/style.css` | Colours, fonts, layout, animations |
| `index.html` | HTML structure only — rarely needs editing |

---

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Code Quest game"
git remote add origin https://github.com/YOUR_USERNAME/code-quest.git
git push -u origin main
```

## 🌍 Deploy with GitHub Pages

1. Push to GitHub
2. Go to repo → Settings → Pages → Source: main branch / root
3. Live at: `https://YOUR_USERNAME.github.io/code-quest`

---

## 📝 License
MIT — free to use, modify, and share.
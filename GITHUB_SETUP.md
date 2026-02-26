# Create the GitHub repo and push

Follow these steps once. After that, use normal `git add` / `commit` / `push`.

## 1. Create the repo on GitHub

1. Open **https://github.com/new**
2. **Repository name:** `coin-library`
3. **Description:** (optional) e.g. `Cryptocurrency and token icons – npm package`
4. Choose **Public**
5. **Do not** check "Add a README", "Add .gitignore", or "Choose a license" (this folder already has them)
6. Click **Create repository**

## 2. Connect and push from your machine

In a terminal, from the `coin-library` folder:

```bash
cd C:\Projects\coin-library

git remote add origin https://github.com/vincent2025923/coin-library.git
git branch -M main
git push -u origin main
```

(Username **vincent2025923** is already set.)

## 3. (Optional) Commit package.json

`package.json` already has your GitHub URLs. If you haven’t pushed yet, they’ll go up with your first push. If you already pushed, commit and push the update:

```bash
git add package.json GITHUB_SETUP.md
git commit -m "chore: set GitHub URLs to vincent2025923"
git push
```

Done. Your repo will be at **https://github.com/vincent2025923/coin-library**.

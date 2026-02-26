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

git remote add origin https://github.com/YOUR_USERNAME/coin-library.git
git branch -M main
git push -u origin main
```

Replace **YOUR_USERNAME** with your GitHub username.

## 3. Update package.json (optional)

Edit `package.json` and replace `your-username` with your GitHub username in:

- `repository.url`
- `bugs.url`
- `homepage`

Then commit and push:

```bash
git add package.json
git commit -m "chore: set GitHub URLs"
git push
```

Done. Your repo will be at `https://github.com/YOUR_USERNAME/coin-library`.

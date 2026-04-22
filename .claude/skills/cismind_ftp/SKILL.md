---
name: cismind_ftp
description: Deploy the CISMIND site to cPanel via FTP. Use this skill whenever the user says "deploy", "ftp", "upload site", "push to server", "pune pe server", "urca pe site", "deploy cismind", or anything related to deploying/uploading the CISMIND website to the live server. Also triggers when the user wants to set up FTP deployment from scratch.
---

# CISMIND FTP Deploy

This skill handles building and deploying the CISMIND site to cPanel hosting via FTP. It covers both initial setup (if FTP isn't configured yet) and one-command deployment.

## Server Details

- **FTP Host:** ftp.cismind.ro
- **FTP Port:** 21
- **FTP User:** cismindr
- **Remote directory:** /public_html
- **Live URL:** https://cismind.ro

## Deploy Flow

### Step 1: Verify Setup

Check that the project has everything needed for FTP deployment:

1. **Check `.env`** — must contain FTP credentials:
   ```
   FTP_HOST=ftp.cismind.ro
   FTP_USER=cismindr
   FTP_PASS=<password>
   FTP_PORT=21
   FTP_REMOTE_DIR=/public_html
   ```
2. **Check `deploy.mjs`** exists in project root
3. **Check `basic-ftp` and `dotenv`** are in devDependencies
4. **Check `package.json`** has the `"ftp"` script: `"ftp": "vite build && node deploy.mjs"`

If anything is missing, go to **Step 2: Setup**. If everything is in place, skip to **Step 3: Deploy**.

### Step 2: Setup (only if not configured)

Run these steps to configure FTP deployment from scratch:

1. Install dependencies:
   ```bash
   pnpm add -D basic-ftp dotenv
   ```

2. Add FTP credentials to `.env` (this file is in .gitignore, never commit it):
   ```
   FTP_HOST=ftp.cismind.ro
   FTP_USER=cismindr
   FTP_PASS=<ask user for password>
   FTP_PORT=21
   FTP_REMOTE_DIR=/public_html
   ```

3. Create `deploy.mjs` in project root:
   ```js
   import { Client } from "basic-ftp";
   import { readdir, stat } from "fs/promises";
   import { join } from "path";
   import { config } from "dotenv";

   config();

   const { FTP_HOST, FTP_USER, FTP_PASS, FTP_PORT, FTP_REMOTE_DIR } = process.env;
   const LOCAL_DIR = "dist";

   async function uploadDir(client, localDir, remoteDir) {
     const entries = await readdir(localDir, { withFileTypes: true });
     for (const entry of entries) {
       const localPath = join(localDir, entry.name);
       const remotePath = `${remoteDir}/${entry.name}`;
       if (entry.isDirectory()) {
         await client.ensureDir(remotePath);
         await uploadDir(client, localPath, remotePath);
         await client.cd(remoteDir);
       } else {
         const sizeKB = ((await stat(localPath)).size / 1024).toFixed(1);
         console.log(`  ↑ ${remotePath} (${sizeKB} KB)`);
         await client.uploadFrom(localPath, remotePath);
       }
     }
   }

   async function deploy() {
     const client = new Client();
     client.ftp.verbose = false;
     try {
       console.log(`\n🔌 Connecting to ${FTP_HOST}...`);
       await client.access({
         host: FTP_HOST,
         port: parseInt(FTP_PORT || "21"),
         user: FTP_USER,
         password: FTP_PASS,
         secure: false,
       });
       console.log("✅ Connected!\n");
       console.log(`📂 Uploading ${LOCAL_DIR}/ → ${FTP_REMOTE_DIR}\n`);
       await client.ensureDir(FTP_REMOTE_DIR);
       await uploadDir(client, LOCAL_DIR, FTP_REMOTE_DIR);
       console.log("\n🚀 Deploy complete!");
     } catch (err) {
       console.error("\n❌ Deploy failed:", err.message);
       process.exit(1);
     } finally {
       client.close();
     }
   }

   deploy();
   ```

4. Add the `ftp` script to `package.json`:
   ```json
   "scripts": {
     "ftp": "vite build && node deploy.mjs"
   }
   ```

5. Update `.env.example` with FTP placeholder fields (no real passwords).

### Step 3: Deploy

Run the deploy command:

```bash
pnpm run ftp
```

This will:
1. **Build** the site with Vite (output to `dist/`)
2. **Connect** to ftp.cismind.ro via FTP
3. **Upload** all files from `dist/` to `/public_html`

After deploy, confirm to the user that the site is live at **cismind.ro**.

### Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `421 Home directory not available` | Wrong FTP username | Use `cismindr` (not `cismind@cismind.ro`) |
| `Login incorrect` | Wrong password | Check FTP_PASS in .env |
| `ENOTFOUND ftp.cismind.ro` | DNS/network issue | Check internet connection |
| `pnpm deploy` fails with `NOTHING_TO_DEPLOY` | `deploy` is a reserved pnpm command | Use `pnpm run ftp` instead |

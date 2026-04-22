import { Client } from "basic-ftp";
import { readdir, stat } from "fs/promises";
import { join, relative } from "path";
import { config } from "dotenv";

config();

const FTP_HOST = process.env.FTP_HOST;
const FTP_USER = process.env.FTP_USER;
const FTP_PASS = process.env.FTP_PASS;
const FTP_PORT = parseInt(process.env.FTP_PORT || "21");
const FTP_REMOTE_DIR = process.env.FTP_REMOTE_DIR || "/";
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
      const fileSize = (await stat(localPath)).size;
      const sizeKB = (fileSize / 1024).toFixed(1);
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
      port: FTP_PORT,
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

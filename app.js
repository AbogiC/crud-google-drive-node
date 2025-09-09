import "dotenv/config";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

const filePath = path.join(__dirname, "02_PS-339.png");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "02_PS-339.png",
        mimeType: "image/png",
        parents: ["1IP8htYt6KL9NV9rOTGm0gmY560k5K27s"], // Replace with your folder ID
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

async function deleteFile() {
  try {
    await drive.files.delete({
      fileId: "1v4X0s-7rtu7RDWLpYSK9JOXwFc3tUNqk",
    });
    console.log(
      `File with ID: 1v4X0s-7rtu7RDWLpYSK9JOXwFc3tUNqk deleted successfully.`
    );
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
}

async function listFiles() {
  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
      q: "'1IP8htYt6KL9NV9rOTGm0gmY560k5K27s' in parents",
    });
    console.log("Files:");
    response.data.files.forEach((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } catch (error) {
    console.error("Error listing files:", error.message);
  }
}

// uploadFile();
// deleteFile();
listFiles();

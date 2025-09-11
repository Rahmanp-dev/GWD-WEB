const fs = require('fs');
const path = require('path');

// Define the new environment variables to be added
const newEnvVariables = `
CLOUDINARY_CLOUD_NAME="cloud_name"
CLOUDINARY_API_KEY="api_key"
CLOUDINARY_API_SECRET="api_secret"
`;

// Path to the .env.local file
const envFilePath = path.join(__dirname, '.env.local');

// Read the existing .env.local file
fs.readFile(envFilePath, 'utf8', (err, data) => {
  if (err) {
    // If the file doesn't exist, create it with the new variables
    if (err.code === 'ENOENT') {
      fs.writeFile(envFilePath, newEnvVariables.trim(), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error creating .env.local file:', writeErr);
        } else {
          console.log('.env.local file created successfully with new variables.');
        }
      });
    } else {
      console.error('Error reading .env.local file:', err);
    }
  } else {
    // If the file exists, append the new variables if they are not already present
    let updatedData = data;
    const variablesToAdd = newEnvVariables.trim().split('\n');
    variablesToAdd.forEach(variable => {
      const key = variable.split('=')[0];
      if (!data.includes(key)) {
        updatedData += `\n${variable}`;
      }
    });

    if (updatedData !== data) {
      fs.writeFile(envFilePath, updatedData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to .env.local file:', writeErr);
        } else {
          console.log('New environment variables added to .env.local successfully.');
        }
      });
    } else {
      console.log('All new environment variables are already present in .env.local.');
    }
  }
});

import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.cjs';
import readline from 'readline';

const token = process.env.GITHUB_TOKEN;

async function doPush(authToken) {
  const dir = process.cwd();
  console.log('Pushing to https://github.com/hannahkurapati-hub/Career-Path.git on branch main...');
  
  try {
    const res = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      onAuth: () => ({
        username: authToken
      })
    });
    console.log('✅ Push completed successfully!', res);
  } catch (err) {
    console.error('❌ Push failed:', err.message);
    if (err.message.includes('HTTP Error: 401') || err.message.includes('Authentication')) {
      console.log('\n💡 Tip: GitHub requires a Personal Access Token (PAT) for HTTPS authentication.');
      console.log('Generate a token at: https://github.com/settings/tokens (with "repo" permissions)');
      console.log('Then run: $env:GITHUB_TOKEN="your_token_here"; node push-to-github.js\n');
    }
  }
}

if (token) {
  doPush(token);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your GitHub Personal Access Token (or press Enter if using credential helper): ', (answer) => {
    rl.close();
    doPush(answer.trim());
  });
}

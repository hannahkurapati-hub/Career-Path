import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

async function initAndCommit() {
  const dir = process.cwd();
  console.log('1. Initializing Git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // 2. Ensure README starts or contains # Career-Path
  const readmePath = path.join(dir, 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  if (!readmeContent.includes('# Career-Path')) {
    readmeContent = '# Career-Path\n\n' + readmeContent;
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('2. Prepended # Career-Path to README.md');
  } else {
    console.log('2. README.md already includes # Career-Path');
  }

  // 3. Stage all files except node_modules and system files
  console.log('3. Staging project files...');
  
  function getFiles(currentDir, relativeBase = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = relativeBase ? `${relativeBase}/${entry.name}` : entry.name;
      
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.system_generated') {
          continue;
        }
        files = files.concat(getFiles(fullPath, relPath));
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  const allFiles = getFiles(dir);
  console.log(`Found ${allFiles.length} files to stage.`);

  for (const file of allFiles) {
    await git.add({ fs, dir, filepath: file });
  }

  // 4. Commit
  console.log('4. Creating commit...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'first commit',
    author: {
      name: 'hannahkurapati-hub',
      email: 'hannahkurapati@users.noreply.github.com'
    }
  });
  console.log('Commit created successfully! SHA:', sha);

  // 5. Set branch to main
  await git.branch({ fs, dir, ref: 'main', checkout: true });
  console.log('5. Current branch set to main');

  // 6. Set remote origin
  const remoteUrl = 'https://github.com/hannahkurapati-hub/Career-Path.git';
  try {
    await git.addRemote({ fs, dir, remote: 'origin', url: remoteUrl, force: true });
    console.log('6. Remote origin added:', remoteUrl);
  } catch (e) {
    console.log('Remote origin already configured or updated:', e.message);
  }

  // 7. Verify git status
  const currentBranch = await git.currentBranch({ fs, dir });
  console.log('Git setup complete! Current branch:', currentBranch);
}

initAndCommit().catch(err => {
  console.error('Git setup failed:', err);
  process.exit(1);
});

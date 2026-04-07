import fs from 'fs/promises';
import path from 'path';
import https from 'https';

const TAG = '0.20.0';
const REPO_OWNER = 'pgmoneta';
const REPO_NAME = 'pgmoneta';
const REPO_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${TAG}`;
const GITHUB_BLOB_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${TAG}`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

// Destination directory for all external docs
const DOCS_DEST = path.resolve(process.cwd(), 'doc');

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 
        'User-Agent': 'Node.js',
        // If you have a GITHUB_TOKEN environment variable, use it to avoid rate limits
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function downloadRawFile(repoPath) {
  const url = `${REPO_BASE}/${repoPath}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      let data = Buffer.alloc(0);
      res.on('data', (chunk) => { data = Buffer.concat([data, chunk]); });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function processMarkdownLinks(content, currentRepoPath) {
  let textContent = content.toString('utf8');

  // Remove LaTeX \newpage tags which are for PDF generation
  textContent = textContent.replace(/\\newpage/g, '');

  // Fix literal links like [Configuration](/doc/manual/en/CONFIGURATION) or [README](/doc/manual/README) 
  // that already exist in the source files and are broken for VitePress
  textContent = textContent.replace(/\/doc\/manual\/en\/([A-Z_]+)/g, '/doc/$1');
  textContent = textContent.replace(/\/doc\/manual\/README/g, 'https://github.com/pgmoneta/pgmoneta/blob/master/README.md');
  textContent = textContent.replace(/\/doc\/manual\/CODE_OF_CONDUCT/g, '/CODE_OF_CONDUCT');

  // Fix image links from ../images/ to /doc/images/
  textContent = textContent.replace(/\.\.\/images\//g, '/doc/images/');

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const currentDir = path.dirname(currentRepoPath);

  return textContent.replace(linkRegex, (match, text, link) => {
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#')) {
      return match;
    }

    // Resolve relative link to repo path
    let resolvedRepoPath = path.posix.join(currentDir, link);
    
    // If it's a markdown file within the doc folder, point to our local doc/ path
    if (resolvedRepoPath.startsWith('doc/') && resolvedRepoPath.endsWith('.md')) {
      const localPath = resolvedRepoPath.replace('doc/', '/doc/').replace('.md', '');
      return `[${text}](${localPath})`;
    }

    // Special case for files that were originally in the root doc/ but are linked relatively from manual
    if (currentDir === 'doc/manual/en' && link.endsWith('.md')) {
      // Check if it's a simple filename link like [Configuration](CONFIGURATION.md)
      // or a relative path like [Configuration](../CONFIGURATION.md)
      const fileName = path.basename(link, '.md');
      // List of known files in doc/ root
      const rootDocs = ['ADMIN', 'ARCHITECTURE', 'CLI', 'CONFIGURATION', 'DEVELOPERS', 'DISTRIBUTIONS', 'FAILOVER', 'GETTING_STARTED', 'PERFORMANCE', 'PIPELINES', 'PROMETHEUS', 'RPM', 'SECURITY', 'SPONSORS', 'TEST', 'VAULT'];
      
      if (rootDocs.includes(fileName)) {
        return `[${text}](/doc/${fileName})`;
      }
    }

    // Special case for root files (like README or CODE_OF_CONDUCT)
    if (resolvedRepoPath === 'CODE_OF_CONDUCT.md' || link === '../CODE_OF_CONDUCT.md' || link.endsWith('CODE_OF_CONDUCT.md')) {
      return `[${text}](/CODE_OF_CONDUCT)`;
    }

    // Otherwise, point to GitHub
    return `[${text}](${GITHUB_BLOB_BASE}/${resolvedRepoPath})`;
  });
}

// Store titles for sidebar generation
const sidebarItems = [];

async function fetchDirectory(repoPath) {
  console.log(`Scanning directory: ${repoPath}`);
  let items;
  try {
    items = await fetchJson(`${API_BASE}/${repoPath}?ref=${TAG}`);
  } catch (err) {
    console.error(`Error fetching directory ${repoPath}: ${err.message}`);
    // If it's a rate limit or error, we might want to stop early
    throw err;
  }
  
  for (const item of items) {
    if (item.type === 'dir') {
      // Filter out unnecessary directories
      if (repoPath === 'doc' && ['man', 'etc', 'tutorial'].includes(item.name)) {
        console.log(`Skipping: ${item.path}`);
        continue;
      }
      await fetchDirectory(item.path);
    } else if (item.type === 'file') {
      // Skip 00-frontpage.md as it is empty/unnecessary for the web
      if (item.path.endsWith('00-frontpage.md')) {
        console.log(`Skipping: ${item.path}`);
        continue;
      }
      
      const data = await downloadRawFile(item.path);
      
      // Handle doc/ folder specifically
      if (item.path.startsWith('doc/')) {
        const localPath = path.join(process.cwd(), item.path);
        await fs.mkdir(path.dirname(localPath), { recursive: true });
        
        if (item.path.endsWith('.md')) {
          const processed = processMarkdownLinks(data, item.path);
          await fs.writeFile(localPath, processed);

          // Collect info for sidebar if it's in the manual/en/ folder
          if (item.path.startsWith('doc/manual/en/')) {
            if (path.basename(item.path) === '99-references.md') {
              console.log(`Skipping sidebar entry: ${item.path}`);
              continue;
            }

            // Extract title from YAML frontmatter or first # line
            let title = '';
            const yamlTitleMatch = processed.match(/^title:\s*"(.+)"/m);
            const hashTitleMatch = processed.match(/^#+\s+(.+)$/m);
            
            if (yamlTitleMatch) {
              title = yamlTitleMatch[1].trim();
            } else if (hashTitleMatch) {
              title = hashTitleMatch[1].trim();
            } else {
              // Clean up filename (00-frontpage -> Frontpage, 74-building -> Building)
              title = path.basename(item.path, '.md')
                .replace(/^\d+-/, '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            }

            // Fallback for cases where the title is too short or just formatting fragments (like "or")
            if (title.length < 3 || title.toLowerCase() === 'or' || title.includes('Run these commands')) {
               title = path.basename(item.path, '.md')
                .replace(/^\d+-/, '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            }
            
            const link = item.path.replace('doc/', '/doc/').replace('.md', '');
            
            sidebarItems.push({
              text: title,
              link: link,
              filename: path.basename(item.path)
            });
          }
        } else {
          await fs.writeFile(localPath, data);
        }
        console.log(`Saved: ${item.path}`);
      }
    }
  }
}

async function main() {
  try {
    console.log(`Fetching all documentation from ${REPO_OWNER}/${REPO_NAME}@${TAG}...`);
    
    // Clean existing documentation to avoid mixing tags
    console.log('Cleaning old documentation...');
    await fs.rm(DOCS_DEST, { recursive: true, force: true });
    
    // 2. Recursively fetch the doc/ directory
    await fetchDirectory('doc');
    
    // 3. Sort and save sidebar configuration
    console.log('Generating dynamic sidebar...');
    sidebarItems.sort((a, b) => a.filename.localeCompare(b.filename));
    const sidebarConfig = sidebarItems.map(item => ({
      text: item.text,
      link: item.link
    }));
    
    await fs.writeFile(
      path.resolve(process.cwd(), '.vitepress/sidebar.json'), 
      JSON.stringify(sidebarConfig, null, 2),
      'utf8'
    );
    
    console.log('Documentation sync complete.');
  } catch (err) {
    console.error('Sync failed:', err);
    process.exit(1);
  }
}

main();

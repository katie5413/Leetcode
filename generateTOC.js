const fs = require('fs');
const path = require('path');

// Helper function to get the title from a markdown file
function getTitleFromMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^#\s+(.*)$/m); // Match the first Markdown title
    return match ? match[1].trim() : path.basename(filePath, '.md'); // Fallback to the file name if no title is found
}

// Helper function to capitalize each word
function capitalizeEachWord(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Helper function to generate TOC recursively
function generateTOC(dirPath, depth = 0, isRoot = false) {
    let toc = '';
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        // Skip hidden directories and files, SUMMARY.md, and root README.md if not at root level
        if (item.startsWith('.') || item.toLowerCase() === 'summary.md' || (!isRoot && item.toLowerCase() === 'readme.md')) {
            return;
        }

        if (stat.isDirectory()) {
            const dirName = capitalizeEachWord(path.basename(itemPath));
            const relativeDirPath = path.relative(__dirname, itemPath).replace(/\\/g, '/');
            const readmePath = path.join(relativeDirPath, 'README.md');

            toc += `${'  '.repeat(depth)}* [${dirName}](${readmePath})\n`;
            toc += generateTOC(itemPath, depth + 1, false);
        } else if (stat.isFile() && item.endsWith('.md')) {
            const fileName = path.basename(item, '.md');
            const relativeFilePath = path.relative(__dirname, itemPath).replace(/\\/g, '/');
            const title = getTitleFromMarkdown(itemPath);

            toc += `${'  '.repeat(depth)}* [${title}](${relativeFilePath})\n`;
        }
    });

    return toc;
}

// Main function
function main() {
    const baseDir = __dirname;
    const toc = '# Table of contents\n\n' + generateTOC(baseDir, 0, true); // Passing true for isRoot

    fs.writeFileSync(path.join(baseDir, 'SUMMARY.md'), toc);
    console.log('SUMMARY.md has been generated and updated');
}

main();

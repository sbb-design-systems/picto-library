const fs = require('fs');
const path = require('path');

if (require.main === module) {
  const [option] = process.argv.slice(2);
  const version = process.env.CDN_VERSION || 'unversioned';
  const root = process.cwd();

  const namespaces = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const icons = [];
  for (const namespace of namespaces) {
    const namespaceRoot = path.join(root, namespace);
    for (const file of walk(namespaceRoot)) {
      const name = path.basename(file, '.svg');
      const tags = path.relative(root, path.dirname(file)).split('/');
      const flatFilePath = path.join(namespaceRoot, `${name}.svg`);
      fs.renameSync(file, flatFilePath);
      markImmutable(flatFilePath, file);
      icons.push({ name, namespace, tags });
    }
    fs.readdirSync(namespaceRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .forEach((d) => unlinkDir(path.join(namespaceRoot, d.name)));
  }

  for (const namespace of namespaces) {
    const namespaceIcons = icons.filter((i) => i.namespace === namespace);
    const namespaceRoot = path.join(root, namespace);
    fs.writeFileSync(
      path.join(namespaceRoot, 'index.json'),
      JSON.stringify({ version, icons: namespaceIcons }),
      'utf8'
    );
  }

  function walk(dir) {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .reduce((files, entry) => {
        if (entry.isFile()) {
          files.push(path.join(dir, entry.name));
        } else if (entry.isDirectory()) {
          files.push(...walk(path.join(dir, entry.name)));
        }
        return files;
      }, []);
  }

  function unlinkDir(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
      if (d.isFile()) {
        fs.unlinkSync(path.join(dir, d.name));
      } else if (d.isDirectory()) {
        unlinkDir(path.join(dir, d.name));
      }
    });
    fs.rmdirSync(dir);
  }

  function markImmutable(file, originalPath) {
    console.log(`Marked ${path.relative(root, file)} as color immutable`);
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace('<svg ', '<svg class="color-immutable" ');
    fs.writeFileSync(file, content, 'utf8');
  }
}
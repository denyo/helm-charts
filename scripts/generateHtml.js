const MarkdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");
const globby = require("globby");

const ROOT_DIR = path.normalize(__dirname + "/../");
const DIST_DIR = path.resolve(ROOT_DIR, "docs");
const SRC_DIR = path.resolve(ROOT_DIR, "charts");

const indexHtmlPath = path.resolve(ROOT_DIR, "scripts/index-template.html");
const HTML_TEMPLATE = fs.readFileSync(indexHtmlPath, "utf8");

const renderHtml = ({ fileName, title, content }) => {
  const targetFilePath = path.resolve(DIST_DIR, fileName);
  const htmlContent = HTML_TEMPLATE.replace("<!-- TITLE -->", title).replace(
    "<!-- CONTENT -->",
    content
  );
  fs.writeFileSync(targetFilePath, htmlContent);
  console.log(`- ${fileName}`);
};

const generateHtml = () => {
  console.log("Started generating HTML...");
  const readmeFilePaths = globby.sync(`${SRC_DIR}/**/README.md`);

  const md = new MarkdownIt();
  const pages = readmeFilePaths.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const content = md.render(fileContent);

    const title = path.dirname(filePath).split("/").pop();
    return { title, content };
  });

  fs.mkdirSync(DIST_DIR, { recursive: true });
  pages.forEach(({ title, content }) => {
    renderHtml({ fileName: `${title}.html`, title, content });
  });

  // add table of contents to index.html
  const tocItems = pages
    .map(({ title }) => `<li><a href="./${title}.html">${title}</a></li>`)
    .join("");

  renderHtml({
    fileName: "index.html",
    title: "m.hub Helm Repository",
    content: `<h1>m.hub Helm Repository</h1><ul>${tocItems}</ul><a href="./index.yaml">index.yaml</a>`,
  });
  console.log("Finished generating HTML 🎉");
};

generateHtml();

import { generateActionMarkdownDocs } from 'action-docs';
import fs from 'fs';

const actionYAML = 'action.yaml';
const README = 'README.md';

async function generateDocs(filePath: string) {
	await generateActionMarkdownDocs({
		actionFile: `${filePath}/${actionYAML}`,
		tocLevel: 2,
		updateReadme: true,
		readmeFile: `${filePath}/${README}`,
	});
	console.log(`Generated docs for: ${filePath}`);
}

async function dirIsAction(dir: string) {
	let hasREADME = false,
		hasActionYAML = false;

	const files = await fs.readdirSync(dir);
	for await (let file of files) {
		if (file === README) {
			hasREADME = true;
		} else if (file === actionYAML) {
			hasActionYAML = true;
		}
	}

	return hasREADME && hasActionYAML;
}

async function walkDirectory() {
	fs.readdir('.', async (err, files) => {
		if (err !== null) return;

		for await (let file of files) {
			await fs.stat(file, async (err, stats) => {
				if (err !== null || !stats.isDirectory()) {
					return;
				}

				if (await dirIsAction(file)) {
					await generateDocs(file);
				}
			});
		}
	});
}

(async () => {
	await walkDirectory();
})();

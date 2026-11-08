/** Resolves the pre-installed Chromium, whose build number moves between containers. */
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = '/opt/pw-browsers';

export function chromePath() {
  if (!existsSync(ROOT)) return undefined;
  for (const dir of readdirSync(ROOT).filter((d) => d.startsWith('chromium-')).sort().reverse()) {
    for (const rel of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
      const p = join(ROOT, dir, rel);
      if (existsSync(p)) return p;
    }
  }
  return undefined;
}

export const launchOptions = () => {
  const executablePath = chromePath();
  return executablePath ? { executablePath } : {};
};

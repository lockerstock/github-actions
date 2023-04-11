export function getRepoOwner(): string {
  return process.env.GITHUB_REPOSITORY_OWNER || '';
}

export function getRepo(): string {
  const fullRepo = process.env.GITHUB_REPOSITORY || '';
  const parts = fullRepo.split('/');

  if (parts.length === 2) {
    return parts[1];
  }

  return '';
}

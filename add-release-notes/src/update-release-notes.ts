import {Octokit} from '@octokit/core';

interface UpdateReleaseNotes {
  owner: string;
  repo: string;
  release_id: number;
  body: string;
}

export async function updateReleaseNotes(
  client: Octokit,
  config: UpdateReleaseNotes
) {
  return await client.request(
    'PATCH /repos/{owner}/{repo}/releases/{release_id}',
    {
      ...config
    }
  );
}

import {Octokit} from '@octokit/core';

interface ReleaseNotes {
  owner: string;
  repo: string;
  tag: string;
}

export async function getReleaseNotes(client: Octokit, config: ReleaseNotes) {
  const {data} = await client.request(
    'GET /repos/{owner}/{repo}/releases/tags/{tag}',
    {
      ...config
    }
  );
  return data;
}

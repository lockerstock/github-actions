import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';

interface ListGitTags {
  owner: string;
  name: string;
}

type Tag = components['schemas']['git-ref'] & {
  tag: string;
};

export async function listGitTags(
  client: Octokit,
  {owner, name}: ListGitTags,
  page = 0
): Promise<Tag[]> {
  const {data} = await client.request(
    'GET /repos/{owner}/{repo}/git/matching-refs/{ref}',
    {
      repo: name,
      owner,
      ref: 'tags/'
    }
  );

  const tags = data.map(datum => ({
    ...datum,
    tag: datum.ref.split('/').pop() ?? ''
  }));

  if (tags.length === 100) {
    return tags.concat(await listGitTags(client, {owner, name}, page + 1));
  }

  return tags;
}

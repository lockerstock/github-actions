import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';
import semverSatisfies from 'semver/functions/satisfies';

interface GetPackageTags {
  owner: string;
  name: string;
  type: components['schemas']['package']['package_type'];
  constraint: string;
}

export async function getPackageTags(
  client: Octokit,
  {owner, name, type, constraint}: GetPackageTags,
  page = 0
): Promise<string[]> {
  const {data} = await client.request(
    'GET /orgs/{org}/packages/{package_type}/{package_name}/versions',
    {
      package_type: type,
      package_name: name,
      org: owner,
      per_page: 100,
      page
    }
  );

  const tags: string[] = data.reduce((acc, version) => {
    for (const tag of version.metadata?.container?.tags ?? []) {
      if (semverSatisfies(tag, constraint)) {
        acc.push(tag);
      }
    }
    return acc;
  }, [] as string[]);

  if (data.length === 100) {
    return tags.concat(
      await getPackageTags(client, {owner, name, type, constraint}, page + 1)
    );
  }

  return tags;
}

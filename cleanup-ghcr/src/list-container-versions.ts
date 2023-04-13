import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';

interface ListContainerVersions {
  owner: string;
  name: string;
}

export async function listContainerVersions(
  client: Octokit,
  {owner, name}: ListContainerVersions,
  page = 0
): Promise<components['schemas']['package-version'][]> {
  const {data} = await client.request(
    'GET /orgs/{org}/packages/{package_type}/{package_name}/versions',
    {
      package_type: 'container',
      package_name: name,
      org: owner,
      per_page: 100,
      page
    }
  );

  if (data.length === 100) {
    return data.concat(
      await listContainerVersions(client, {owner, name}, page + 1)
    );
  }

  return data;
}

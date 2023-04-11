import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';

interface PackageVersionExists {
  owner: string;
  name: string;
  type: components['schemas']['package']['package_type'];
  version: string;
}

export async function doesPackageVersionExist(
  client: Octokit,
  {owner, name, type, version}: PackageVersionExists,
  page = 0
): Promise<boolean> {
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

  for (const item of data) {
    if (item.metadata?.container?.tags.includes(version)) {
      return true;
    }
  }

  if (data.length === 100) {
    return await doesPackageVersionExist(
      client,
      {owner, name, type, version},
      page + 1
    );
  }

  return false;
}

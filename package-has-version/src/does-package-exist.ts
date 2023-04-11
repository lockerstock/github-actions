import * as core from '@actions/core';
import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';

interface PackageExists {
  owner: string;
  name: string;
  type: components['schemas']['package']['package_type'];
}

export async function doesPackageExist(
  client: Octokit,
  config: PackageExists
): Promise<boolean> {
  try {
    const pkg = await getPackage(client, config);
    return pkg.data.name === config.name;
  } catch (error) {
    core.warning(error as Error);
    return false;
  }
}

async function getPackage(client: Octokit, {owner, name, type}: PackageExists) {
  return await client.request(
    'GET /orgs/{org}/packages/{package_type}/{package_name}',
    {
      org: owner,
      package_name: name,
      package_type: type
    }
  );
}

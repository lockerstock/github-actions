import {Octokit} from '@octokit/core';
import {components} from '@octokit/openapi-types';
import {OctokitResponse} from '@octokit/types';
import * as core from '@actions/core';

interface DeleteContainerVersions {
  owner: string;
  name: string;
}

export async function deleteContainerVersions(
  client: Octokit,
  config: DeleteContainerVersions,
  containers: components['schemas']['package-version'][]
): Promise<void> {
  for (const container of containers) {
    await deleteContainerVersion(client, config, container);
  }
}

/**
 * deleteContainerVersionsConcurrently
 * Attempts to delete all provided Container Versions concurrently.
 *
 * NOTE: This is not currently used because a large number of delete candidates will cause the GitHub API to rate limit requests and fail the operation.
 */
export async function deleteContainerVersionsConcurrently(
  client: Octokit,
  config: DeleteContainerVersions,
  containers: components['schemas']['package-version'][]
): Promise<OctokitResponse<never, 204>[]> {
  return Promise.all(
    containers.map(container =>
      deleteContainerVersion(client, config, container)
    )
  );
}

async function deleteContainerVersion(
  client: Octokit,
  {owner, name}: DeleteContainerVersions,
  container: components['schemas']['package-version']
): Promise<OctokitResponse<never, 204>> {
  const res = await client.request(
    'DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}',
    {
      package_type: container.metadata?.package_type ?? 'container',
      package_name: name,
      org: owner,
      package_version_id: container.id
    }
  );

  core.info(
    `Successfully deleted container (${
      container.id
    }) with tags: ${JSON.stringify(container.metadata?.container?.tags)}`
  );

  return res;
}

import * as core from '@actions/core';
import {Octokit} from '@octokit/core';

import {isDeploymentActive} from './is-deployment-active';

interface DeleteInactiveDeployment {
  owner: string;
  repo: string;
  deploymentId: number;
}

export async function deleteInactiveDeployment(
  client: Octokit,
  {owner, repo, deploymentId}: DeleteInactiveDeployment
): Promise<boolean> {
  core.debug(`Deleting deployment: ${deploymentId}`);

  try {
    const isActive = await isDeploymentActive(client, {
      owner,
      repo,
      deploymentId
    });
    if (isActive) {
      core.warning(
        `Deployment is active and will not be deleted: ${deploymentId}`
      );
      return false;
    }

    await client.request(
      'DELETE /repos/{owner}/{repo}/deployments/{deployment_id}',
      {
        owner,
        repo,
        deployment_id: deploymentId
      }
    );
  } catch (error) {
    core.warning(`Failed to delete deployment: ${deploymentId}`);
    return false;
  }

  core.info(`Successfully deleted deployment: ${deploymentId}`);
  return true;
}

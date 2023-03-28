import {Octokit} from '@octokit/core';

interface ListDeploymentStatuses {
  owner: string;
  repo: string;
  deploymentId: number;
}

interface DeploymentStatus {
  statusId: number;
  state: string;
  timestamp: Date;
}

export async function isDeploymentActive(
  client: Octokit,
  config: ListDeploymentStatuses
): Promise<boolean> {
  const statuses = await listDeploymentStatuses(client, config);
  if (statuses.length === 0) {
    return false;
  }

  statuses.sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf());

  return statuses[0].state !== 'inactive';
}

async function listDeploymentStatuses(
  client: Octokit,
  {owner, repo, deploymentId}: ListDeploymentStatuses,
  page = 0
): Promise<DeploymentStatus[]> {
  const {data} = await client.request(
    'GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
    {
      owner,
      repo,
      deployment_id: deploymentId,
      per_page: 100,
      page
    }
  );
  const deploymentStatuses: DeploymentStatus[] = data.map(status => ({
    statusId: status.id,
    state: status.state,
    timestamp: new Date(status.created_at)
  }));

  if (deploymentStatuses.length === 100) {
    return deploymentStatuses.concat(
      await listDeploymentStatuses(client, {owner, repo, deploymentId}, page++)
    );
  }

  return deploymentStatuses;
}

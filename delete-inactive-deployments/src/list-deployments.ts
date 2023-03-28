import {Octokit} from '@octokit/core';

interface ListDeploymentIDs {
  owner: string;
  repo: string;
  environment: string;
  ref: string;
}

interface DeploymentRef {
  deploymentId: number;
  ref: string;
}

export async function listDeployments(
  client: Octokit,
  {owner, repo, environment, ref = ''}: ListDeploymentIDs,
  page = 0
): Promise<DeploymentRef[]> {
  const {data} = await client.request('GET /repos/{owner}/{repo}/deployments', {
    owner,
    repo,
    environment,
    ref,
    per_page: 100,
    page
  });
  const deploymentRefs: DeploymentRef[] = data.map(deployment => ({
    deploymentId: deployment.id,
    ref: deployment.ref
  }));

  if (deploymentRefs.length === 100) {
    return deploymentRefs.concat(
      await listDeployments(client, {owner, repo, environment, ref}, page++)
    );
  }

  return deploymentRefs;
}

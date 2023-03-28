import * as core from '@actions/core';
import * as github from '@actions/github';
import {deleteInactiveDeployment} from './delete-inactive-deployment';
import {listDeployments} from './list-deployments';

export async function run(): Promise<void> {
  const {context} = github;
  const token = core.getInput('token', {required: true});
  const environment = core.getInput('environment', {required: true});
  const ref = core.getInput('ref', {required: false});

  const client = github.getOctokit(token);

  try {
    const deploymentRefs = await listDeployments(client, {
      ...context.repo,
      environment,
      ref
    });
    core.info(
      `Found ${deploymentRefs.length} deployments for "${environment}" environment`
    );

    for (const deployment of deploymentRefs) {
      await deleteInactiveDeployment(client, {
        ...context.repo,
        ...deployment
      });
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

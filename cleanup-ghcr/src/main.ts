import * as core from '@actions/core';
import {Octokit} from 'octokit';

async function run(): Promise<void> {
  const containerOwner = core.getInput('container_owner', {required: true});
  const containerName = core.getInput('container_repository', {required: true});

  core.debug(JSON.stringify({containerOwner, containerName}));

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    core.info(`Outputs: ${JSON.stringify({containerName})}`);
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

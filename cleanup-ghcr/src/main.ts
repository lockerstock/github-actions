import * as core from '@actions/core';
import {Octokit} from 'octokit';
import {listContainerVersions} from './list-container-versions';

async function run(): Promise<void> {
  const owner = core.getInput('container_owner', {required: true});
  const name = core.getInput('container_repository', {required: true});

  core.debug(JSON.stringify({owner, name}));

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const containers = await listContainerVersions(octokit, {owner, name});

    core.info(
      `Outputs: ${JSON.stringify({
        ids: containers.map(container => container.id)
      })}`
    );
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

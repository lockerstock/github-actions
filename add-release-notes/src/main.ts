import * as core from '@actions/core';
import {Octokit} from 'octokit';

import {getRepo, getRepoOwner} from './action';

async function run(): Promise<void> {
  const owner = core.getInput('owner', {required: false}) || getRepoOwner();
  const repository =
    core.getInput('repository', {required: false}) || getRepo();

  const octokit = new Octokit({auth: core.getInput('token')});

  core.info(`Outputs: ${JSON.stringify({})}`);
}

run();

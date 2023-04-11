import * as core from '@actions/core';
import {Octokit} from 'octokit';

import {getRepo} from './action';
import {getReleaseNotes} from './get-release-notes';

async function run(): Promise<void> {
  const owner = core.getInput('owner', {required: true});
  const repo = core.getInput('repository', {required: false}) || getRepo();
  const tag = core.getInput('tag', {required: true});

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const body = await getReleaseNotes(octokit, {owner, repo, tag});

    core.info(`Outputs: ${JSON.stringify({body})}`);
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

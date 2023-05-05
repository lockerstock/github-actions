import * as core from '@actions/core';
import {Octokit} from 'octokit';

const outputExists = 'exists';

async function run(): Promise<void> {
  const repo = core.getInput('repository', {required: true});
  const owner = core.getInput('owner', {required: true});
  const tag = core.getInput('tag', {required: true});
  const errorOnNotFound = core.getBooleanInput('error_on_not_found', {
    required: false
  });
  let exists = false;

  core.startGroup('Inputs');
  core.info(JSON.stringify({repo, owner, tag, errorOnNotFound}, null, 2));
  core.endGroup();

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const res = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `tags/${tag}`
    });

    if (res.status === 200) {
      exists = true;
    }
  } catch (err) {
    const message = `Tag (${tag}) not found.`;
    if (errorOnNotFound) {
      core.setFailed(message);
    } else {
      core.warning(message);
    }
  }

  core.startGroup('Outputs');
  core.info(JSON.stringify({exists}, null, 2));
  core.endGroup();

  core.setOutput(outputExists, exists);
}

run();

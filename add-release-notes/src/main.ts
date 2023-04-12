import * as core from '@actions/core';
import {Octokit} from 'octokit';

import {getRepo} from './action';
import {getReleaseNotes} from './get-release-notes';
import {injectMarkdownText} from './inject-markdown-text';
import {updateReleaseNotes} from './update-release-notes';

async function run(): Promise<void> {
  const owner = core.getInput('owner', {required: true});
  const repo = core.getInput('repository', {required: false}) || getRepo();
  const tag = core.getInput('tag', {required: true});
  const title = core.getInput('title', {required: true});
  const body = core.getInput('body', {required: true});

  core.debug(JSON.stringify({owner, repo, tag, title, body}));

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const release = await getReleaseNotes(octokit, {owner, repo, tag});

    const injectedBody = injectMarkdownText(release.body ?? '', body);

    const {data} = await updateReleaseNotes(octokit, {
      owner,
      repo,
      release_id: release.id,
      body: injectedBody
    });

    core.info(`Outputs: ${JSON.stringify({url: data.html_url, injectedBody})}`);
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

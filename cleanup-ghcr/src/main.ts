import * as core from '@actions/core';
import {Octokit} from 'octokit';
import {listContainerVersions} from './list-container-versions';
import {filterContainerVersions} from './filter-container-versions';

import {listGitTags} from './list-git-tags';
import {splitCSV} from './split.csv';
import {parseDurationTimestamp} from './parse-duration-timestamp';

function setDebugInputs() {
  if (core.isDebug()) {
    process.env.INPUT_CONTAINER_OWNER = 'lockerstock';
    process.env.INPUT_CONTAINER_REPOSITORY = 'lockerstock-landing';
    process.env.INPUT_KEEP_GIT_TAGS = 'true';
    process.env.INPUT_TAGS_TO_KEEP = 'latest , staging \n 47660a3, 9b04e11';
  }
}

async function run(): Promise<void> {
  setDebugInputs();

  const owner = core.getInput('container_owner', {required: true});
  const name = core.getInput('container_repository', {required: true});
  const keepGitTags = core.getBooleanInput('keep_git_tags', {required: false});
  const tagsToKeep = splitCSV(core.getInput('tags_to_keep', {required: false}));

  const keepTimestamp = parseDurationTimestamp(
    core.getInput('duration_to_keep', {required: false}) || '30d'
  );

  core.debug(
    JSON.stringify({
      owner,
      name,
      keepTimestamp,
      tagsToKeep,
      keepGitTags
    })
  );

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const gitTags = keepGitTags
      ? await listGitTags(octokit, {owner, name})
      : [];
    const keepTags = tagsToKeep.concat(gitTags.map(gitTag => gitTag.tag));

    const containers = await listContainerVersions(octokit, {owner, name});

    const filtered = filterContainerVersions(containers, {
      keepTimestamp,
      keepTags
    });

    core.debug(
      JSON.stringify({
        length: containers.length,
        dropLength: filtered.drop.length,
        keepLength: filtered.keep.length,
        keepTags,
        tagsKept: filtered.keep.map(kept => kept.metadata?.container?.tags)
      })
    );
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

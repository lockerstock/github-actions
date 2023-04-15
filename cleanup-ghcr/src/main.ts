import * as core from '@actions/core';
import {Octokit} from '@octokit/core';
import {listContainerVersions} from './list-container-versions';
import {filterContainerVersions} from './filter-container-versions';

import {listGitTags} from './list-git-tags';
import {splitCSV} from './split.csv';
import {parseDurationTimestamp} from './parse-duration-timestamp';
import {
  deleteContainerVersions,
  deleteContainerVersionsConcurrently
} from './delete-container-versions';
import {appendContainerManifests} from './append-container-manifests';

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
  const deleteConcurrently = core.getBooleanInput('delete_concurrently', {
    required: false
  });
  const keepGitTags = core.getBooleanInput('keep_git_tags', {required: false});
  const hardcodedTagsToKeep = splitCSV(
    core.getInput('tags_to_keep', {required: false})
  );

  const keepTimestamp = parseDurationTimestamp(
    core.getInput('duration_to_keep', {required: false}) || '30d'
  );

  core.debug(
    `Inputs: ${JSON.stringify({
      owner,
      name,
      keepTimestamp,
      hardcodedTagsToKeep,
      keepGitTags
    })}`
  );

  const octokit = new Octokit({auth: core.getInput('token')});

  try {
    const gitTags = keepGitTags
      ? await listGitTags(octokit, {owner, name})
      : [];
    const tagsToKeep = hardcodedTagsToKeep.concat(
      gitTags.map(gitTag => gitTag.tag)
    );

    const containers = await listContainerVersions(octokit, {owner, name});

    const filtered = filterContainerVersions(containers, {
      keepTimestamp,
      tagsToKeep
    });

    const keepManifests = await appendContainerManifests(filtered.keep, {
      owner,
      name
    });

    const keepContainerNames = keepManifests.reduce((names, container) => {
      if (
        container.manifest?.mediaType ===
        'application/vnd.docker.distribution.manifest.list.v2+json'
      ) {
        names.push(
          ...container.manifest.manifests.map(manifest => manifest.digest)
        );
      }
      return names;
    }, [] as string[]);

    const noTagsToDrop = filtered.noTags.filter(
      container => !keepContainerNames.includes(container.name)
    );

    const containersToDrop = filtered.drop.concat(noTagsToDrop);

    core.debug(
      JSON.stringify({
        length: containers.length,
        dropLength: filtered.drop.length,
        keepLength: filtered.keep.length,
        noTagsLength: filtered.noTags.length,
        tagsToKeep,
        tagsKept: filtered.keep.map(kept => kept.metadata?.container?.tags),
        dropped: containersToDrop.map(kept => kept.name),
        droppedLength: containersToDrop.length
      })
    );

    deleteConcurrently
      ? await deleteContainerVersionsConcurrently(
          octokit,
          {owner, name},
          containersToDrop
        )
      : await deleteContainerVersions(octokit, {owner, name}, containersToDrop);
  } catch (error) {
    core.setFailed(error as Error);
    return;
  }
}

run();

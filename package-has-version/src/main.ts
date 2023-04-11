import * as core from '@actions/core';
import {Octokit} from 'octokit';
import {components} from '@octokit/openapi-types';

import {doesPackageExist} from './does-package-exist';
import {getRepo} from './action';
import {doesPackageVersionExist} from './does-package-version-exist';

const outputPackageExists = 'package_exists';
const outputVersionExists = 'version_exists';
const packageTypes = [
  'npm',
  'maven',
  'rubygems',
  'docker',
  'nuget',
  'container'
];

async function run(): Promise<void> {
  const packageType = core.getInput('package_type', {required: true});
  if (!packageTypes.includes(packageType)) {
    core.error(
      `Invalid package type provided: ${packageType}. Valid values include: [${packageTypes.join(
        ', '
      )}]`
    );
    return;
  }
  const packageName =
    core.getInput('package_name', {required: false}) || getRepo();
  const packageOwner = core.getInput('package_owner', {required: true});
  const packageVersion = core.getInput('package_version', {required: true});

  core.debug(
    JSON.stringify({packageName, packageOwner, packageVersion, packageType})
  );

  const octokit = new Octokit({auth: core.getInput('token')});

  const packageExists = await doesPackageExist(octokit, {
    owner: packageOwner,
    name: packageName,
    type: packageType as components['schemas']['package']['package_type']
  });

  core.setOutput(outputPackageExists, packageExists);
  if (!packageExists) {
    core.setOutput(outputVersionExists, false);
    return;
  }

  const versionExists = await doesPackageVersionExist(octokit, {
    owner: packageOwner,
    name: packageName,
    type: packageType as components['schemas']['package']['package_type'],
    version: packageVersion
  });
  core.setOutput(outputVersionExists, versionExists);

  core.info(`Outputs: ${JSON.stringify({packageExists, versionExists})}`);
}

run();

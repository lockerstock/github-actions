import * as core from '@actions/core'
import {Octokit} from 'octokit'
import {components} from '@octokit/openapi-types'

import {doesPackageExist} from './does-package-exist'
import {getRepo} from './action'
import {getPackageTags} from './get-package-tags'
import semverReverseSort from 'semver/functions/rsort'

const outputPackageExists = 'package_exists'
const outputVersionExists = 'version_exists'
const outputVersion = 'version'
const packageTypes = [
  'npm',
  'maven',
  'rubygems',
  'docker',
  'nuget',
  'container'
]

async function run(): Promise<void> {
  const packageType = core.getInput('package_type', {required: true})
  if (!packageTypes.includes(packageType)) {
    core.error(
      `Invalid package type provided: ${packageType}. Valid values include: [${packageTypes.join(
        ', '
      )}]`
    )
    return
  }
  const packageName =
    core.getInput('package_name', {required: false}) || getRepo()
  const packageOwner = core.getInput('package_owner', {required: true})
  let packageVersionConstraint = core.getInput('package_version_constraint', {
    required: true
  })
  if (packageVersionConstraint === 'latest') {
    packageVersionConstraint = '>=0.0.0'
  }
  const errorOnNotFound = core.getBooleanInput('error_on_not_found')

  core.debug(
    JSON.stringify({
      packageName,
      packageOwner,
      packageVersionConstraint,
      packageType
    })
  )

  const octokit = new Octokit({auth: core.getInput('token')})

  const packageExists = await doesPackageExist(octokit, {
    owner: packageOwner,
    name: packageName,
    type: packageType as components['schemas']['package']['package_type']
  })

  core.setOutput(outputPackageExists, packageExists)
  if (!packageExists) {
    core.setOutput(outputVersionExists, false)
    if (errorOnNotFound) {
      core.error(`Failed to locate package: ${packageOwner}/${packageName}`)
    }
    return
  }

  const tags = semverReverseSort(
    await getPackageTags(octokit, {
      owner: packageOwner,
      name: packageName,
      type: packageType as components['schemas']['package']['package_type'],
      constraint: packageVersionConstraint
    })
  )
  core.debug(JSON.stringify({tags}))
  core.setOutput(outputVersionExists, tags.length > 0)
  core.setOutput(outputVersion, tags.shift())

  if (errorOnNotFound && tags.length === 0) {
    core.error(
      `Failed to find compatible version with given constraint: ${packageVersionConstraint}`
    )
    return
  }
}

run()

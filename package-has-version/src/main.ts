import * as core from '@actions/core'
import {Octokit} from 'octokit'
import {components} from '@octokit/openapi-types'

import {doesPackageExists} from './package-exists'

const outputPackageExists = 'package_exists'
const outputVersionExists = 'version_exists'

async function run(): Promise<void> {
  const rawType = core.getInput('package_type', {required: true})
  if (components['schemas']['package']['package_type']) {
    core.error('invalid package type provided')
    return
  }
  const packageName = core.getInput('package_name', {required: true})
  const packageOwner = core.getInput('package_owner', {required: true})
  const packageVersion = core.getInput('package_version', {required: true})

  const octokit = new Octokit({auth: core.getInput('token')})

  const packageExists = doesPackageExists(octokit, {
    owner: packageOwner,
    name: packageName,
    type: packageType
  })

  core.setOutput(outputPackageExists, packageExists)
  core.setOutput(outputVersionExists, false)
}

run()

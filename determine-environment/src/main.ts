import * as core from '@actions/core'
import {isProductionTag, isStagingBranch} from './environment'
import {getEventName, getRepository} from './action'
import {Octokit} from 'octokit'

const environment = 'environment'
const variable = 'variable'

const prodEnv = core.getInput('production_variable')
const stagingEnv = core.getInput('staging_variable')
const developEnv = core.getInput('development_variable')

async function run(): Promise<void> {
  core.setOutput(environment, 'development')
  core.setOutput(variable, developEnv)
  const eventName = getEventName()
  if (eventName !== 'push' && eventName !== 'workflow_dispatch') {
    return
  }

  const token = core.getInput('token')
  const octokit = new Octokit({auth: token})
  const repository = await getRepository(octokit)

  if (await isStagingBranch(repository.data.default_branch)) {
    core.setOutput(environment, 'staging')
    core.setOutput(variable, stagingEnv)
    return
  }

  if (await isProductionTag(octokit, repository.data.default_branch)) {
    core.setOutput(environment, 'production')
    core.setOutput(variable, prodEnv)
  }
}

run()

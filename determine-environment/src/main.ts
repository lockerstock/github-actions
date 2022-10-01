import * as core from '@actions/core'
import {isProductionTag, isStagingBranch} from './environment'
import {getEventName, getRepository} from './action'
import {Octokit} from 'octokit'

const environment = 'environment'

async function run(): Promise<void> {
  core.setOutput(environment, 'development')
  if (getEventName() !== 'push') {
    return
  }

  const token = core.getInput('token')
  const octokit = new Octokit({auth: token})
  const repository = await getRepository(octokit)

  if (await isStagingBranch(repository.default_branch)) {
    core.setOutput(environment, 'staging')
    return
  }

  if (await isProductionTag(octokit, repository.default_branch)) {
    core.setOutput(environment, 'production')
  }
}

run()

import {Octokit} from 'octokit'

export function getRepoOwner(): string {
  return process.env.GITHUB_REPOSITORY_OWNER || ''
}

export function getRefName() {
  return process.env.GITHUB_REF_NAME
}

export function getRepo(): string {
  const fullRepo = process.env.GITHUB_REPOSITORY || ''
  const parts = fullRepo.split('/')

  if (parts.length === 2) {
    return parts[1]
  }

  return ''
}

export function getSha(): string {
  return process.env.GITHUB_SHA || ''
}

export function getEventName(): string {
  return process.env.GITHUB_EVENT_NAME || ''
}

type RefType = 'branch' | 'tag' | undefined
export function getRefType(): RefType {
  return process.env.GITHUB_REF_TYPE as RefType
}

export async function getRepository(octokit: Octokit) {
  const owner = getRepoOwner()
  const repo = getRepo()

  return octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo
  })
}

import * as core from '@actions/core'
import {Octokit} from '@octokit/core'
import {components} from '@octokit/openapi-types'

interface PackageExists {
  owner: string
  name: string
  type: components['schemas']['package']['package_type']
}

export async function doesPackageExists(
  client: Octokit,
  config: PackageExists
) {
  const pkg = await getPackage(client, config)
  return pkg.data.name === config.name
}

async function getPackage(client: Octokit, {owner, name, type}: PackageExists) {
  return await client.request(
    'GET /orgs/{org}/packages/{package_type}/{package_name}',
    {
      org: owner,
      package_name: name,
      package_type: type
    }
  )
}

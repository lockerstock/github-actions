import {components} from '@octokit/openapi-types';
import {getContainerManifest} from './get-container-manifest';
import {ManifestType} from './manifest-types';

interface AppendContainerManifest {
  owner: string;
  name: string;
}

type ManifestContainer = components['schemas']['package-version'] & {
  manifest?: ManifestType;
};

export async function appendContainerManifests(
  containers: components['schemas']['package-version'][],
  config: AppendContainerManifest
): Promise<ManifestContainer[]> {
  return Promise.all(
    containers.map(container => appendContainerManifest(container, config))
  );
}

async function appendContainerManifest(
  container: components['schemas']['package-version'],
  {owner, name}: AppendContainerManifest
): Promise<ManifestContainer> {
  if (
    container.metadata &&
    container.metadata.container &&
    container.metadata.container.tags.length
  ) {
    const manifest = await getContainerManifest({
      owner,
      name,
      tag: container.metadata?.container?.tags[0]
    });

    return {...container, manifest};
  }
  return container;
}

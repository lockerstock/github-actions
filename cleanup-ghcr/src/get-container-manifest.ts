import {exec} from 'child_process';
import util from 'util';
import {ManifestType} from './manifest-types';

const promiseExec = util.promisify(exec);

interface GetContainerManifest {
  registry?: string;
  owner: string;
  name: string;
  tag: string;
}

export async function getContainerManifest({
  registry = 'ghcr.io',
  owner,
  name,
  tag
}: GetContainerManifest): Promise<ManifestType> {
  const {stdout, stderr} = await promiseExec(
    `docker manifest inspect ${registry}/${owner}/${name}:${tag}`
  );

  if (stderr.length > 0) {
    throw new Error(stderr);
  }

  return JSON.parse(stdout);
}

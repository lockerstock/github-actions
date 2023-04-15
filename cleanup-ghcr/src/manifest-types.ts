export type ManifestList = {
  schemaVersion: number;
  mediaType: 'application/vnd.docker.distribution.manifest.list.v2+json';
  manifests: {
    mediaType: string;
    size: number;
    digest: string;
    platform: {architecture: string; os: string};
  }[];
};
export type Manifest = {
  mediaType: 'application/vnd.docker.distribution.manifest.v2+json';
  schemaVersion: number;
  config: {
    mediaType: string;
    digest: string;
    size: number;
  };
  layers: {
    mediaType: string;
    digest: string;
    size: number;
  }[];
};

export type ManifestType = Manifest | ManifestList;

import {components} from '@octokit/openapi-types';

interface FilterContainerVersions {
  keepTimestamp: Date;
  tagsToKeep: string[];
}

interface Filtered {
  keep: components['schemas']['package-version'][];
  drop: components['schemas']['package-version'][];
  noTags: components['schemas']['package-version'][];
}

/** filterContainerVersions
 * Filters provided list of container versions down to only containers that do not meet provided criteria and should be deleted.
 */
export function filterContainerVersions(
  containers: components['schemas']['package-version'][],
  filters: FilterContainerVersions
): Filtered {
  return containers.reduce(
    (acc, container) => {
      if (container.metadata?.container?.tags.length === 0) {
        acc.noTags.push(container);
        return acc;
      }

      if (
        new Date(container.updated_at) < filters.keepTimestamp &&
        !filters.tagsToKeep.some(tagToKeep =>
          container.metadata?.container?.tags.includes(tagToKeep)
        )
      ) {
        acc.drop.push(container);
        return acc;
      }

      acc.keep.push(container);
      return acc;
    },
    {
      keep: [],
      drop: [],
      noTags: []
    } as Filtered
  );
}

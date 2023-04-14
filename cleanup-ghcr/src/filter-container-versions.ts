import {components} from '@octokit/openapi-types';

interface FilterContainerVersions {
  keepTimestamp: Date;
  keepTags: string[];
}

interface Filtered {
  keep: components['schemas']['package-version'][];
  drop: components['schemas']['package-version'][];
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
        acc.drop.push(container);
        return acc;
      }

      if (
        new Date(container.updated_at) < filters.keepTimestamp &&
        !filters.keepTags.some(keepTag =>
          container.metadata?.container?.tags.includes(keepTag)
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
      drop: []
    } as Filtered
  );
}

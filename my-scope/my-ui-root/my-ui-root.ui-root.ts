import { UIRoot } from '@teambit/ui';
import { ComponentID } from '@teambit/component';

import type { MyUiRootMain } from './my-ui-root.main.runtime';

export class MyUIRoot implements UIRoot {
  constructor(
    /**
     * scope extension.
     */
    private myUi: MyUiRootMain
  ) {}

  get name() {
    return this.myUi.name;
  }

  get path(): string {
    return this.myUi.path;
  }

  get configFile(): string {
    return '';
  }

  get devServers() {
    return Promise.resolve([]);
  }

  buildOptions = {
    ssr: true,
  };

  resolveAspects(runtimeName: string, componentIds?: ComponentID[]) {
    return this.myUi.resolveAspects(runtimeName, componentIds);
  }

  async resolvePattern() {
    return [];
  }
}

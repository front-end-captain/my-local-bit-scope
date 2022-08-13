import { UIAspect, UiMain } from "@teambit/ui";
import {
  CLIAspect,
  CLIMain,
  MainRuntime as CLIMainRuntime,
} from "@teambit/cli";
import { WorkspaceAspect, Workspace } from "@teambit/workspace";
import AspectLoaderAspect, { AspectLoaderMain } from "@teambit/aspect-loader";
// import { LoggerAspect, LoggerMain, Logger } from '@teambit/logger';
import { ComponentID } from "@teambit/component";
import { MyUiRootAspect } from "./my-ui-root.aspect";
import { MyUIRoot } from "./my-ui-root.ui-root";
import path from "path";

export type ResolveAspectsOptions = {
  /**
   * Do not return results for the core aspects
   */
  excludeCore?: boolean;
  /**
   * Only return results for the provided list of ids
   */
  requestedOnly?: boolean;
};

export class MyUiRootMain {
  private _name: string;
  private _path: string;

  constructor(
    private ui: UiMain,
    private aspectLoader: AspectLoaderMain,
    private workspace: Workspace
  ) {
    const packagePath = path.resolve(__dirname, "../");
    this._path = this.workspace.path;
    this._name = "my-scope/my-ui-root";
  }

  /**
   * name of the scope
   */
  get name(): string {
    return this._name;
  }

  get path(): string {
    return this._path;
  }

  async resolveAspects(runtimeName: string, componentIds?: ComponentID[]) {
    return this.workspace.resolveAspects(runtimeName, componentIds);
  }

  static slots = [];
  // define your aspect dependencies here.
  // in case you need to use another aspect API.
  static dependencies = [UIAspect, AspectLoaderAspect, WorkspaceAspect];

  static runtime = CLIMainRuntime;

  static async provider([ui, aspectLoader, workspace]: [
    UiMain,
    AspectLoaderMain,
    Workspace
  ]) {
    const myUi = new MyUiRootMain(ui, aspectLoader, workspace);

    if (ui) {
      ui.registerUiRoot(new MyUIRoot(myUi));
    }

    return myUi;
  }
}

MyUiRootAspect.addRuntime(MyUiRootMain);

export default MyUiRootMain;

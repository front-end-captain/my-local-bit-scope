import React from "react";
import { UIAspect, UIRuntime, UiUI, UIRootUI } from "@teambit/ui";
import { MyUiRootAspect } from "./my-ui-root.aspect";

export class MyUi {
  static slots = [];
  // define your aspect dependencies here.
  // in case you need to use another aspect API.
  static dependencies = [UIAspect];

  static runtime = UIRuntime;

  static defineRuntime = "browser";

  uiRoot(): UIRootUI {
    return {
      routes: [
        {
          path: "/*",
          element: (
            <div>
              <h1 style={{ fontSize: "24px" }}>this is my root ui</h1>
            </div>
          ),
        },
      ],
    };
  }

  static async provider([ui]: [UiUI]) {
    const myUi = new MyUi();

    if (ui) {
      ui.registerRoot(myUi.uiRoot.bind(myUi));
    }

    return myUi;
  }
}

MyUiRootAspect.addRuntime(MyUi);

export default MyUi;

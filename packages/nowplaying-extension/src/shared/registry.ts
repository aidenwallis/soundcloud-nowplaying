import {Module} from "../shared/interfaces/module";

export class ModuleRegistry {
  public constructor(private modules: Module[]) {}

  public register() {
    this.modules.forEach((m) => m.register());
  }
}

package expo.modules.cellular;

import android.content.Context;

import java.util.Collections;
import java.util.List;

import expo.modules.core.BasePackage;
import expo.modules.core.ExportedModule;
import expo.modules.core.ViewManager;

public class CellularPackage extends BasePackage {
  @Override
  public List<ExportedModule> createExportedModules(Context context) {
    return Collections.singletonList((ExportedModule) new CellularModule(context));
  }
}

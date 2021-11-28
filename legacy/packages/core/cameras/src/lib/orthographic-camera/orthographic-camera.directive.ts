// GENERATED

import { NgtCommonCamera, NgtObject3d, NGT_OBJECT_3D_CONTROLLER_PROVIDER } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-orthographic-camera',
  exportAs: 'ngtOrthographicCamera',
  providers: [
    {
      provide: NgtCommonCamera,
      useExisting: NgtOrthographicCamera,
    },
    {
      provide: NgtObject3d,
      useExisting: NgtOrthographicCamera,
    },
    NGT_OBJECT_3D_CONTROLLER_PROVIDER,
  ],
})
export class NgtOrthographicCamera extends NgtCommonCamera<THREE.OrthographicCamera> {
  
  static ngAcceptInputType_args: ConstructorParameters<typeof THREE.OrthographicCamera> | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.OrthographicCamera>) {
    this.extraArgs = v;
  }

  cameraType = THREE.OrthographicCamera;
}

@NgModule({
  declarations: [NgtOrthographicCamera],
  exports: [NgtOrthographicCamera],
})
export class NgtOrthographicCameraModule {}

// GENERATED

import {
  NgtCommonLine,
  NgtObject3d,
  NGT_OBJECT_3D_CONTROLLER_PROVIDER,
} from '@angular-three/core';
import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-line',
  exportAs: 'ngtLine',
  providers: [
    {
      provide: NgtObject3d,
      useExisting: NgtLine,
    },
    NGT_OBJECT_3D_CONTROLLER_PROVIDER,
  ],
})
export class NgtLine extends NgtCommonLine<THREE.Line> {
  lineType = THREE.Line;
}

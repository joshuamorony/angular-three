// GENERATED
import { NgtGeometry } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-torus-knot-geometry',
  exportAs: 'ngtTorusKnotGeometry',
  providers: [
    {
      provide: NgtGeometry,
      useExisting: NgtTorusKnotGeometry,
    }
  ],
})
export class NgtTorusKnotGeometry extends NgtGeometry<THREE.TorusKnotGeometry> {
  
  static ngAcceptInputType_args: ConstructorParameters<typeof THREE.TorusKnotGeometry> | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.TorusKnotGeometry>) {
    this.extraArgs = v;
  }

  geometryType = THREE.TorusKnotGeometry;
}

@NgModule({
  declarations: [NgtTorusKnotGeometry],
  exports: [NgtTorusKnotGeometry],
})
export class NgtTorusKnotGeometryModule {}


// GENERATED

import { Directive, Input } from '@angular/core';
import { WireframeGeometry } from 'three';
import { ThreeBufferGeometry } from '../abstracts';

@Directive({
  selector: 'ngt-wireframeGeometry',
  exportAs: 'ngtWireframeGeometry',
  providers: [
    {
      provide: ThreeBufferGeometry,
      useExisting: WireframeGeometryDirective,
    },
  ],
})
export class WireframeGeometryDirective extends ThreeBufferGeometry<WireframeGeometry> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof WireframeGeometry>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof WireframeGeometry>) {
    this.extraArgs = v;
  }

  geometryType = WireframeGeometry;
}
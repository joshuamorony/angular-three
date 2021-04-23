// GENERATED

import { Directive, Input } from '@angular/core';
import { TubeBufferGeometry } from 'three';
import { ThreeBufferGeometry } from '../abstracts';

@Directive({
  selector: 'ngt-tubeBufferGeometry,ngt-tubeGeometry',
  exportAs: 'ngtTubeBufferGeometry',
  providers: [
    {
      provide: ThreeBufferGeometry,
      useExisting: TubeBufferGeometryDirective,
    },
  ],
})
export class TubeBufferGeometryDirective extends ThreeBufferGeometry<TubeBufferGeometry> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof TubeBufferGeometry>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof TubeBufferGeometry>) {
    this.extraArgs = v;
  }

  geometryType = TubeBufferGeometry;
}

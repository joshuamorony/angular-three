// GENERATED

import { Directive, Input } from '@angular/core';
import { QuadraticBezierCurve } from 'three';
import { ThreeCurve } from '../abstracts';

@Directive({
  selector: 'ngt-quadraticBezierCurve',
  exportAs: 'ngtQuadraticBezierCurve',
  providers: [
    {
      provide: ThreeCurve,
      useExisting: QuadraticBezierCurveDirective,
    },
  ],
})
export class QuadraticBezierCurveDirective extends ThreeCurve<QuadraticBezierCurve> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof QuadraticBezierCurve>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof QuadraticBezierCurve>) {
    this.extraArgs = v;
  }

  curveType = QuadraticBezierCurve;
}

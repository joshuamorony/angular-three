// GENERATED
import { Directive, Input, NgModule, NgZone } from '@angular/core';
import * as THREE from 'three';
import { Controller, createControllerProviderFactory } from './controller';

@Directive({
  selector: `
    ngt-mesh,
    ngt-instanced-mesh,
    ngt-skinned-mesh,
    ngt-line,
    ngt-line-loop,
    ngt-line-segments,
    ngt-points
  `,
  exportAs: 'ngtContentGeometryController',
})
export class NgtContentGeometryController extends Controller {
  #geometryInput?: THREE.BufferGeometry | undefined;

  @Input() set geometry(v: THREE.BufferGeometry | undefined) {
    if (v) {
      this.#geometryInput = v;
      this.construct();
    }
  }

  @Input() contentGeometryController?: NgtContentGeometryController;

  get geometry() {
    return this.#geometry;
  }

  #geometry: THREE.BufferGeometry | undefined = undefined;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  construct() {
    this.#geometry = this.#getGeometry(this.#geometryInput);
  }

  #getGeometry(
    input: THREE.BufferGeometry | undefined
  ): THREE.BufferGeometry | undefined {
    if (input instanceof THREE.BufferGeometry) {
      return input;
    }

    return undefined;
  }

  get controller(): Controller | undefined {
    return this.contentGeometryController;
  }

  get props(): string[] {
    return ['geometry'];
  }
}

@NgModule({
  declarations: [NgtContentGeometryController],
  exports: [NgtContentGeometryController],
})
export class NgtContentGeometryControllerModule {}

export const [
  NGT_CONTENT_GEOMETRY_WATCHED_CONTROLLER,
  NGT_CONTENT_GEOMETRY_CONTROLLER_PROVIDER,
] = createControllerProviderFactory({
  controller: NgtContentGeometryController,
  watchedControllerTokenName: 'Watched ContentGeometryController',
});

import { AnyConstructor, NgtCoreModule } from '@angular-three/core';
import {
  NgtPrimitive,
  NgtPrimitiveModule,
} from '@angular-three/core/primitive';
import {
  NGT_EFFECT_CONTROLLER_PROVIDER,
  NGT_EFFECT_TYPE,
  NGT_EFFECT_WATCH_CONTROLLER,
  NgtEffectComposerModule,
  NgtEffectController,
} from '@angular-three/postprocessing';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgModule,
  ViewChild,
} from '@angular/core';
// @ts-ignore
import { VignetteEffect } from 'postprocessing';

@Component({
  selector: 'ngt-vignette',
  exportAs: 'ngtVignette',
  template: `
    <ngt-primitive
      *ngIf="effect"
      [object]="$any(effect)"
      [dispose]="null"
      appendMode="none"
    ></ngt-primitive>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NGT_EFFECT_CONTROLLER_PROVIDER,
    { provide: NGT_EFFECT_TYPE, useValue: VignetteEffect },
  ],
})
export class NgtVignette {
  static ngAcceptInputType_options:
    | ConstructorParameters<AnyConstructor<VignetteEffect>>[0]
    | undefined;

  @ViewChild(NgtPrimitive) primitive?: NgtPrimitive;

  constructor(
    @Inject(NGT_EFFECT_WATCH_CONTROLLER)
    private effectController: NgtEffectController
  ) {}

  get effect() {
    return this.effectController.effect;
  }
}

@NgModule({
  declarations: [NgtVignette],
  exports: [NgtVignette],
  imports: [
    NgtCoreModule,
    NgtPrimitiveModule,
    NgtEffectComposerModule,
    CommonModule,
  ],
})
export class NgtVignetteModule {}

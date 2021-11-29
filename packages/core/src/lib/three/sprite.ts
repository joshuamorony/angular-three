import {
  AfterContentInit,
  ContentChild,
  Directive,
  Inject,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import * as THREE from 'three';
import {
  NGT_OBJECT_CONTROLLER_PROVIDER,
  NgtObject3dController,
} from '../controllers/object-3d.controller';
import type { AnyConstructor } from '../models';
import { NgtMaterial } from './material';

@Directive()
export abstract class NgtCommonSprite<
  TSprite extends THREE.Sprite = THREE.Sprite
> implements AfterContentInit, OnInit
{
  @Input() material?: THREE.SpriteMaterial;

  @ContentChild(NgtMaterial) materialDirective?: NgtMaterial;

  abstract spriteType: AnyConstructor<TSprite>;

  #sprite!: TSprite;

  constructor(
    @Inject(NGT_OBJECT_CONTROLLER_PROVIDER)
    protected objectController: NgtObject3dController,
    protected ngZone: NgZone
  ) {}

  ngOnInit() {
    this.objectController.initFn = () => {
      return this.ngZone.runOutsideAngular(() => {
        if (this.material) {
          this.#sprite = new this.spriteType(this.material);
        } else if (this.materialDirective) {
          if (this.materialDirective.material instanceof THREE.SpriteMaterial) {
            this.#sprite = new this.spriteType(this.materialDirective.material);
          }
        }

        return this.#sprite;
      });
    };
  }

  ngAfterContentInit() {
    this.objectController.init();
  }

  get sprite() {
    return this.#sprite;
  }
}
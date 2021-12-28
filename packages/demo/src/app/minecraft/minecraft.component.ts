import { NgtCoreModule } from '@angular-three/core';
import { NgtPlaneGeometryModule } from '@angular-three/core/geometries';
import { NgtGroupModule } from '@angular-three/core/group';
import {
  NgtDirectionalLightModule,
  NgtHemisphereLightModule,
} from '@angular-three/core/lights';
import {
  NgtMeshBasicMaterialModule,
  NgtMeshLambertMaterialModule,
  NgtMeshNormalMaterialModule,
  NgtShadowMaterialModule,
} from '@angular-three/core/materials';
import { NgtMeshModule } from '@angular-three/core/meshes';
import {
  NgtSobaFlyControls,
  NgtSobaFlyControlsModule,
} from '@angular-three/soba/controls';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgModule } from '@angular/core';
import * as THREE from 'three';
import { MinecraftGeometryComponent } from './minecraft-geometry.component';
import { ImprovedNoise } from './utils/ImprovedNoise';

@Component({
  selector: 'ngt-minecraft',
  template: `
    <ngt-canvas [camera]="{ fov: 60 }">
      <ngt-soba-fly-controls
        #flyControls="ngtSobaFlyControls"
        (ready)="onReady(flyControls)"
      ></ngt-soba-fly-controls>

      <ngt-minecraft-geometry
        *ngFor="let geometry of geometries"
        [side]="geometry.side"
        [matrix]="geometry.matrix"
      ></ngt-minecraft-geometry>
      <!--<ngt-directional-light [args]="['#ffffff']" [position]="[0, 20, 10]" [castShadow]="true"></ngt-directional-light>-->
      <!--<ngt-stats></ngt-stats>
    [rotation]="[0, 0.5 | mathConst: 'PI', 0]"
    <ngt-effect-composer>
      <ngt-noise [options]="{ premultiply: true }"></ngt-noise>
    </ngt-effect-composer>
  -->
    </ngt-canvas>
  `,
})
export class MinecraftComponent implements AfterViewInit {
  public geometries: Array<{
    side: 'px' | 'py' | 'pz' | 'nx' | 'nz';
    matrix: THREE.Matrix4;
  }> = [];

  #worldWidth = 16;
  #worldDepth = 16;
  #worldHalfWidth = this.#worldWidth / 2;
  #worldHalfDepth = this.#worldDepth / 2;
  #data = this.#generateHeight(this.#worldWidth, this.#worldDepth);

  ngAfterViewInit() {
    for (let z = 0; z < this.#worldDepth; z++) {
      for (let x = 0; x < this.#worldWidth; x++) {
        const h = this.#getY(x, z);

        const translatedMatrix = new THREE.Matrix4().makeTranslation(
          x * 100 - this.#worldHalfWidth * 100,
          h * 100,
          z * 100 - this.#worldHalfDepth * 100
        );

        const px = this.#getY(x + 1, z);
        const nx = this.#getY(x - 1, z);
        const pz = this.#getY(x, z + 1);
        const nz = this.#getY(x, z - 1);

        this.geometries.push({
          side: 'py',
          matrix: translatedMatrix,
        });

        if ((px !== h && px !== h + 1) || x === 0) {
          this.geometries.push({
            side: 'px',
            matrix: translatedMatrix,
          });
        }

        if ((nx !== h && nx !== h + 1) || x === this.#worldWidth - 1) {
          this.geometries.push({
            side: 'nx',
            matrix: translatedMatrix,
          });
        }

        if ((pz !== h && pz !== h + 1) || z === this.#worldDepth - 1) {
          this.geometries.push({
            side: 'pz',
            matrix: translatedMatrix,
          });
        }

        if ((nz !== h && nz !== h + 1) || z === 0) {
          this.geometries.push({
            side: 'nz',
            matrix: translatedMatrix,
          });
        }
      }
    }
  }

  onReady(flyControls: NgtSobaFlyControls) {
    flyControls.controls.movementSpeed = 1000;
    flyControls.controls.rollSpeed = Math.PI / 10;
  }

  #generateHeight(width: number, height: number) {
    const data = [],
      perlin = new ImprovedNoise(),
      size = width * height,
      z = Math.random() * 100;
    let quality = 2;
    for (let j = 0; j < 4; j++) {
      if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;
      for (let i = 0; i < size; i++) {
        const x = i % width,
          y = (i / width) | 0;
        data[i] += perlin.noise(x / quality, y / quality, z) * quality;
      }
      quality *= 4;
    }
    return data;
  }

  #getY(x: number, z: number) {
    return (this.#data[x + z * this.#worldWidth] * 0.15) | 0;
  }
}

@NgModule({
  declarations: [MinecraftComponent, MinecraftGeometryComponent],
  exports: [MinecraftComponent],
  imports: [
    NgtCoreModule,
    NgtGroupModule,
    NgtMeshModule,
    NgtPlaneGeometryModule,
    NgtMeshBasicMaterialModule,
    NgtShadowMaterialModule,
    NgtMeshNormalMaterialModule,
    NgtMeshLambertMaterialModule,
    NgtSobaFlyControlsModule,
    NgtHemisphereLightModule,
    NgtDirectionalLightModule,
    CommonModule,
  ],
})
export class MinecraftComponentModule {}

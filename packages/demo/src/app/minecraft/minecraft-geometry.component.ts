import { NgtPlaneGeometry } from '@angular-three/core/geometries';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Texture, DoubleSide, Side } from 'three';

@Component({
  selector: 'ngt-minecraft-geometry',
  template: `
    <ngt-mesh>
      <ngt-plane-geometry #plane="ngtPlaneGeometry" [args]="[100, 100]">
      </ngt-plane-geometry>
      <ngt-mesh-lambert-material
        [parameters]="{ map: texture, side: doubleSide }"
      ></ngt-mesh-lambert-material>
    </ngt-mesh>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinecraftGeometryComponent implements AfterViewInit {
  @Input() matrix!: THREE.Matrix4;
  @Input() side!: 'px' | 'py' | 'pz' | 'nx' | 'nz';
  @Input() texture!: Texture;

  @ViewChild('plane') plane!: NgtPlaneGeometry;

  public doubleSide: Side = DoubleSide;

  ngAfterViewInit() {
    this.plane.geometry.applyMatrix4(this.matrix);

    if (this.side === 'px') {
      this.plane.geometry.attributes.uv.setY(0, 0.5);
      this.plane.geometry.attributes.uv.setY(1, 0.5);
      this.plane.geometry.rotateY(Math.PI / 2);
      this.plane.geometry.translate(50, 0, 0);
    }

    if (this.side === 'py') {
      this.plane.geometry.attributes.uv.setY(2, 0.5);
      this.plane.geometry.attributes.uv.setY(3, 0.5);
      this.plane.geometry.rotateY(-Math.PI / 2);
      this.plane.geometry.translate(0, 50, 0);
    }

    if (this.side === 'pz') {
      this.plane.geometry.attributes.uv.setY(0, 0.5);
      this.plane.geometry.attributes.uv.setY(1, 0.5);
      this.plane.geometry.translate(0, 0, 50);
    }

    if (this.side === 'nx') {
      this.plane.geometry.attributes.uv.setY(0, 0.5);
      this.plane.geometry.attributes.uv.setY(1, 0.5);
      this.plane.geometry.rotateY(-Math.PI / 2);
      this.plane.geometry.translate(-50, 0, 0);
    }

    if (this.side === 'nz') {
      this.plane.geometry.attributes.uv.setY(0, 0.5);
      this.plane.geometry.attributes.uv.setY(1, 0.5);
      this.plane.geometry.rotateY(Math.PI);
      this.plane.geometry.translate(0, 0, -50);
    }
  }
}

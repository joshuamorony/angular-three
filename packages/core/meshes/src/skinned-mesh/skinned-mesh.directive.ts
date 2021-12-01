import {
  NGT_MATERIAL_GEOMETRY_CONTROLLER_PROVIDER,
  NGT_OBJECT_CONTROLLER_PROVIDER,
  NGT_OBJECT_INPUTS_WATCHED_CONTROLLER,
  NGT_OBJECT_TYPE,
  NGT_OBJECT_WATCHED_CONTROLLER,
  NgtCommonMesh,
  NgtMatrix4,
  NgtObject3dController,
  NgtObject3dInputsController,
} from '@angular-three/core';
import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  NgZone,
  OnInit,
  Optional,
  Output,
  QueryList,
} from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-bone',
  exportAs: 'ngtBone',
  providers: [NGT_OBJECT_CONTROLLER_PROVIDER],
})
export class NgtBone implements AfterContentInit {
  #bone?: THREE.Bone;
  get bone() {
    return this.#bone;
  }

  constructor(
    @Inject(NGT_OBJECT_WATCHED_CONTROLLER)
    private objectController: NgtObject3dController,
    @Inject(NGT_OBJECT_INPUTS_WATCHED_CONTROLLER)
    private objectInputsController: NgtObject3dInputsController,
    private ngZone: NgZone,
    @Optional()
    private parentSkinnedMesh: NgtSkinnedMesh | null
  ) {
    if (!parentSkinnedMesh) {
      throw new Error('ngt-bone must be used within a ngt-skinned-mesh');
    }
    objectInputsController.appendTo = parentSkinnedMesh.mesh;
    objectController.initFn = () => {
      return this.ngZone.runOutsideAngular(() => {
        this.#bone = new THREE.Bone();
        return this.#bone;
      });
    };
  }

  ngAfterContentInit() {
    this.ngZone.runOutsideAngular(() => {
      this.objectController.init();
    });
  }
}

@Directive({
  selector: 'ngt-skeleton',
  exportAs: 'ngtSkeleton',
})
export class NgtSkeleton implements OnInit {
  @Input() boneInverses?: NgtMatrix4[];
  @Output() ready = new EventEmitter();

  @ContentChildren(NgtBone) bones?: QueryList<NgtBone>;

  #skeleton?: THREE.Skeleton;
  get skeleton() {
    return this.#skeleton;
  }

  constructor(
    private ngZone: NgZone,
    @Optional() private skinnedMesh: NgtSkinnedMesh | null
  ) {
    if (!skinnedMesh) {
      throw new Error('ngt-skeleton must be used within a ngt-skinned-mesh');
    }
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      if (this.bones) {
        const boneInverses: THREE.Matrix4[] | undefined = this.boneInverses
          ? this.boneInverses.map((threeMaxtrix) => {
              if (threeMaxtrix instanceof THREE.Matrix4) return threeMaxtrix;
              return new THREE.Matrix4().set(...threeMaxtrix);
            })
          : undefined;
        this.#skeleton = new THREE.Skeleton(
          this.bones.filter((bone) => !!bone.bone).map((bone) => bone.bone!),
          boneInverses
        );
        this.ready.emit();

        if (this.skinnedMesh) {
          const bindMatrix: THREE.Matrix4 | undefined = this.skinnedMesh
            .bindMatrix
            ? this.skinnedMesh.bindMatrix instanceof THREE.Matrix4
              ? this.skinnedMesh.bindMatrix
              : new THREE.Matrix4().set(...this.skinnedMesh.bindMatrix)
            : undefined;
          this.skinnedMesh.mesh.bind(this.skeleton!, bindMatrix);
        }
      }
    });
  }
}

@Directive({
  selector: 'ngt-skinned-mesh',
  exportAs: 'ngtSkinnedMesh',
  providers: [
    { provide: NgtCommonMesh, useExisting: NgtSkinnedMesh },
    NGT_MATERIAL_GEOMETRY_CONTROLLER_PROVIDER,
    { provide: NGT_OBJECT_TYPE, useValue: THREE.SkinnedMesh },
  ],
})
export class NgtSkinnedMesh extends NgtCommonMesh<THREE.SkinnedMesh> {
  @Input() set args(v: [boolean]) {
    if (this.materialGeometryController) {
      this.materialGeometryController.meshArgs = v;
    }
  }

  @Input() bindMatrix?: NgtMatrix4;
  @Input() bindMode?: string;
}

@NgModule({
  declarations: [NgtSkinnedMesh, NgtBone, NgtSkeleton],
  exports: [NgtSkinnedMesh, NgtBone, NgtSkeleton],
})
export class NgtSkinnedMeshModule {}

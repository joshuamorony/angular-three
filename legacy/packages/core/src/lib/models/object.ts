import { UnknownRecord } from './common';
import { NgtColor, NgtEuler, NgtQuaternion, NgtVector3 } from './three';

export interface Object3dProps {
  name?: string;
  position?: NgtVector3;
  rotation?: NgtEuler;
  quaternion?: NgtQuaternion;
  scale?: NgtVector3;
  color?: NgtColor;
  userData?: UnknownRecord;
  dispose?: () => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
  visible?: boolean;
  matrixAutoUpdate?: boolean;
}


export interface Target {
  id: string;
  name: string;
  description: string;
}

export interface TargetPhase {
  phase: string;
  title: string;
  targets: Target[];
}

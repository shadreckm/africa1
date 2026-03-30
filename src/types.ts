export interface ArchitectureSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Service {
  name: string;
  role: string;
  tech: string[];
}

export interface DataFlowStep {
  step: number;
  action: string;
  from: string;
  to: string;
  description: string;
}

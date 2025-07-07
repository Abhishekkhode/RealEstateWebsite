// src/types/Agent.ts
export interface Agent {
  id: string;
  agentName: string;   // Matches backend: agentName
  agentPhone: string;  // Matches backend: agentPhone
  agentEmail: string;  // Matches backend: agentEmail
  agentPhoto?: string; // Matches backend: agentPhoto, made optional as it might be in form
  // Tgreranumber: string; // Matches backend: tgreraBlock, made optional as it might be in form
  Tgreranumber: string;
}
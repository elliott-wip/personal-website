import { ObjectId } from 'mongodb';

export interface Belief {
  _id?: ObjectId;
  id?: number; // For backwards compatibility with existing UI
  date: string;
  message: string;
  type: 'principle' | 'discovery';
  createdAt: Date;
}

export interface BeliefInput {
  message: string;
  type: 'principle' | 'discovery';
}

export interface BeliefResponse {
  id: string;
  date: string;
  message: string;
  type: 'principle' | 'discovery';
}

export function toBeliefResponse(belief: Belief): BeliefResponse {
  return {
    id: belief._id?.toString() || '',
    date: belief.date,
    message: belief.message,
    type: belief.type,
  };
}

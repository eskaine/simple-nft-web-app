import { CHAINS } from './enums';

export interface IMetadata {
  id: number;
  name: string;
  description: string;
  image_url: string;
  ipfs_url?: string;
  rarity: number;
  score: number;
  attributes: string[];
  isMinted?: boolean;
  chainName?: CHAINS;
}

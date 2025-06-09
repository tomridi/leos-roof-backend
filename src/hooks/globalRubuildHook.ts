// hooks/globalRebuildHook.ts
import { triggerRebuild } from '../utils/triggerRebuild';
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types';

export const rebuildAfterChange: CollectionAfterChangeHook = async () => {
  await triggerRebuild();
};

export const rebuildAfterDelete: CollectionAfterDeleteHook = async () => {
  await triggerRebuild();
};
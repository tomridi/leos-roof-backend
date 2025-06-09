// hooks/globalRebuildHook.ts
import { triggerRebuild } from '../utils/triggerRebuild'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const rebuildAfterChange: CollectionAfterChangeHook = async () => {
  await triggerRebuild()
}

export const rebuildAfterDelete: CollectionAfterDeleteHook = async () => {
  await triggerRebuild()
}

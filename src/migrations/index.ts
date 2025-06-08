import * as migration_20250608_121220 from './20250608_121220';

export const migrations = [
  {
    up: migration_20250608_121220.up,
    down: migration_20250608_121220.down,
    name: '20250608_121220'
  },
];

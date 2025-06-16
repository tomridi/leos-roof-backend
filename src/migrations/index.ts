import * as migration_20250608_121220 from './20250608_121220';
import * as migration_20250613_082805 from './20250613_082805';

export const migrations = [
  {
    up: migration_20250608_121220.up,
    down: migration_20250608_121220.down,
    name: '20250608_121220',
  },
  {
    up: migration_20250613_082805.up,
    down: migration_20250613_082805.down,
    name: '20250613_082805'
  },
];

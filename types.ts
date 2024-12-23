export enum DamageType {
  bludgeoning = 'bludgeoning',
  piercing = 'piercing',
  slashing = 'slashing',
  fire = 'fire',
  cold = 'cold',
  acid = 'acid',
  thunder = 'thunder',
  lightning = 'lightning',
  poison = 'poison',
  radiant = 'radiant',
  necrotic = 'necrotic',
  psychic = 'psychic',
  force = 'force',
}

export enum DefenseType {
  immunity = 'immunity',
  resistance = 'resistance',
}

export interface Defense {
  type: DamageType;
  defense: DefenseType;
}

export interface CharacterClass {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

export interface ItemModifier {
  affectedObject?: string;
  affectedValue?: string;
  value?: number;
}

export interface Item {
  name: string;
  modifier?: ItemModifier;
}

export interface Stats {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface CharacterData {
  filename?: string;
  name: string;
  level: number;
  hitPoints: number;
  classes: CharacterClass[];
  stats: Stats;
  items: Item[];
  defenses: Defense[];
  temporaryHitPoints: number;
}

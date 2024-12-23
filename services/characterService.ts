// Logic and operations for the character
import fs from 'fs/promises';
import path from 'path';
import Character from '../models/Character';
import NotFoundError from '../errors/NotFoundError';
import BadParameterError from '../errors/BadParameterError';
import { CharacterData, DamageType, Defense, DefenseType } from '../types';

const damageAlgorithm = new Map<DefenseType, (damage: number) => number>([
  [DefenseType.immunity, (damage) => 0],
  [DefenseType.resistance, (damage) => damage / 2],
]);

async function addCharacterFromFile(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const characterData: CharacterData = JSON.parse(data);
    const filename = path
      .basename(filePath)
      .toLocaleLowerCase()
      .split('.json')[0];
    characterData.filename = filename;

    const existingCharacter = await Character.findOne({ filename });
    if (existingCharacter) {
      console.log(`Character "${characterData.filename}" already exists in DB.`);
      return;
    }

    const newCharacter = new Character(characterData);
    await newCharacter.save();
    console.log(`Character "${characterData.name}" saved to DB.`);
  } catch (error) {
    console.error('Error adding character from file to DB:', error);
  }
}

export async function addAllCharacters(folderPath: string): Promise<void> {
  try {
    const files = await fs.readdir(folderPath);
    await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map((file) => addCharacterFromFile(path.join(folderPath, file)))
    );
  } catch (error) {
    console.error('Error adding characters to DB:', error);
  }
}

async function getCharacterById(id: string): Promise<any> {
  const character = await Character.findOne({ filename: id }).exec();
  if (!character) {
    throw new NotFoundError('Character not found');
  }
  return character;
}

export async function findCharacterById(id: string) {
  let character = (await getCharacterById(id)).toObject({
    versionKey: false,
    flattenMaps: false,
  });

  if (!character) {
    throw new NotFoundError('Character not found');
  }

  delete character['_id'];
  delete character['filename'];
  
  return character;
}

export async function applyDamage(id: string, damageType: DamageType, damageAmount: number): Promise<any> {
  if (damageAmount < 0) {
    throw new BadParameterError("Damage amount can't be a negative value");
  }

  const validDamageTypes = Object.keys(DamageType);
  if (!validDamageTypes.includes(damageType.toLowerCase())) {
    throw new BadParameterError('Invalid damage type');
  }

  const character = await getCharacterById(id);
  if (!character) {
    throw new NotFoundError('Character not found');
  }

  const defense = character.defenses.find((defense: Defense) => defense.type === damageType);
  const effectiveDamage =
    !!defense && damageAlgorithm.has(defense.defense)
      ? damageAlgorithm.get(defense.defense)!(damageAmount)
      : damageAmount;

  // Reduce damage based on temporary Hit Points
  const damageAfterTemporaryHP = Math.max(0, effectiveDamage - character.temporaryHitPoints);
  character.temporaryHitPoints = Math.max(0, character.temporaryHitPoints - effectiveDamage);

  // Apply remaining damage to Hit Points
  character.hitPoints = Math.max(0, character.hitPoints - damageAfterTemporaryHP);

  // Save the updated character data to MongoDB
  await character.save();

  // Send back the updated character data
  return character;
}

export async function addHeal(id: string, healAmount: number): Promise<any> {
  if (healAmount < 0) {
    throw new BadParameterError("Heal amount can't be a negative value");
  }

  const character = await getCharacterById(id);
  if (!character) {
    throw new NotFoundError('Character not found');
  }

  character.hitPoints += healAmount;
  await character.save();

  return character;
}

export async function addTemporaryHitPoints(id: string, temporaryHpAmount: number): Promise<any> {
  if (temporaryHpAmount < 0) {
    throw new BadParameterError(
      "Temporary hit points can't be a negative value"
    );
  }

  const character = await getCharacterById(id);
  if (!character) {
    throw new NotFoundError('Character not found');
  }

  character.temporaryHitPoints = Math.max(character.temporaryHitPoints, temporaryHpAmount);

  await character.save();

  return character;
}

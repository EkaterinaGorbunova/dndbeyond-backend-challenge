// Mongoose model for the character
import mongoose, { Schema } from 'mongoose';
import { CharacterData } from '../types';

const defenseSchema = new Schema({
  type: String,
  defense: { type: String, enum: ['immunity', 'resistance'] },
});

const classSchema = new Schema({
  name: { type: String, required: true },
  hitDiceValue: { type: Number, required: true },
  classLevel: { type: Number, required: true },
});

const itemModifierSchema = new Schema({
  affectedObject: { type: String },
  affectedValue: { type: String },
  value: { type: Number },
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  modifier: itemModifierSchema,
});

const statsSchema = new Schema({
  strength: { type: Number },
  dexterity: { type: Number },
  constitution: { type: Number },
  intelligence: { type: Number },
  wisdom: { type: Number },
  charisma: { type: Number },
});

const characterSchema = new Schema<CharacterData>({
  filename: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  hitPoints: { type: Number, required: true },
  classes: [classSchema],
  stats: statsSchema,
  items: [itemSchema],
  defenses: [defenseSchema],
  temporaryHitPoints: { type: Number, require: true },
});

const Character = mongoose.models.Character || mongoose.model('Character', characterSchema);
export default Character;

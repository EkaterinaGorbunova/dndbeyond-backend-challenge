// Character-related request handling
import { Request, Response } from 'express';
import { DamageType } from '../types';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/NotFoundError';
import BadParameterError from '../errors/BadParameterError';
import * as characterService from '../services/characterService';

export async function getCharacter(req: Request, res: Response) {
  const { characterId } = req.params;

  try {
    const character = await characterService.findCharacterById(characterId);
    res.json(character);
  } catch (error) {
    console.error('Error fetching character:', error);
    const errorCode = getErrorCode(error);
    res.status(errorCode).json({ error: 'Internal server error' });
  }
}

export async function dealDamage(req: Request, res: Response) {
  const { characterId } = req.params;
  const { damageType, damageAmount } = req.body as { damageType: DamageType; damageAmount: number };

  try {
    const character = await characterService.applyDamage(characterId, damageType, damageAmount);
    res.json(character);
  } catch (error: any) {
    const errorCode = getErrorCode(error);
    res.status(errorCode).json({ error: error.message });
  }
}

export async function dealHeal(req: Request, res: Response) {
  const { characterId } = req.params;
  const { healAmount } = req.body as { healAmount: number };

  try {
    const character = await characterService.addHeal(characterId, healAmount);
    res.json(character);
  } catch (error: any) {
    const errorCode = getErrorCode(error);
    res.status(errorCode).json({ error: error.message });
  }
}

export async function dealTemporaryHitPoints(req: Request, res: Response) {
  const { characterId } = req.params;
  const { temporaryHpAmount } = req.body as { temporaryHpAmount: number };

  try {
    const character = await characterService.addTemporaryHitPoints(characterId, temporaryHpAmount);
    res.json(character);
  } catch (error: any) {
    const errorCode = getErrorCode(error);
    res.status(errorCode).json({ error: error.message });
  }
}

function getErrorCode(error: any) {
  let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
  if (error instanceof NotFoundError) {
    errorCode = StatusCodes.NOT_FOUND;
  } else if (error instanceof BadParameterError) {
    errorCode = StatusCodes.BAD_REQUEST;
  }
  return errorCode;
}

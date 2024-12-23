// Routes related to the character
import { Router } from 'express';
import * as characterController from '../controllers/characterController';

const router = Router();

router.get('/:characterId', characterController.getCharacter);
router.post('/deal-damage/:characterId', characterController.dealDamage);
router.post('/heal/:characterId', characterController.dealHeal);
router.post('/add-temporary-hp/:characterId', characterController.dealTemporaryHitPoints);

export default router;

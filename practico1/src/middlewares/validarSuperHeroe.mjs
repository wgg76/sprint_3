import { check } from 'express-validator';

export const validarSuperHeroe = [
  // Validamos 'nombreSuperHeroe'
  check('nombreSuperHeroe')
    .trim()
    .notEmpty().withMessage('El nombre del superhéroe es obligatorio.')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres.'),

  // Validamos 'nombreReal'
  check('nombreReal')
    .trim()
    .notEmpty().withMessage('El nombre real del superhéroe es obligatorio.')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre real del superhéroe debe tener entre 3 y 60 caracteres.'),

  // Otras validaciones para otros campos, si es necesario...
];


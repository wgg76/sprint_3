import { check } from 'express-validator';

export const validarSuperHeroe = [
    check('nombreSuperHeroe').trim().notEmpty().withMessage('El nombre del superhéroe es obligatorio.')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres.'),
        //check('edad').optional().isNumeric().withMessage('La edad debe ser un número válido.'),
        check('nombreReal').trim().notEmpty().withMessage('El nombre real es obligatorio.'),
        
        check('planetaOrigen').optional().isString().withMessage('El planeta debe ser un texto válido.')
];

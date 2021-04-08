import { IPatternInterface } from 'src/app/core/interfaces/back-end.interface';

export class PatternConstants {

    static PHONE: IPatternInterface = {
        pattern: /^\d{10}$/,
        message: 'Número inválido, debe ser a 10 dígitos.'
    };

    static EMAIL: IPatternInterface = {
        pattern: /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/,
        message: 'Correo electronico no válido.'
    };

    static DECIMALS: IPatternInterface = {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
        message: 'Monto inválido.'
    };

    static PASSWORD: IPatternInterface = {
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/,
        message: 'Tu contraseña debe contener mínimo 1 mayúscula, 1 número y 8 caracteres.'
    };

    static WWW: IPatternInterface = {
        pattern: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
        message: 'Página web inválida.'
    };

    static HTTP: IPatternInterface = {
        pattern: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        message: 'Página web inválida.'
    };

    static ALPHABETIC: IPatternInterface = {
        pattern: /^[a-zA-ZáéíóúñÁÉÍÓÚÇçÑñäëïöü ]*$/g,
        message: 'Campo inválido, no debe contener caracteres especiales ni números.'
    };

    static ONLY_NUMBERS: IPatternInterface = {
        pattern: /^[0-9]+$/,
        message: 'Solo se permiten caracteres numéricos.'
    };

    static WITHOUT_WHITE_SPACES: IPatternInterface = {
        pattern: /^\S+$/,
        message: 'No se permiten espacios en blanco.'
    };
}



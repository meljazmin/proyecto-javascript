const _mercadoPagoAPIErrors = [
    {
        code: 2000,
        description: 'No se ha encontrado el pago.'
    },
    {
        code: 4,
        description: 'El usuario no esta autorizado a acceder a este recurso.'
    },
    {
        code: 3002,
        description: 'El usuario no está autorizado a realizar esta acción.'
    },
    {
        code: 1,
        description: 'Error de parámetros.'
    },
    {
        code: 3,
        description: 'El token debe ser para test.'
    },
    {
        code: 5,
        description: 'Debes proveer tu access_token para proceder.'
    },
    {
        code: 23,
        description: "El siguiente parámetro debe ser una fecha válida en formato (yyyy-MM-dd'T'HH:mm:ssz) date_of_expiration."
    },
    {
        code: 1000,
        description: 'El número de filas excede los límites.'
    },
    {
        code: 1001,
        description: "El formato de fecha debe ser yyyy-MM-dd'T'HH:mm:ss.SSSZ."
    },
    {
        code: 2001,
        description: 'Ya se posteó el mismo request en el último minuto.'
    },
    {
        code: 2004,
        description: 'Falló el POST a Gateway Transactions API.'
    },
    {
        code: 2002,
        description: 'Cliente no encontrado.'
    },
    {
        code: 2006,
        description: 'Card Token no encontrado.'
    },
    {
        code: 2007,
        description: 'Falló la conexión a Card Token API.'
    },
    {
        code: 2060,
        description: 'El cliente no puede ser igual al vendedor.'
    },
    {
        code: 3000,
        description: 'Debes proveer el parámetro cardholder_name en card data.'
    },
    {
        code: 3001,
        description: 'Debes proveer el parámetro cardholder_name en card data.'
    },
    {
        code: 3003,
        description: 'Número de tarjeta (card_token_id) inválido.'
    },
    {
        code: 3004,
        description: 'parameter site_id inválido.'
    },
    {
        code: 3005,
        description: 'Acción inválida, el recurso esta en un estado que no permite esta operación. Para más información consulta el estado del recurso.'
    },
    {
        code: 3006,
        description: 'Número de tarjeta (card_token_id) inválido.'
    },
    {
        code: 3007,
        description: 'El parámetro client_id no puede ser nulo ni vacío.'
    },
    { "code": 3008, "description": "Cardtoken no encontrado." }, { "code": 3009, "description": "client_id no autorizado." }, { "code": 3010, "description": "La tarjeta no se encuentra en la lista blanca." }, { "code": 3011, "description": "payment_method no encontrado." }, { "code": 3012, "description": "security_code_length inválido." }, { "code": 3013, "description": "El parámetro security_code es requerido y no puede ser nulo ni vacío." }, { "code": 3014, "description": "payment_method inválido." }, { "code": 3015, "description": "card_number_length inválido." }, { "code": 3016, "description": "card_number inválido." }, { "code": 3017, "description": "El parámetro card_number_id no puede ser nulo ni vacío." }, { "code": 3018, "description": "El parámetro expiration_month no puede ser nulo ni vacío." }, { "code": 3019, "description": "El parámetro expiration_year no puede ser nulo ni vacío." }, { "code": 3020, "description": "El parámetro cardholder.name no puede ser nulo ni vacío." }, { "code": 3021, "description": "El parámetro cardholder.document.number no puede ser nulo ni vacío." }, { "code": 3022, "description": "El parámetro cardholder.document.type no puede ser nulo ni vacío." }, { "code": 3023, "description": "El parámetro cardholder.document.subtype no puede ser nulo ni vacío." }, { "code": 3024, "description": "Acción inválida, reembolsos parciales no soportados para esta transacción." }, { "code": 3025, "description": "Código de autorización inválido." }, { "code": 3026, "description": "card_id inválido para este payment_method_id." }, { "code": 3027, "description": "payment_type_id inválido." }, { "code": 3028, "description": "payment_method_id inválido." }, { "code": 3029, "description": "Mes de expiración de tarjeta inválido." }, { "code": 3030, "description": "Año de expiración de tarjeta inválido." }, { "code": 4000, "description": "El parámetro card no puede ser nulo." }, { "code": 4001, "description": "payment_method_id no puede ser nulo." }, { "code": 4002, "description": "transaction_amount no puede ser nulo." }, { "code": 4003, "description": "transaction_amount debe ser numérico" }, { "code": 4004, "description": "installments no puede ser nulo." }, { "code": 4005, "description": "installments debe ser numérico." }, { "code": 4006, "description": "payer está mal formado." }, { "code": 4007, "description": "site_id no puede ser nulo." }, { "code": 4012, "description": "payer.id no puede ser nulo." }, { "code": 4013, "description": "payer.type no puede ser nulo." }, { "code": 4015, "description": "payment_method_reference_id no puede ser nulo." }, { "code": 4016, "description": "payment_method_reference_id debe ser numérico." }, { "code": 4017, "description": "status no puede ser nulo." }, { "code": 4018, "description": "payment_id no puede ser nulo." }, { "code": 4019, "description": "payment_id debe ser numérico." }, { "code": 4020, "description": "notificaction_url debe ser una url válida." }, { "code": 4021, "description": "notificaction_url debe tener una longitud menor a 500 caracteres." }, { "code": 4022, "description": "metadata debe ser un JSON válido." }, { "code": 4023, "description": "transaction_amount no puede ser nulo." }, { "code": 4024, "description": "transaction_amount debe ser numérico." }, { "code": 4025, "description": "refund_id no puede ser nulo." }, { "code": 4026, "description": "coupon_amount inválido." }, { "code": 4027, "description": "campaign_id debe ser numérico." }, { "code": 4028, "description": "coupon_amount atributte debe ser numérico." }, { "code": 4029, "description": "Tipo de payer inválido." }, { "code": 4037, "description": "transaction_amount inválido." }, { "code": 4038, "description": "application_fee no puede ser mayor que transaction_amount." }, { "code": 4039, "description": "application_fee no puede ser un valor negativo." }, { "code": 4050, "description": "payer.email debe ser un email válido." }, { "code": 4051, "description": "La longitud de payer.email debe ser menor que 254 caracteres." }, { "code": 7523, "description": "Fecha de expiración inválida." }
]

const getDescriptionByCode = (code, description) => {
    const value = _mercadoPagoAPIErrors.find(error => error.code === code);
    if(value)
        return value.description;
    return description;
}
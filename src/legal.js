// Datos identificativos del titular — se usan en Aviso legal, Privacidad y Cookies.
// Si cambia la dirección o el DNI, se actualiza aquí y en todas las páginas a la vez.

export const COMPANY = {
  brand: 'GripCap',
  holder: 'Rafael Plata Castilla',
  dni: '30802720Q',
  addressLine: 'Polígono Industrial Las Quemadas, Calle Polonia, Nave 1',
  postalCode: '14014',
  city: 'Córdoba',
  country: 'España',
  email: 'multiverso@outlook.com',
  phone: '+34 658 28 82 33',
  domain: 'www.gripcap.es',
  // Perfiles sociales: rellenar con las URLs reales para que aparezcan los
  // iconos en el footer. Si se dejan vacíos, la fila de iconos no se muestra.
  social: {
    instagram: '',
    youtube: '',
    facebook: '',
  },
}

export const ADDRESS_FULL = `${COMPANY.addressLine}, ${COMPANY.postalCode} ${COMPANY.city} (${COMPANY.country})`

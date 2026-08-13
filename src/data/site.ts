export const SITE = {
  name: 'Richard Agapito Custodio',
  shortName: 'Richard Agapito',
  role: 'Asesor y consultor tributario',
  phoneDisplay: '+51 941 877 258',
  phone: '51941877258',
  email: 'asesortributario264@gmail.com',
  location: 'Lima, Perú',
  facebook: 'https://www.facebook.com/TributarioRA',
  linkedin: 'https://www.linkedin.com/in/richardagapitotributarista/',
  whatsapp(message = 'Hola Richard, quisiera conversar sobre una asesoría tributaria.') {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  },
} as const;

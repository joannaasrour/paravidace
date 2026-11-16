// ---------- EDIT YOUR CONTENT HERE ----------
// Photos go in the public/img folder. Refer to them as "/img/file-name.jpg".

// Big slideshow at the top. pos = which part of the photo stays visible ("50% 50%" = centre).
export const HERO_PHOTOS = [
  { src: '/img/pull-and-bear.jpg', pos: '50% 55%' },
  { src: '/img/salsa-jeans.jpg', pos: '50% 55%' },
  { src: '/img/bershka.jpg', pos: '50% 40%' },
];

// Photo in the About section.
export const ABOUT_PHOTO = '/img/store-round-window.jpg';

// Projects. sector: Retail, Restaurants, Supermarkets, Commercial or Residential.
// status: "Completed" or "Upcoming". services: any of Architecture, Engineering, Contracting, Consultation.
// img: "" shows a placeholder. logo: brand logo shown when there is no photo yet (logoBg: tile colour, optional).
// A brand with several branches gets a "locations" list instead of one location:
// each branch is { name: 'Branch name', img: '/img/photo.jpg', map: 'Google Maps link (optional)' }.
export const PROJECTS = [
  { name: 'Pull&Bear', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/pull-and-bear.jpg' },
  { name: 'Bershka', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/bershka.jpg' },
  { name: 'Salsa Jeans', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/salsa-jeans.jpg' },
  {
    name: "Malik's", country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '',
    locations: [
      { name: 'Mansourieh', img: '/img/maliks-mansourieh.jpg' },
      { name: 'Naameh', img: '', map: 'https://maps.app.goo.gl/rfckfH9QEbBAp8Yo8' },
      { name: 'Saida', img: '' },
      { name: 'Jbeil', img: '' },
      { name: 'Zouk', img: '' },
      { name: 'Spinneys Antelias', img: '' },
      { name: 'Spinneys Koura', img: '' },
      { name: 'Jdeideh', img: '' },
    ],
  },
  {
    name: 'LC Waikiki', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '',
    locations: [
      { name: 'City Centre Beirut', img: '' },
      { name: 'Hamra', img: '' },
      { name: 'City Mall', img: '' },
      { name: 'Zahle', img: '' },
      { name: 'Tripoli', img: '' },
      { name: 'Tyre (Sour)', img: '' },
      { name: 'Le Mall', img: '' },
    ],
  },
  { name: 'Miniso', location: 'ABC Verdun', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/miniso.jpg' },
  { name: 'Starbucks', location: 'Zalka', country: 'Lebanon', sector: 'Restaurants', status: 'Upcoming', services: [], img: '', logo: '/img/logo-starbucks.png' },
  { name: 'Luisa Spagnoli', location: 'Cyprus', country: '', sector: 'Retail', status: 'Upcoming', services: [], img: '', logo: '/img/logo-luisa-spagnoli.png' },
  { name: 'APM Monaco', location: 'Romania', country: '', sector: 'Retail', status: 'Upcoming', services: [], img: '', logo: '/img/logo-apm-monaco.png', logoBg: '#081631' },
];

// Contact details (an empty value shows a grey placeholder).
export const CONTACT = {
  instagram: '@paravidace',
  phone: '+961 76 723 444',
  whatsapp: 'https://wa.me/96176723444',
  email: 'daniel.srour@paravidagroup.com',
  office: 'Bsalim, Mount Lebanon',
};

// ---------- helpers (no need to edit) ----------
export const slugOf = (p) => p.name.toLowerCase().replace(/&/g, ' and ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const isMulti = (p) => Array.isArray(p.locations) && p.locations.length > 1;
export const coverOf = (p) => p.img || (isMulti(p) && (p.locations.find((l) => l.img) || {}).img) || '';
export const placeOf = (p) => (isMulti(p) ? `${p.locations.length} locations` : p.location);
export const countryOf = (p) => p.country || (p.location === 'Cyprus' || p.location === 'Romania' ? p.location : '');
export const SECTOR_ORDER = ['Retail', 'Restaurants', 'Supermarkets', 'Commercial', 'Residential'];
export const whereOf = (p) => {
  const c = countryOf(p);
  if (isMulti(p)) return `${p.locations.length} locations${c ? ' · ' + c : ''}`;
  return [p.location, p.country].filter(Boolean).join(', ');
};

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
// img: "" shows a placeholder.
export const PROJECTS = [
  { name: 'Pull&Bear', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/pull-and-bear.jpg' },
  { name: 'Bershka', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/bershka.jpg' },
  { name: 'Salsa Jeans', location: 'Le Mall Dbayeh', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '/img/salsa-jeans.jpg' },
  { name: "Malik's", location: 'Damour', country: 'Lebanon', sector: 'Retail', status: 'Completed', services: [], img: '' },
  { name: 'Starbucks', location: 'Zalka', country: 'Lebanon', sector: 'Restaurants', status: 'Upcoming', services: [], img: '' },
  { name: 'Luisa Spagnoli', location: 'Cyprus', country: '', sector: 'Retail', status: 'Upcoming', services: [], img: '' },
  { name: 'APM Monaco', location: 'Romania', country: '', sector: 'Retail', status: 'Upcoming', services: [], img: '' },
];

// Contact details (an empty value shows a grey placeholder).
export const CONTACT = {
  instagram: '@paravidace',
  phone: '',
  email: '',
  office: '',
};

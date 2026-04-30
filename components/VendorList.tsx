import VendorCard, { Vendor } from './VendorCard';

const VENDORS_DATA: Vendor[] = [
  {
    id: '1',
    name: 'Adeyemi Gas Hub',
    distance: '0.8km',
    orders: '1,428',
    rating: 96,
    prices: {
      '3KG': 4500,
      '5KG': 7200,
      '12.5KG': 17500,
    },
  },
  {
    id: '2',
    name: 'Chinyere Cylinders',
    distance: '1.2km',
    orders: '842',
    rating: 92,
    prices: {
      '3KG': 4400,
      '5KG': 7100,
      '12.5KG': 17200,
    },
  },
  {
    id: '3',
    name: 'Ikeja Flame Depot',
    distance: '1.6km',
    orders: '612',
    rating: 88,
    prices: {
      '3KG': 4600,
      '5KG': 7300,
      '12.5KG': 17800,
    },
  },
  {
    id: '4',
    name: 'Mama Tunde Refills',
    distance: '2.1km',
    orders: '309',
    rating: 81,
    prices: {
      '3KG': 4350,
      '5KG': 7000,
      '12.5KG': 17000,
    },
  },
  {
    id: '5',
    name: 'Yaba Quick Gas',
    distance: '2.4km',
    orders: '142',
    rating: 74,
    prices: {
      '3KG': 4500,
      '5KG': 7250,
      '12.5KG': 17600,
    },
  },
  {
    id: '6',
    name: 'Surulere Cooking ...',
    distance: '3km',
    orders: '78',
    rating: 54,
    isFlagged: true,
    prices: {
      '3KG': 4250,
      '5KG': 6900,
      '12.5KG': 16800,
    },
  },
  {
    id: '7',
    name: 'FreshFire Vendors',
    distance: '3.4km',
    orders: 'New',
    rating: 'New',
    prices: {
      '3KG': 4600,
      '5KG': 7400,
      '12.5KG': 17900,
    },
  },
];

export default function VendorList() {
  return (
    <div className="flex flex-col pb-24">
      {VENDORS_DATA.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}

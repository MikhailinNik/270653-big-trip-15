const destinations = [
  {
    description: 'Moscow is the capital of Russian Federation',
    name: 'Moscow',
    pictures: [
      {
        src: './img/photos/1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        src: './img/photos/2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        src: './img/photos/3.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    description: 'Saint-Petersburg is the capital of model buisiness',
    name: 'Saint-Petersburg',
    pictures: [
      {
        src: './img/photos/2.jpg',
        description: 'Cras aliquet varius magna.',
      },
    ],
  },
];

const offers = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 100,
      },
    ],
  },

  {
    type: 'taxi',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 50,
      },
    ],
  },
];

const points = [
  {
    basePrice: 1100,
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T04:55:56.845Z'),
    destination: destinations[0],
    id: '0',
    isFavourite: true,
    offers: [
      {
        title: 'Choose meal',
        price: 180,
      },
      {
        title: 'Upgarade to comfort class',
        price: 50,
      },
    ],

    type: 'taxi',
  },
  {
    basePrice: 900,
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T04:55:56.845Z'),
    destination: destinations[1],
    id: '1',
    isFavourite: false,
    offers: [
      {
        title: 'Order Uber',
        price: 30,
      },
      {
        title: 'Add meal',
        price: 50,
      },
    ],

    type: 'taxi',
  },
];


export {
  destinations,
  offers,
  points
};

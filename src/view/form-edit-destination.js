const createDestinationPhoto = ({ src, description }) => (
  `<img class="event__photo" src="${src}" alt="${description}">`
);

export const createDestinationTemplate = ({ description, pictures }) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
      ${description}
    </p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(createDestinationPhoto).join('')}
      </div>
    </div>
  </section>`
);

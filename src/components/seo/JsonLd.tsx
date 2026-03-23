export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'HOT22 — Автоклиматици Варна',
    telephone: '+359893383443',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'бул. Владислав Варненчик',
      addressLocality: 'Варна',
      postalCode: '9000',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.2141,
      longitude: 27.9147,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

describe('Vue Form Generator', () => {
  beforeEach(() => {
    // Set proper thresholds for the audit categories
    const thresholds = {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
      pwa: 10, // PWA score can be very low, so set a lower threshold if needed
    };

    const lighthouseConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true }, // Disable screen emulation for desktop testing
    };

    cy.visit('http://localhost:8080'); // Use the correct base URL

    // Running lighthouse within `beforeEach` hook
    cy.lighthouse(thresholds, lighthouseConfig).then((report) => {
      cy.log('Lighthouse Report', JSON.stringify(report)); // Log the report to verify
    });
  });


  it('submits the form and runs Lighthouse audit', () => {
    // Fill the form fields
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#username').type('johndoe');
    cy.get('#password').type('password123');
    cy.get('#favoriteLanguage').select('Java');
    cy.get('#acceptTerms').check();

    // Submit the form
    cy.get('form#myform').submit();

    // Perform a Lighthouse audit after the form submission
    cy.task('lighthouse', {
      url: 'http://localhost:8080',
      performance: true,
      accessibility: true,
      'best-practices': true,
      seo: true,
    }).then((report) => {
      // Output Lighthouse report results
      cy.log('Lighthouse Report', report);
    });
  });

  it('displays only the relevant error message for invalid submission', () => {
    // Submit the form without filling any fields
    cy.get('form#myform').submit();

    // Check for the specific error message
    cy.get('.error').should('be.visible').and('contain', 'Name is required.');

    // Optionally check that other errors are not displayed
    cy.get('.error').should('not.contain', 'Email is required.');
    cy.get('.error').should('not.contain', 'Username is required.');
    cy.get('.error').should('not.contain', 'Password is required.');
    cy.get('.error').should('not.contain', 'Favorite language is required.');
    cy.get('.error').should('not.contain', 'You must accept the terms.');
  });
});

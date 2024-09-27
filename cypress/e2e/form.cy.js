describe('Vue Form Generator', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080'); // Adjust to your local server URL
    });
    
    it('submit the form without sending data to the backend', () => {
      //intercept the POST request]\
      cy.intercept('POST', 'http://localhost:3000/users', {
        statusCode: 200,
        body: { message: 'Form Submitted Successfully!'},
      }).as('formSubmit')
    })


    it('submits the form successfully', () => {
      // Fill the form fields
      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('#username').type('johndoe');
      cy.get('#password').type('password123');
      cy.get('#favoriteLanguage').select('Java');
      cy.get('#acceptTerms').check();
  
      // Submit the form
      cy.get('form#myform').submit();
  
      // Check for success message
      // cy.get('.success').should('contain', 'Form submitted successfully!');
  
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
  
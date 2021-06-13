describe('Base nav tests', () => {
    it('Visits the app root url', () => {
      cy.visit('http://localhost:8080/')
      cy.contains('h4', 'Welcome to URL shortener')
      cy.contains('h5', 'To access')
    })
    it('Click all navs', () => {
      cy.visit('http://localhost:8080/')
      cy.get(".navbar-brand").click()
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/')
      })
      
      cy.get(".navbar-nav").children().first().should('contain', 'About').click()
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/about')
      })
      cy.go('back')

      cy.get(".navbar-nav").children().first().next().should('contain', 'Login').click()
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login')
      })
      cy.go('back')

      cy.get(".navbar-nav").children().last().should('contain', 'Register').click()
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/register')
      })
      cy.go('back')

    })
  })
  
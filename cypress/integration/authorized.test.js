function fill(val){
    cy.get('form').children().eq(0).last().type(val + '_first')
    cy.get('form').children().eq(1).last().type(val + '_last')
    cy.get('form').children().eq(2).last().type(val + '@mail.com')
    cy.get('form').children().eq(3).find('select').select('Male')
    cy.get('form').children().eq(4).last().click().find(".vdp-datepicker").find(".vdp-datepicker__calendar").find('div').children().contains('span', '5').click()
    cy.get('form').children().eq(5).last().type(val)
    cy.get('form').children().eq(6).last().type('123456')
    cy.get('button.btn-primary').contains('Register').click()
}

function add_shortcut(link)
{
    cy.visit('http://localhost:8080/add')
        
    cy.get('input').should('have.attr','name','link').type(link)
    cy.get('button.btn-primary').contains('Add').click()
    cy.location().should((location) => {
        expect(location.pathname).to.eq('/')
    })
    cy.get(".alert-success").contains('Successfully added shortcut')
}

describe('Try to register', () => {
    it('Correct data in register page, 2 users', () => {
      cy.visit('http://localhost:8080/register')
      cy.contains('h2', 'Register')
      fill('test')
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login')
      })
      cy.get(".alert-success").contains("Registration successful")

      cy.visit('http://localhost:8080/register')    //second one 
      fill('second')
      cy.get(".alert-success").contains("Registration successful")
      cy.wait(500)

      cy.saveLocalStorage()
    })
    it('Another try, same data', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/register')
        fill('test')
        cy.location().should((location) => {
          expect(location.pathname).to.eq('/register')
        })
        cy.get(".alert-danger").contains(" is already taken")
    })
    it('Empty fields get invalid feedback', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/register')

        cy.get('button.btn-primary').contains('Register').click()
        cy.get('form').children().last().siblings().each(($el ) => {
            cy.wrap($el).find(".invalid-feedback")
          })
    })
})

describe('Try to login', () => {
    it('Empty fields get invalid feedback', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/login')
        cy.get('button.btn-primary').contains('Login').click()
        cy.get('form').children().last().siblings().each(($el ) => {
            cy.wrap($el).find(".invalid-feedback")
          })
    })
    it('Invalid data', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/login')

        cy.get('form').children().eq(0).last().type('owo')
        cy.get('form').children().eq(1).last().type('654321')
        cy.get('button.btn-primary').contains('Login').click()
        cy.get(".alert-danger").contains(" is incorrect")
    })
    it('Correct data', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/login')
        cy.contains('h2', 'Login')

        cy.get('form').children().eq(0).last().type('test')
        cy.get('form').children().eq(1).last().type('123456')
        cy.get('button.btn-primary').contains('Login').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/')
        })
        cy.saveLocalStorage()
    })
    it('Check profile data', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/profile')

        cy.get('table').children().eq(0).children().last().should('have.text', 'test')
        cy.get('table').children().eq(1).children().last().should('have.text', 'test@mail.com')
        cy.get('table').children().eq(2).children().last().should('have.text', 'test_first')
        cy.get('table').children().eq(3).children().last().should('have.text', 'test_last')
        cy.get('table').children().eq(4).children().last().should('have.text', 'Male')
        cy.get('table').children().eq(5).children().last().contains('2021-05-04')

        cy.saveLocalStorage()
    })
})

describe('Managing shortcuts', () => {
    it('Click button', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080')
        cy.get('a.btn-success').contains('Create').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/add')
        })
    })
    it('Add 2 shortcuts', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/add')
        
        add_shortcut('https://www.google.com/')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/')
        })
        cy.get("div#shortcut-list").children().should('have.length', 1).first().should('have.class', 'media')
        add_shortcut('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        cy.get("div#shortcut-list").children().should('have.length', 2).last().should('have.class', 'media').first().first().contains('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        cy.saveLocalStorage()
    })
    it('Try to add invalid shortcut', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/add')
        
        cy.get('input').should('have.attr','name','link').type('ab123123')
        cy.get('button.btn-primary').contains('Add').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/add')
        })
        cy.get(".alert-danger").contains('Bad url')
        cy.saveLocalStorage()
    })
    it('Delete shortcut', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/')
        cy.get("div#shortcut-list").children().first().find('span').click()
        cy.get("div#shortcut-list").children().should('have.length', 1).first().first().last().contains('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        cy.saveLocalStorage()
    })
})
  
describe('Other pages', () => {
    it('About (logged in)', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/about')

        cy.get('p').first().find('a').contains('Debug').should('have.attr', 'href', '/users').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/users')
        })
    })
    it('Debug page content', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/users')

        cy.get('#users-list').children().should('have.length', 2)
        cy.get('#shortcut-list').children().should('have.length.at.least', 1).first().find('small').contains('usr:')
        cy.get('#users-list').children().last().find('.text-danger').contains("Delete").click()
        cy.get('#users-list').children().should('have.length', 1)
    })
    it('Logout, unable to access restricted pages', () => {
        cy.restoreLocalStorage()
        cy.visit('http://localhost:8080/profile')

        cy.get('a.btn-info').contains('Logout').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/login')
        })
        cy.visit('http://localhost:8080/add')
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/login')
        })
    })
    
})
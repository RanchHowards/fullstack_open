describe('E2E testing Blog App', function () {
    beforeEach('clear out the Test DB', function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const newUser = {
            name: "bill",
            username: "StillBill",
            password: "password1"
        }
        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.wait(1000)
        cy.visit('http://localhost:3000')
    })
    it('displays login form by default', function () {
        cy.get('#loginForm')
    })
    describe('Login', function () {
        it('login succeeds', function () {
            cy.get('#username').type('StillBill')
            cy.get('#password').type('password1')
            cy.get('#submitButton').click()
            cy.contains('add Blog')

        })

        it('login fails', function () {
            cy.get('#username').type('NotBill')
            cy.get('#password').type('password1')
            cy.get('#submitButton').click()
            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'StillBill', password: 'password1' })
        })

        it('can create a blog', function () {
            cy.contains('add Blog').click()
            cy.get('#author').type("Jackob Realator")
            cy.get('#title').type("The BloggsterRamaDama")
            cy.get('#url').type("http://www.weeweetown.com")
            cy.get('#submitBlog').click()
            cy.contains("The BloggsterRamaDama")
        })
        it('can like a blog', function () {
            cy.createBlog({ author: "Apple Face", title: "Truck Driving Fucks", url: "http://www.trucks.com" })
            cy.contains('show').click()
            cy.contains('like').click()
        })
        it('can delete a blog they own', function () {
            cy.createBlog({ author: "Apple Face", title: "Truck Driving Fucks", url: "http://www.trucks.com" })
            cy.contains('show').click()
            cy.contains('remove').click()
            cy.should('not.contain', "Truck Driving Fucks")
        })
        it('blogs are ordered by Likes', function () {
            cy.createBlog({ author: "Apple Face", title: "Truck Driving Fucks", url: "http://www.trucks.com" })
            cy.createBlog({ author: "Face plamP", title: "White Santa", url: "http://www.alienzero.com" })
            cy.contains('show').click()
            cy.contains('like').click().click().click()
            cy.contains('show').click()
            cy.contains('like').click().click().click()


        })
    })
    // describe('block two', function () {
    //     it('cannot delete a blog they do not own', function () {
    //         const newUser2 = {
    //             name: "brad",
    //             username: "StillBrad",
    //             password: "password1"
    //         }
    //         cy.request('POST', 'http://localhost:3003/api/users', newUser2)
    //         cy.visit('http://localhost:3000')
    //         cy.login({ username: "StillBrad", password: "password1" })
    //         cy.createBlog({ author: "Apple Face", title: "Truck Driving Fucks", url: "http://www.trucks.com" })
    //         cy.contains('log out').click()
    //         cy.login({ username: 'StillBill', password: 'password1' })
    //         cy.contains('show').click()
    //         cy.should('not.contain', 'remove')

    //     })
    // })
})




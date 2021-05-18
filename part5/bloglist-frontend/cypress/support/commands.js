
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then((res) => {
            window.localStorage.setItem('loggedUser', JSON.stringify(res.body))
        }
        )
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({ title, url, author }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: { title, url, author },
        headers: {
            'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})
/* eslint-disable functional/no-loop-statement */
/// <reference types="cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('/')
    const current = new Date(2020, 9, 30).getTime()
    cy.clock(current)
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('header', () => {
    cy.clearLocalStorageCache()
    cy.get('header div h2').should('have.text', 'HN Feed')
    cy.get('header div p').should('have.text', 'We <3 hacker news!')
  })

  it('header css', () => {
    cy.get('header').should('have.css', 'background-color', 'rgb(51, 51, 51)')
    cy.get('header div h2').should('have.css', 'color', 'rgb(255, 255, 255)')
    cy.get('header div p').should('have.css', 'color', 'rgb(255, 255, 255)')
  })

  it('on hover background color', () => {
    for (let i = 1; i <= 20; i++) {
      cy.get(`li:nth-child(${i})`).trigger('mouseover')
      cy.get(`li:nth-child(${i}) > a:nth-child(1)`).should('have.css', 'background-color', 'rgb(250, 250, 250)')
      cy.get('li div button').should('exist')
    }
  })

  it('check content', () => {
    cy.fixture('users').then((users) => {
      for (let i = 1; i <= 20; i++) {
        const user = users[i - 1]
        const title = `${user.storyTitle || user.title} `
        const author = `- ${user.author} -`
        cy.get(`li:nth-child(${i}) > a:nth-child(1) div span`).should('have.text', title)
        cy.get(`li:nth-child(${i}) > a:nth-child(1) div p`).should('have.text', author)
      }
    })
  })

  it('check content and date css', () => {
    for (let i = 1; i <= 20; i++) {
      cy.get(`li:nth-child(${i}) > a:nth-child(1) div span`).should('have.css', 'color', 'rgb(51, 51, 51)')
      cy.get(`li:nth-child(${i}) > a:nth-child(1) div p`).should('have.css', 'color', 'rgb(153, 153, 153)')
      cy.get(`li:nth-child(${i}) > div > span`).should('have.css', 'color', 'rgb(51, 51, 51)')
    }
  })

  it('check urls', () => {
    cy.fixture('users').then((users) => {
      for (let i = 1; i <= 20; i++) {
        const user = users[i - 1]
        const url = user.storyUrl || user.url
        if (url) cy.get(`li:nth-child(${i}) a`).should('have.attr', 'href', url)
        else cy.get(`li:nth-child(${i}) a`).should('not.have.attr', 'href')
      }
    })
  })

  it('check date', () => {
    cy.fixture('users').then((users) => {
      for (let i = 1; i <= 20; i++) {
        const user = users[i - 1]
        const current = new Date(2020, 9, 30).getTime()
        const d = new Date(user.createdAt)
        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        const currentDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(current)

        // current day, show hour
        if (currentDay === day) {
          const hourFormat = new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(d)
          const minute = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d)
          const hour = hourFormat.replace(/^(\d+) (AM|PM)/, '$1')
          const letters = hourFormat.replace(/^(\d+) (AM|PM)/, '$2')

          cy.get(`li:nth-child(${i}) > div > span`)
            .should('have.text', `${hour}:${minute} ${letters.toLowerCase()}`)
        }

        // yesterday
        else if (Number(currentDay) === Number(day) + 1) {
          cy.get(`li:nth-child(${i}) > div > span`).should('have.text', 'Yesterday')
        }

        // show day
        else {
          cy.get(`li:nth-child(${i}) > div > span`).should('have.text', `${month} ${day}`)
        }
      }
    })
  })

  it('on remove post', () => {
    for (let i = 1; i <= 20; i++) {
      cy.get('li:nth-child(1)').trigger('mouseover')
      cy.wait(1000)
      cy.get('li div button').click()
      cy.get('li').should('have.length', 20 - i)
    }
  })

  it('reload without posts', () => {
    cy.get('li').should('have.length', 0)
  })
})

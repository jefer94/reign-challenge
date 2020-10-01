/* eslint-disable functional/no-loop-statement */
/// <reference types="cypress" />

function diffOfDays(date) {
  const todayDate = new Date()
  const currentDate = new Date(date)
  const currentDay = currentDate.getDay()
  const todayDay = todayDate.getDay()

  if (currentDay === todayDay) return 0
  if (todayDay > 1 && todayDay - currentDay === 1) return 1
  if (todayDay === 1) {
    const currentMonth = currentDate.getMonth()
    const todayMonth = todayDate.getMonth()
    if (todayMonth - currentMonth > 2) return 2

    const currentYear = currentDate.getFullYear()

    const howManyDaysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
    if (howManyDaysInCurrentMonth === currentDay) return 1
    return 2
  }
  return 2
}

context('Home', () => {
  beforeEach(() => {
    // const current = new Date(2020, 9, 30).getTime()
    // cy.clock(current)
    cy.visit('/')
    // cy.tick(1000)

    // setInterval(() => cy.tick(1), 1)
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
        const d = new Date(user.createdAt)

        // current day, show hour
        if (diffOfDays(user.createdAt) === 0) {
          const time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' })
            .format(d)
            .toLowerCase()

          cy.get(`li:nth-child(${i}) > div > span`)
            .should('have.text', time)
        }

        // yesterday
        else if (diffOfDays(user.createdAt) === 1) {
          cy.get(`li:nth-child(${i}) > div > span`).should('have.text', 'Yesterday')
        }

        // show day
        else {
          cy.get(`li:nth-child(${i}) > div > span`).should('have.text',
            new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(d))
        }
      }
    })
  })

  it('on remove post', () => {
    for (let i = 1; i <= 20; i++) {
      cy.get('li:nth-child(1)').trigger('mouseover')
      // cy.wait(1000)
      cy.get('li div button', { force: true }).click()
      cy.get('li').should('have.length', 20 - i)
    }
  })

  it('reload without posts', () => {
    cy.get('li').should('have.length', 0)
  })
})

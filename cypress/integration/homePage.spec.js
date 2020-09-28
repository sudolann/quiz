import GamePage from './GamePage';
context('Trivia Game', () => {
    const game = new GamePage();
    beforeEach(() => {
        game.visit()
    })
    describe('main page', () => {
        it('displays disabled button by default', () => {
            cy.get('button').should('be.disabled')
        });

        it('displays title', () => {
            game.containText('.container h1', 'Welcome to the Trivia Challenge!')
        });
    })

    describe('question cards page', () => {
        it('renders question cards after filled form and clicking button', () => {
            game.beginGame('easy', 3)

            game.isVisible('.question');
            game.isVisible('.question__header');
            game.isVisible('.question__card');
            game.isVisible('.question__card__buttons');

            cy.get('.question__card__buttons').find('button').eq(0).find('span').should('have.text', 'true');
            cy.get('.question__card__buttons').find('button').eq(1).find('span').should('have.text', 'false');
            game.checkFooterText('1 of 3')
        });

        it('updates footer text when clicking on of the button', () => {
            game.beginGame('easy', 2);
            game.checkFooterText('1 of 2')

            game.clickAnswer();
            game.checkFooterText('2 of 2')
        });
    })

    describe('results page', () => {
        beforeEach(() => game.goToResultsPage('easy', 2))
        it('renders result page properly', () => {
            cy.get('.results .results__title').should('be.visible');
            cy.get('.results').find('.results__title h1').contains('You scored');
            cy.get('.results').find('.results__question__item').should(($p) => {
                expect($p).to.have.length(2)
            });
            game.isVisible('.results .results__question__item p');
            game.isVisible('.results .results__question__item .svg');
            cy.get('.results .results__questions').find('button').find('span').should('have.text', 'play again?');
        });
        it('renders path correctly', () => {
            cy.location('href').should('include', '/results')
        })

        it('when is on result page go to home page after clicking button', () => {
            cy.get('.results .results__questions').find('button').click();
            cy.url().should('eq', 'http://localhost:3000/')
        });
    })
});
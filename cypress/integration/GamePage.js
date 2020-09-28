class GamePage {
    visit() {
        cy.visit('http://localhost:3000');
    }

    beginGame(difficulty, questionNumber) {
        cy.get('select').select(difficulty);
        cy.get('input').type(questionNumber, {
            force: true
        }).blur();
        cy.get('button').click();
    }

    clickAnswer() {
        cy.get('.question__card__buttons').find('button').eq(0).click();
    }
    checkFooterText(text) {
        cy.get('.question__footer p').should('have.text', text);
    }

    goToResultsPage(difficulty, questionNumber) {
        this.beginGame(difficulty, questionNumber);
        for (let i = 0; i <= questionNumber; i++) {
            this.clickAnswer();
            i++;
        }
    }

    containText(className, text) {
        cy.get(className).should('have.text', text);
    }
    isVisible(className) {
        cy.get(className).should('be.visible');
    }
}

export default GamePage;
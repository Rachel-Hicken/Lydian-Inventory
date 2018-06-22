describe('update an instrument', function(){
    beforeEach(function(){
        cy.visit('/#/instruments');
    })
    it('update inst', function(){
        cy.get('.checkbox').next().get('input').get('10');
        cy.contains('Update').click();
    })
})
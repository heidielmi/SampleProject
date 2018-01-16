import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('dashboard page', () => {
    let page: AppPage;

    beforeEach(() => {
        browser.get('/');
        browser.driver.sleep(1000);
    });

    it('should list of all the cats for female owners', () => {
        let firstRowText = element(by.css('sample-root table tr:nth-child(1) td')).getText();
        expect(firstRowText).toContain('Female');
    });
    it('should list of all the cats in alphabetical order under female', () => {
        element(by.css('sample-root table tr:nth-child(1) td li:nth-child(1)')).getText().then(str => {
            let firstfemaleCat = str;
            element(by.css('sample-root table tr:nth-child(1) td li:nth-child(2)')).getText().then(str2 => {
                let secondfemaleCat = str2;
                expect(firstfemaleCat.charCodeAt(0)).toBeLessThanOrEqual(secondfemaleCat.charCodeAt(0))
            });
        });
    });

    it('should list of all the cats for male owners', () => {
        let secondtRowText = element(by.css('sample-root table tr:nth-child(2) td')).getText();
        expect(secondtRowText).toContain('Male');
    });
    it('should list of all the cats in alphabetical order under male', () => {
        element(by.css('sample-root table tr:nth-child(2) td li:nth-child(1)')).getText().then(str => {
            let firstmaleCat = str;
            element(by.css('sample-root table tr:nth-child(2) td li:nth-child(2)')).getText().then(str2 => {
                let secondmaleCat = str2;
                expect(firstmaleCat.charCodeAt(0)).toBeLessThanOrEqual(secondmaleCat.charCodeAt(0))
            });
        });
    });


});


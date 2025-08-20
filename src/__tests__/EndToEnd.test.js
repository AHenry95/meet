/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ 
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page  = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });
   
    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.details-toggler');
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.details-toggler');
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeNull();
    });
});

describe('filter events by city', () => {
    
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
        
    });

    afterAll(() => {
        browser.close();
    });

    test('when user hasn\'t searched for a city, show upcoming events from all cities', async () => {
        const eventListItems = await page.$$('#event-list li');
        expect(eventListItems.length).toBe(32);
    });

    test('user should see a list of suggestions when they search for a city', async () => {
        await page.click('.city');
        await page.type('.city', 'Berlin');

        const suggestionsList = await page.$('.suggestions');
        expect(suggestionsList).toBeDefined();

        const suggestionItems = await page.$$('.suggestions li');
        expect(suggestionItems.length).toBe(2);
    });

    test('user can select a city from the suggested list', async () => {
        await page.click('.suggestions li:first-child');
        
        const inputValue = await page.$eval('.city', input => input.value);
        expect(inputValue).toBe('Berlin, Germany');

        const eventLocations = await page.$$eval('.location', locationSpans => 
            locationSpans.map(span => span.textContent)
        );
        eventLocations.forEach(location => {
            expect(location).toBe('Berlin, Germany');
        });
    });
});
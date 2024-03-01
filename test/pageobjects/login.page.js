const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    
    get inputUsername () {
        return $('#wpName1');
    }

    get inputPassword () {
        return $('#wpPassword1');
    }

    get cookie(){
        return $("//span[@class='oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-iconElement oo-ui-labelElement oo-ui-flaggedElement-primary oo-ui-flaggedElement-progressive oo-ui-buttonWidget']");
    }

    get btnSubmit () {
        return $("//div[@class='mw-input mw-htmlform-nolabel']//button[@class='mw-htmlform-submit mw-ui-button mw-ui-primary mw-ui-progressive']");
    }

    get newBtn(){
        return $('//div[@class="btn-group"]//button[@class="mws-button-primary new-page"]')
    }

    get inputBtn(){
        return $('//div[@class="oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget oo-ui-textInputWidget oo-ui-textInputWidget-type-text mw-widget-titleWidget oo-ui-lookupElement mw-widget-titleInputWidget oojsplus-titlePicker"]//input[@class="oo-ui-inputWidget-input"]')
    }

    get DoneBtn(){
        return $('//div[@class="oo-ui-processDialog-actions-primary"]//a[@class="oo-ui-buttonElement-button"]')
    }

    get emptyPgBtn(){
        return $('//div[@class="card-body"]//a')
    }

    get para(){
        return $('//div//p[@class="ve-ce-branchNode ve-ce-contentBranchNode ve-ce-paragraphNode"]')
    }

    get closeBtn(){
        return $('(//a[@class="oo-ui-buttonElement-button"]//span[@class="oo-ui-iconElement-icon oo-ui-icon-close"])[2]');
    }

    async login (username, password) {
        await browser.maximizeWindow();
        await this.cookie.click();
        await this.inputUsername.click();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(1000);
        // await this.newBtn.click();
        // await browser.pause(2000);
        // await this.inputBtn.setValue("ContentDroplets Decision36128");
        // await browser.pause(2000);
        // await browser.keys(['Escape']);
        // await browser.pause(2000);
        // await this.DoneBtn.click();
        // await browser.pause(2000);
        // await this.emptyPgBtn.click();
        // await browser.pause(2000);
        // await this.closeBtn.click();
        // await browser.pause(2000);
        // await this.para.click();
        // await browser.pause(4000);
        // await this.para.setValue(`==== Decision ==== 
        // {{Decision|decision=First decision}}
        
        // ==== Decision overview ====
        // <decisionoverview namespaces="">
        // </decisionoverview>`);
        await browser.pause(3000);
        await browser.url("http://localhost/blues/mediawiki/index.php/ContentDroplets_Decision36128");
        await browser.pause(3000);

        const greyBox = $('//div[@class="mw-parser-output"]//div[@class="cd-decision"]');
        const gre = greyBox.getText();
        console.log(gre,"hhjghgh");
        // const greyBox = await decisionHeading.$('.mw-parser-output .cd-decision');

        // Check if the grey box contains the text "First decision"
        expect(greyBox).toBeDisplayed();
        await expect(greyBox).toHaveText('First decision');
        await browser.pause(2000);
        // Check if the grey box contains the green check icon
        
        // Get the content and color of the pseudo-element ::before
        // console.log('greyBox',greyBox);
        const color = (await greyBox.getCSSProperty('color', '::before')).parsed.hex;

        console.log('color',color);
        
        // expect(content).toBe('"\f058 "'); // Check the content of the pseudo-element
        await expect(color).toBe('#94c11f');
        await browser.pause(2000);
        
        // const decisionOverviewHeading = $('h2=Decision overview');
        const table = $('#decisionOverview');

        // Check if the table has two columns with the specified headings
        const tableHeadings =await table.$$('th');
        await expect(tableHeadings[0]).toHaveText('Page');
        await expect(tableHeadings[1]).toHaveText('Decisions');
        console.log('tableHeadings',tableHeadings);

        // Check if the specified data exists in the table
        const tableRows = await table.$$('tr');
        console.log('tableRows',tableRows);
        const secondRowColumns = await tableRows[1].$$('td');
        await expect(secondRowColumns[0]).toHaveText('ContentDroplets Decision36128');
        await expect(secondRowColumns[1]).toHaveText('First decision');
        await browser.pause(5000);
    }
    
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
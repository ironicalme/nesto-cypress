interface DropdownOptions {
    selector: string;
    dropdown_option: string;
    typeOption?: boolean; // Optional flag to control typing
    typeDelay?: number;   // Optional delay between keystrokes
}

export function selectDropdownOption(options: DropdownOptions) {
    const { selector, dropdown_option, typeOption = false, typeDelay = 0 } = options;
    
    // Click on the dropdown to open it
    cy.get(selector).click();
    
    // Optional typing step
    if (typeOption) {
        cy.get(selector).type(dropdown_option, { delay: typeDelay });
    }
    
    // Click on the option containing the specified text
    cy.get('[id^="react-select-province-option"]').contains(dropdown_option).click({force: true});
}
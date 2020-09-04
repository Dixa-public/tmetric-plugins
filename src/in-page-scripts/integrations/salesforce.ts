﻿class Salesforce implements WebToolIntegration {

    showIssueId = false;

    observeMutations = true;

    // https://eu16.lightning.force.com/lightning/r/PAGE/IDENTIFIER/view
    matchUrl = '*://*.lightning.force.com';

    issueElementSelector = [
        '.slds-page-header' // page header
    ];

    render(issueElement: HTMLElement, linkElement: HTMLElement) {
        let host = $$('.forceActionsContainer', issueElement);
        if (host) {
            linkElement.style.marginRight = '0.5rem';
            linkElement.style.alignSelf = 'center';
            host.parentNode.insertBefore(linkElement, host);
        }
    }

    getIssue(issueElement: HTMLElement, source: Source): WebToolIssue {

        let serviceType = 'Salesforce';

        let serviceUrl = source.protocol + source.host;

        let issueName: string;
        let issueId: string;
        let issueUrl: string;

        let title = $$.visible('h1 .slds-page-header__title, h1 .uiOutputText', issueElement);
        if (!title) {
            return;
        }

        let match = /\/lightning\/r\/(\w+)\/(\w+)\/view$/.exec(source.path);
        if (match) {
            issueName = title.textContent;
            issueId = match[2];
        } else if (/\/lightning\/o\/Task\//.test(source.path)) {
            let recentTasks = $$.all('.forceListViewManagerSplitViewList .slds-split-view__list-item-action').filter(el => {
                let textEl = $$.visible('.uiOutputText', el);
                if (textEl) {
                    return textEl.textContent == title.textContent;
                }
            });
            if (recentTasks.length == 1) {
                issueName = title.textContent;
                issueId = recentTasks[0].getAttribute('data-recordid');
            }
        }

        if (!issueName) {
            return;
        }

        if (issueId) {
            issueUrl = `/lightning/r/${issueId}/view`;
        }

        return { serviceType, serviceUrl, issueName, issueId, issueUrl };
    }
}

IntegrationService.register(new Salesforce());
declare module Models {
    interface TimeZoneInfo
    {
        id: string;
        displayName: string;
    }
    
    interface UserProfile {
        userProfileId: number;
        activeAccountId: number;
        userName: string;
        dateFormat: string;

        /*
         * Time format for specific user.
         * 'H:mm' - 24h format.
         * 'h:mm a' - 12h format.
         */
        timeFormat: string;
        firstWeekDay: number;
        showBreaks: boolean;
        email: string;
        timeZoneInfo: Models.TimeZoneInfo;

        /*
         * This collection defines which service accounts the user can access.
         * Accounts where user is locked are not included in the list.
         */
        accountMembership: Models.AccountMember[];
        isRegistered: boolean;
    }

    interface Account {
        accountId: number;
        accountName: string;
        accountOwnerName: string;
    }

    interface AccountMember {
        accountId: number;
        accountMemberId: number;
        account: Models.Account;
        role: ServiceRole;
        isLocked: boolean;
        userProfile: Models.UserProfile;
    }

    interface IntegratedProjectIdentifier {
        serviceUrl: string;
        serviceType: string;
        projectName: string;
    }

    const enum ProjectRole {
        Member,
        Manager
    }

    const enum ProjectStatus {
        Open = 1,
        Closed = 2,
        Archived = 3
    }

    const enum ServiceRole {
        Member,
        ProjectCreator,
        Admin,
        Owner
    }

    interface IntegratedProjectStatus {
        integrationName: string;
        projectStatus: ProjectStatus;
        projectRole: ProjectRole;
        serviceRole: ServiceRole;
    }

    interface WorkTask {
        description: string;
        projectId: number;
        externalIssueId: string;
        integrationId: number;
        relativeIssueUrl: string;
        integrationUrl: string;

    }

    interface Timer {
        isStarted: boolean;
        workTask: WorkTask;
        startTime: string;
    }
    
    interface TimeEntry {
        workTask: WorkTask;
        startTime: string;
        endTime: string;
        projectName: string;
    }    
}
export type CS_Team = 0 | 2 | 3;
export declare const CS_TEAM_NONE: CS_Team;
export declare const CS_TEAM_T: CS_Team;
export declare const CS_TEAM_CT: CS_Team;
export declare function CS_toggleTeam(team: CS_Team): CS_Team;
export declare function CS_getTeamLabel(team: CS_Team): "ct" | "t";

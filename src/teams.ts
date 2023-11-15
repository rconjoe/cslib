/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type CS_Team = 0 | 2 | 3;
export const CS_TEAM_NONE: CS_Team = 0;
export const CS_TEAM_T: CS_Team = 2;
export const CS_TEAM_CT: CS_Team = 3;

export function CS_toggleTeam(csTeam: CS_Team): CS_Team {
    return csTeam === CS_TEAM_CT ? CS_TEAM_T : CS_TEAM_CT;
}

export function CS_getTeamLabel(csTeam: CS_Team): string {
    return csTeam === CS_TEAM_CT ? "ct" : "t";
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const CS_TEAM_NONE = 0;
export const CS_TEAM_T = 2;
export const CS_TEAM_CT = 3;
export function CS_toggleTeam(team) {
    return team === CS_TEAM_CT ? CS_TEAM_T : CS_TEAM_CT;
}
export function CS_getTeamLabel(team) {
    return team === CS_TEAM_CT ? "ct" : "t";
}

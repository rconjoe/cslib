/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
/**
 * Constant representing the "None" Counter-Strike team.
 */
export const CS_TEAM_NONE = 0;
/**
 * Constant representing the "Terrorist" Counter-Strike team.
 */
export const CS_TEAM_T = 2;
/**
 * Constant representing the "Counter-Terrorist" Counter-Strike team.
 */
export const CS_TEAM_CT = 3;
/**
 * Toggle between Counter-Terrorist (CT) and Terrorist (T) teams.
 * @param {CS_Team} team - The Counter-Strike team to toggle.
 * @returns {CS_Team} - The toggled Counter-Strike team.
 */
export function CS_toggleTeam(team) {
    return team === CS_TEAM_CT ? CS_TEAM_T : CS_TEAM_CT;
}
/**
 * Get the label for a Counter-Strike team ("ct" for CT, "t" for T).
 * @param {CS_Team} team - The Counter-Strike team.
 * @returns {string} - The team label.
 */
export function CS_getTeamLabel(team) {
    return team === CS_TEAM_CT ? "ct" : "t";
}

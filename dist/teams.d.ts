/**
 * Type representing Counter-Strike teams.
 */
export type CS_Team = 0 | 2 | 3;
/**
 * Constant representing the "None" Counter-Strike team.
 */
export declare const CS_TEAM_NONE: CS_Team;
/**
 * Constant representing the "Terrorist" Counter-Strike team.
 */
export declare const CS_TEAM_T: CS_Team;
/**
 * Constant representing the "Counter-Terrorist" Counter-Strike team.
 */
export declare const CS_TEAM_CT: CS_Team;
/**
 * Toggle between Counter-Terrorist (CT) and Terrorist (T) teams.
 * @param {CS_Team} team - The Counter-Strike team to toggle.
 * @returns {CS_Team} - The toggled Counter-Strike team.
 */
export declare function CS_toggleTeam(team: CS_Team): CS_Team;
/**
 * Get the label for a Counter-Strike team ("ct" for CT, "t" for T).
 * @param {CS_Team} team - The Counter-Strike team.
 * @returns {string} - The team label.
 */
export declare function CS_getTeamLabel(team: CS_Team): string;

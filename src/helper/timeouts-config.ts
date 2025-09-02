const MULTIPLIER = 1.5;

/**
 * Configuration for timeouts used in tests.
 */
export const timeouts = {
    smallest: 750,
    small: MULTIPLIER * 1 * 1000,
    medium: MULTIPLIER * 1.5 * 1000,
    large: MULTIPLIER * 2.5 * 1000,
    largest: MULTIPLIER * 5 * 1000,
    huge: MULTIPLIER * 10 * 1000,
};

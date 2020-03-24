import _reduce from 'lodash/reduce'

/**
 * Picking objects from the state can be tedious.
 * This helper tries to make that easier.
 *
 * @param {...keys} keys - properties to pick from state, bunched into a keys arg.
 */
export default function pickFromState(...keys) {
    return state =>
        _reduce(
            keys,
            (acc, key) => {
                const picked = state[key]
                acc.push(picked)

                return acc
            },
            [],
        )
}

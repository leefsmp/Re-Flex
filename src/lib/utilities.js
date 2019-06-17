/** Given some props, return only the props that start with "data-". */
export default function getDataProps(props) {
    return Object.keys(props).reduce((prev, key) => {
        if (key.substr(0, 5) === 'data-') {
            return {
                ...prev,
                [key]: props[key]
            };
        }
        return prev;
    }, {})
}
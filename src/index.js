const defaults = {
    props: {
        children: "children"
    }
}

export const findParent = (data, node, predicate, options = {}) => {
    let config = Object.assign({}, defaults, options);

    let parent = undefined;
    for (let i = 0; i < data.length; i++) {
        if (parent) 
            return parent;
        
        let item = data[i];

        if (item[config.props.children] && item[config.props.children].length > 0) {

            let child = item[config.props.children].filter(c => predicate(c, node));
            if (child.length > 0) {
                parent = item;
            }

            if (parent === undefined) {
                parent = findParent(item[config.props.children], node, predicate, config);
            } else {
                break;
            }
        }
    }
    return parent;
}

export const findAllParents = (data, node, predicate, options = {}) => {
    let config = Object.assign({}, defaults, options);

    let allParents = [];
    let parent = findParent(data, node, predicate, config);
    while (parent !== undefined) {
        allParents.unshift(parent);
        parent = findParent(data, parent, predicate, config);
    }
    return allParents;
}
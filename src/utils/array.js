function getClosestClass(map, value) {
    // convert map values into array
    const classList =  [...map.values()];

    return classList.reduce(function (previous, current) {
        const gap = value - current.minimumWidth,
            previousGap = value - previous.minimumWidth;

        if (gap > 0 && (previousGap < 0 || gap < previousGap)) {
            return current;
        }
        return previous;
    });
}

export {
    getClosestClass
}

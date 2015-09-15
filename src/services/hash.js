export default (str) => {
    var hash = 0, i, chr, len;
    if (!str.length) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        // Convert to 32bit integer
        hash |= 0;
    }
    return hash;
}

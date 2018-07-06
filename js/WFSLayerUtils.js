function getVectorLayerFrom(sourceUrl, style) {
    var result = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: sourceUrl
        }),
        updateWhileAnimating: false,
        updateWhileInteracting: false,
    });
    if (style) {
        result.setStyle(style)
    }
    return result;
}
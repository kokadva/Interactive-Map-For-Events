
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map',
    view: new ol.View({
        center: [4977328.98, 5123224.22],
        zoom: 18,
        minZoom: 16,
        maxZoom: 18
    })
});

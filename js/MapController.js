
// View initi
var view = new ol.View({
    center: [4977328.98, 5123224.22],
    zoom: 18,
    minZoom: 10,
    maxZoom: 18
});

// Layers init
var openairObjectsLayer = getVectorLayerFrom(baseUrl + 'result.json', objectsStyleFunc);
var defaultOSMLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

// Map init
var map = new ol.Map({
    layers: [
        defaultOSMLayer,
        openairObjectsLayer
    ],
    target: 'map',
    view: view
});




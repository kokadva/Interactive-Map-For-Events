var routeFeature = new ol.Feature();

var routinglayer = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [routeFeature]
    })
});


function getRequestUrl(coordinates) {
    var lonlat = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
    var lon = lonlat[0];
    var lat = lonlat[1];
    return 'https://router.project-osrm.org/route/v1/driving/' + lon + ',' + lat + ';44.71210696825028,41.74745381492704?overview=false&alternatives=true&steps=true&hints=;';
}

function getCoordinatesFromServer(requestUrl) {
    return decode('kws}Fm~hpGjApBp@Oj@jFmXvEy@dGad@re@rDv_AsFdW@nDsEeGg@Rs@xNd@`DaAj@uDkAZjM_FgIkAtBfA`Ta@NqAcFs@Ov@|BG|B}DdDqKf]yIjc@iCjWyGba@YjGt@vQgJ~NaO~p@', 5);
}

function formatCoordinates(coordinates) {
    var result = [];
    coordinates.forEach(function (c) {
        result.push([c[1], c[0]]);
    });
    return result;
}
function getRouteCoordinates(myLocation) {
    // var requestUrl = getRequestUrl(myLocation);
    var coordinates = getCoordinatesFromServer(null);
    return formatCoordinates(coordinates);
}

function updateRoute(routeCoordinates) {
    var trnsStr = new ol.geom.LineString(routeCoordinates);
    trnsStr.transform('EPSG:4326', 'EPSG:3857');
    routeFeature.setGeometry(routeCoordinates ?
        trnsStr : null);
}

function updateRouting(myLocation) {
    var routeCoordinates = getRouteCoordinates(myLocation);
    updateRoute(routeCoordinates);
}


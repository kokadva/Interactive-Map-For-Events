
var routeFeature = new ol.Feature();

routeFeature.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
        width: 7,
        color: [51, 136, 255, 1]
    })
}));

new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [routeFeature]
    })
});


function getRouteRequestUrlFrom(coordinates) {
    var lonlat = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
    var lon = lonlat[0];
    var lat = lonlat[1];
    var url = osrmRoutingRequestBaseUrl + '/route/v1/driving/' +
        lon + ',' + lat + ';' +
        '44.71210696825028,41.74745381492704?' +
        'overview=full' +
        '&alternatives=true' +
        '&steps=true' +
        '&hints=;';
    return url;
}

function getGeometryFromResponse(json) {
    var format = new ol.format.Polyline({
        factor: 1e5
    });
    var encoded_line = json.routes[0].geometry;
    var line = format.readGeometry(encoded_line, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
    return line;
}
function updateRouting() {
    if (myLocationCoordinates) {
        const url = getRouteRequestUrlFrom(myLocationCoordinates);
        const request = async () => {
            const response = await fetch(url);
            if (response.status !== 200)
                return;
            const json = await response.json();
            const geometry = getGeometryFromResponse(json);
            routeFeature.setGeometry(geometry ?
                geometry : null);

        };
        request();
    }
}


setInterval(updateRouting, 2000);

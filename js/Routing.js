

class Router {

    constructor(map){
        this.map = map;
        this.routeFeature = this.initRouteFeature();
        this.routeLayer = this.initRouteLayer()
    }

    initRouteFeature() {
        var routeFeature = new ol.Feature();
        routeFeature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 7,
                color: [51, 136, 255, 1]
            })
        }));
        return routeFeature;
    }

    initRouteLayer() {
        return new ol.layer.Vector({
            map: this.map,
            source: new ol.source.Vector({
                features: [this.routeFeature]
            })
        });
    }

    getGeometryFromResponse(json) {
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

    getRouteRequestUrlFrom(coordinates) {
        var lonlat = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
        var url = osrmRoutingRequestBaseUrl + '/route/v1/driving/' +
            lonlat[0] + ',' + lonlat[1] + ';' +
            '44.71210696825028,41.74745381492704?' +
            'overview=full' +
            '&alternatives=true' +
            '&steps=true' +
            '&hints=;';
        return url;
    }

    updateRoute(locationCoordinates) {
        var self = this;
        const url = this.getRouteRequestUrlFrom(locationCoordinates);
        const func = async () => {
            const response = await fetch(url);
            if (response.status !== 200)
                return;
            const json = await response.json();
            const geometry = self.getGeometryFromResponse(json);
            self.routeFeature.setGeometry(geometry ? geometry : null);

        };
        func();
    }

}

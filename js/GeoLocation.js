
class GeoLocationController {

    constructor(map) {
        this.map = map;
        this.locationCoordinates = null;

        this.locationFeature = this.initLocationFeature();
        this.accuracyFeature = this.initAccuracyFeature();

        this.locationVectorLayer = this.initLocationVectorLayer();

        this.geolocation = this.initGeoLocation();
        this.initAccuracyFeatureOnChangeListener();



    }

    initLocationFeature() {
        var locationFeature = new ol.Feature();
        locationFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));
        return locationFeature;
    }

    initAccuracyFeature() {
        return new ol.Feature();
    }

    initGeoLocation() {
        var geolocation = new ol.Geolocation({
            projection: view.getProjection()
        });
        geolocation.setTracking(true);

        var self = this;
        geolocation.on('change:position', function () {
            var coordinates = geolocation.getPosition();
            self.locationFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
            self.locationCoordinates = coordinates;
            self.locationCoordinates = coordinates;
        });

        return geolocation;
    }

    initAccuracyFeatureOnChangeListener() {
        var self = this;
        this.geolocation.on('change:accuracyGeometry', function () {
            self.accuracyFeature.setGeometry(self.geolocation.getAccuracyGeometry());
        });
    }

    initLocationVectorLayer() {
        return new ol.layer.Vector({
            map: this.map,
            source: new ol.source.Vector({
                features: [this.accuracyFeature, this.locationFeature]
            })
        });
    }

    getLocationCoordinates(){
        return this.locationCoordinates;
    }
}

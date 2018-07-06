class SearchController {


    constructor(map, layer){
        this.map = map;
        this.layer = layer;
        this.searchLayer = this.initSearchLayer();
    }

    initSearchLayer() {
        return new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: this.map,
            style: new ol.style.Style({
                image: new ol.style.Icon(({
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: baseUrl + 'pointer.png'
                })),
                zIndex: 0
            })
        });
    }

    search(searchText) {
        console.log(searchText);
        var self = this;

        this.searchLayer.getSource().clear();

        var features = this.layer.getSource().getFeatures();
        features.forEach(function (feature) {
            if ('tags' in feature.getProperties()) {
                var rawTags = feature.getProperties()['tags'];
                var tags = rawTags.split(',');
                if (tags.indexOf(searchText.toLowerCase()) >= 0) {
                    var coordinates = feature.getGeometry().getCoordinates();
                    ol.coordinate.add(coordinates, [0, 30]);
                    var pointer = new ol.Feature({
                        name: 'asd',
                        geometry: new ol.geom.Point(coordinates)
                    });
                    self.searchLayer.getSource().addFeature(pointer);
                }

            }
        });
    }

}

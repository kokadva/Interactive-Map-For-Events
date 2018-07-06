
class MapController {


    constructor(){
        this.view = this.initView();
        this.layers = this.initLayers();
        this.map = this.initMap();
        this.geolocationController = new GeoLocationController(this.map);
        this.router = new Router(this.map);
        this.popupController = new PopupController(this.map, this.layers[1]);
        this.searchController = new SearchController(this.map, this.layers[1]);
        this.routeUpdater()
    }

    initView() {
        return new ol.View({
            center: [4977328.98, 5123224.22],
            zoom: 18,
            minZoom: 10,
            maxZoom: 18
        });
    }

    initLayers() {
        var openairObjectsLayer = getVectorLayerFrom(baseUrl + 'result.json', objectsStyleFunc);
        var defaultOSMLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        return [defaultOSMLayer, openairObjectsLayer];
    }

    initMap() {
        return new ol.Map({
            layers: this.layers,
            target: 'map',
            view: this.view
        });
    }

    routeUpdater() {
        var self = this;
        setInterval(() => {
                if (self.geolocationController.getLocationCoordinates())
                    self.router.updateRoute(self.geolocationController.getLocationCoordinates())
            }, 2000
        );
    }

    search() {
        var searchText = document.getElementById('searchTextHolder').value;
        this.searchController.search(searchText);
    }
}



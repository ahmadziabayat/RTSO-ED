import { Component, OnInit, Input, Output,ElementRef, ViewChild, EventEmitter  } from '@angular/core';
import { EsriModuleProvider } from 'angular-esri-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cop',
  templateUrl: './cop.component.html',
  styleUrls: ['./cop.component.scss']
})
export class CopComponent implements OnInit {


  // Code for table
   private gridApi;
   private gridColumnApi;

   private columnDefs;
   private defaultColDef;
   private rowData: any;
   private domLayout;

   style = {
     width: '100%',
     height: '400px',
     boxSizing: 'border-box'
 };

 @ViewChild('agGrid') agGrid;


  onFirstDataRendered(params) {
   params.api.sizeColumnsToFit();
   };

  onGridReady(params) {
   this.gridApi = params.api;
   this.gridColumnApi = params.columnApi;

   this.http
     .get("assets/vehicles.json")
     .subscribe(data => {
       this.rowData = data;
       console.log('data:'+JSON.stringify(this.rowData));
     });

 }

  constructor(private moduleProvider: EsriModuleProvider, private http: HttpClient) {
    this.columnDefs = [
       {headerName: 'Make', field: 'make',checkboxSelection: true},
       {headerName: 'Model', field: 'model'},
       {headerName: 'Price', field: 'price'}
   ];
   this.defaultColDef =
   {
     resizable: true,
     enableRowGroup: true,
     enableValue: true,
     filter: true,
     sortable: true,
   };
  }

  ngOnInit() {
  }


  private _opened: boolean = false;
  private _modeNum: number = 0;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = true;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  private _MODES: Array<string> = ['slide', 'push', 'over'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  // variables and functions for property Inspector
  private _openedPropertySidebar:boolean = false;
  private _positionPropertySidebar:string = 'right';
  private _modePropertySidebar: string = 'over';
  private _closeOnClickOutsideProperty: boolean = true;
  private _animatePropertySidebar: boolean = true;
  private _trapFocusPropertySidebar: boolean = true;
  private _autoFocusPropertySidebar: boolean = true;
  private _keyClosePropertySidebar: boolean = false;
  private _autoCollapsePropertySidebarHeight: number = null;
  private _autoCollapsePropertySidebarWidth: number = null;

  private _togglePropertySidebar():void {
    this._openedPropertySidebar = !this._openedPropertySidebar;
  };

  // variables and functions for Net Plan

  private _openedNetPlanSidebar:boolean = false;
  private _positionNetPlanSidebar:string = 'bottom';
  private _modeNetPlanSidebar: string = 'over';
  private _animateNetPlanSidebar: boolean = true;
  private _closeOnClickOutsideNetPlan: boolean = true;
  private _trapFocusNetPlanSidebar: boolean = true;
  private _autoFocusNetPlanSidebar: boolean = true;
  private _keyCloseNetPlanSidebar: boolean = false;
  private _autoCollapseNetPlanSidebarHeight: number = null;
  private _autoCollapseNetPlanSidebarWidth: number = null;

  private _toggleNetPlanSidebar():void {
    this._openedNetPlanSidebar = !this._openedNetPlanSidebar;
  };

  // variables and functions for Participants

  private _openedParticipantsSidebar:boolean = false;
  private _positionParticipantsSidebar:string = 'left';
  private _modeParticipantsSidebar: string = 'slide';
  private _animateParticipantsSidebar: boolean = true;
  private _trapFocusParticipantsSidebar: boolean = true;
  private _autoFocusParticipantsSidebar: boolean = true;
  private _keyCloseParticipantsSidebar: boolean = false;
  private _autoCollapseParticipantsSidebarHeight: number = null;
  private _autoCollapseParticipantsSidebarWidth: number = null;

  private _toggleParticipantsSidebar():void {
    this._openedParticipantsSidebar = !this._openedParticipantsSidebar;
  };

  map: __esri.Map;
  mapView: __esri.MapView;
  view: __esri.View;
  layerView: __esri.LayerView;

  @ViewChild('map') mapEl: ElementRef;


 @Input() mapProperties: __esri.MapProperties = {
    basemap: 'hybrid',
    ground: "world-elevation"
  };



@Input() mapViewProperties: __esri.MapViewProperties = {
    center: [-118, 34.5],
    zoom: 7,
    constraints : {
        minZoom: 3,
    },
    viewpoint: {
      camera: {
        position: {},
        tilt: 50
      }
    }
  };

  @Input() portalItemId: string;

  @Output() mapInit = new EventEmitter();


  onMapInit(mapInfo: {map: __esri.Map, mapView: __esri.MapView}) {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;


    // add a layer with sublayers to map
    this.moduleProvider
      .require([ "esri/Map",
      "esri/views/SceneView",
      "esri/kernel"
     ])
      .then(
        ([Map, SceneView, esriNS]) => {
          // const view = new SceneView({
          //   scale: 123456789,
          //   container: "viewDiv",  // Reference to the DOM node that will contain the view
          //   map: this.map  // References the map object created in step 3
          // });
        console.log('kernel Version: '+ esriNS.version);

        })
        .catch(err => {
          // handle any errors
          console.error('Error from arcgis map: '+ err);
        });
  }



  public _toggleOpened(): void {
    this._opened = !this._opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  public _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  private _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  private _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }



}

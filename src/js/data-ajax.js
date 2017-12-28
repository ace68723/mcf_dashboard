//== Class definition

var DatatableJsonRemoteDemo = function () {
	//== Private functions

	// basic demo
	var demo = function () {

		var datatable = $('.m_datatable').mDatatable({
			// datasource definition
			// layout definition
			layout: {
			
				
			}

		});
  }

	return {
		// public functions
		init: function () {
			demo();
		}
	};
}();

jQuery(document).ready(function () {
	DatatableJsonRemoteDemo.init();
});

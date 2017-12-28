//== Class definition

var DatatableHtmlTableDemo = function() {
  //== Private functions
  
  // demo initializer
  var demo = function() {
      
    var datatable = $('.m-datatable').mDatatable({
      layout: {
        theme: 'default', // datatable theme
        class: '', // custom wrapper class
        scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
        footer: false // display/hide footer
      },

      // column sorting
      sortable: true,

      pagination: true,

      toolbar: {
        // toolbar items
        items: {
          // pagination
          pagination: {
            // page size select
            pageSizeSelect: [10, 20, 30, 50, 100],
          },
        },
      },
    });
  };

  return {
    //== Public functions
    init: function() {
      // init dmeo
      demo();
      
    },
  };
}();
jQuery(document).ready(function() {
  DatatableHtmlTableDemo.init();
});
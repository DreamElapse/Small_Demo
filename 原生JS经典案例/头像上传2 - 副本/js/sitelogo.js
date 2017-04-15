(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})
(function ($) {

  'use strict';

  var console = window.console || { log: function () {} };
    var $image = $(".avatar-wrapper").find('img');

  function CropAvatar($element) {
    this.$container = $element;

    this.$avatarView = this.$container.find('.avatar-view');
    this.$avatarModal = $("body").find('#avatar-modal');
    this.$loading = $("#page-wrapper").find('.loading');

    // this.$avatarForm = this.$avatarModal.find('.avatar-form');
    // this.$avatarInput = this.$avatarForm.find('.avatar-input');
    // this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

    this.init();
  }

  CropAvatar.prototype = {
    constructor: CropAvatar,
    support: {
      fileList: !!$('<input type="file">').prop('files'),
      blobURLs: !!window.URL && URL.createObjectURL,
      formData: !!window.FormData
    },

    init: function () {
      this.support.datauri = this.support.fileList && this.support.blobURLs;

      if (!this.support.formData) {
        this.initIframe();
      }
      this.initTooltip();
      this.initModal();
      this.addListener();
    },

    addListener: function () {
      this.$avatarView.on('click', $.proxy(this.click, this));
      // this.$avatarInput.on('change', $.proxy(this.change, this));
      // this.$avatarForm.on('submit', $.proxy(this.submit, this));
      // this.$avatarBtns.on('click', $.proxy(this.rotate, this));
    },

    initTooltip: function () {
      this.$avatarView.tooltip({
        placement: 'bottom'
      });
    },

    initModal: function () {
      this.$avatarModal.modal({
        show: false
      });
    },

    click: function () {
      this.$avatarModal.modal('show');
    },

  };

  $(function () {
    return new CropAvatar($('#crop-avatar'));
  });

});

// ...............................................
$(function () {

  var $image = $('#image');
  var options = {
        aspectRatio: 1 / 1,
        preview: '.avatar-preview'
      };

  // Cropper
  $image.on({
    'build.cropper': function (e) {
      console.log(e.type);
    },
    'built.cropper': function (e) {
      console.log(e.type);
    },
    'cropstart.cropper': function (e) {
      console.log(e.type, e.action);
    },
    'cropmove.cropper': function (e) {
      console.log(e.type, e.action);
    },
    'cropend.cropper': function (e) {
      console.log(e.type, e.action);
    },
    'crop.cropper': function (e) {
      console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
    },
    'zoom.cropper': function (e) {
      console.log(e.type, e.ratio);
    }
  }).cropper(options);



  // Methods
  $('.cutDown').on('click', function () {
    console.log(0);
    var $this = $(this);
    var data = $this.data();
    var result;
    
    if ($image.data('cropper') && data.method) {
      result = $image.cropper(data.method);
      if (result) {
        // $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
        $('#super').html(result);
        var src=result.toDataURL(); 
        alert(src); 
        // var src = result.toDataURL();
        // $("#touxiang").attr("src",src);
      }
    }
  });

  // Import image
  var $inputImage = $('#inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    $inputImage.change(function () {
      console.log(1);
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }
      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $image.one('built.cropper', function () {

            // Revoke when load complete
            URL.revokeObjectURL(blobURL);
          }).cropper('reset').cropper('replace', blobURL);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    console.log(1+"else");
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
});

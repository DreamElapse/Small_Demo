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
        // var src = result.toDataURL();
        // $("#super").attr("src",src);
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

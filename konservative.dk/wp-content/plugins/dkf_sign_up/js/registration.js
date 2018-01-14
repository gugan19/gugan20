jQuery(function () {
  var $ = jQuery;
  var $dkf_sign_up_form = $('#dkf_sign_up_form');
  var $dkf_select_membership_form = $('#dkf_select_membership_form');
  var $dkf_sign_up_form_error = $('#dkf_sign_up_form').hasClass("dkf_sign_up_form_error");
  /*
   * Hide section2 on all steps but 1
   */  
  if ($dkf_select_membership_form.length == 1 || $dkf_sign_up_form_error == true) {
    var i = 2;
    do {
      var $element = $('#content-section-' + i);
      if($element.has('#dkf_registation_form').length == 0) {
        $element.remove();
      }
      i++;
    }
    while (i < 10 && $element.length > 0);
  }

  /*
   * DAWA
   */
  if (typeof $.Autocomplete === 'function') {
    $.support.cors = true;
    var $display_address = $('input[name="address"]');
    var $dawa_address_id = $('input[name="dawa_address_id"]');

    $display_address.autocomplete({
      serviceUrl: '//dawa.aws.dk/adresser/autocomplete',
      dataType: 'jsonp',
      minChars: 2,
      deferRequestBy: 300,
      paramName: 'q',
      params: {
        per_side: 10
      },
      lookupLimit: 5,
      transformResult: function (response) {
        return {
          suggestions: $.map(response, function (dataItem) {
            return { value: dataItem.tekst, data: dataItem.adresse };
          })
        };
      },
      onSelect: function (selection) {
        $dawa_address_id.val(selection.data.id);
      },
      onSearchComplete: function (query, suggestions) {
        if(suggestions.length == 1) {
          if($dawa_address_id.attr('value') != suggestions[0].data.id) {
            $display_address.val(suggestions[0].value);
            $dawa_address_id.val(suggestions[0].data.id);
            $display_address.trigger(jQuery.Event('keyup', { }));
          }
        }
      },
    });

    $('.autocomplete').keypress(function(e){ 
      if (e.which == 13) {
        e.preventDefault();
        var $inputs = $(':input');
        var $i = $inputs.index(this) + 1;
        var $nextInput = $inputs[$i];
        while ($nextInput.type === 'hidden') {
          $i++;
          $nextInput = $inputs[$i];
        }
        if($nextInput) {
          $nextInput.focus();
        }
      }
    });


    $display_address.on('keyup', function (e) {
      // if TAB or Enter key, exit.
      if (e.keyCode === 9 || e.keyCode === 13) {
        return;
      }
      $dawa_address_id.val('');
    });
  }
  
  /*
   * Select memebership form
   */
  if ($('.dkf_select_membership_form').length) {
    var $form = $('#dkf_select_membership_form');
    var $terms_conditions = $('#terms_conditions');
    var $submit = $('#go_to_payment').prop('disabled', true);
    var $membership_ids = $('input[name=membership_id]');
    var $memberships = $('.membership');

    $terms_conditions.add($membership_ids).on('change click', function () {            
      if ($terms_conditions.is(':checked') && $membership_ids.is(':checked')) {
        $submit.prop('disabled', false);
      } else {
        $submit.prop('disabled', true);
      }
    });

    $.each($memberships, function (index, element) {
      var $membership = $(element);
      var $membership_id = $membership.find('input[name=membership_id]');
      $membership.on('click', function () {                
        $membership_id.prop('checked', true).trigger('click');                
      });
    });

    $membership_ids.on('change click', function (e) {
      e.stopPropagation();
      var $selectedMembership = $(e.target).parents('.membership');
      $memberships.removeClass('selected');
      $selectedMembership.addClass('selected');            
    });
  }

  /*
   * Select interests form
   */
  if ($('.dkf_interests_form').length) {
    $("[id^=interest]").on('change click', function (e) {
      if($(e.target).is(":checked")) {
        $(e.target).parent().addClass('selected'); 
      }
      else {
        $(e.target).parent().removeClass('selected'); 
      }
    });
  }
  
  $('.dkf_form_loading').on('submit', function () {                
    jQuery("body").addClass("loading");
    var modal_text = document.getElementById('modal-text');
    modal_text.innerHTML = "Vent et øjeblik";
  });
  $('#dkf_registation_form').on('submit', function () {                
    jQuery("body").addClass("loading");
    var modal_text = document.getElementById('modal-text');
    modal_text.innerHTML = "Vent et øjeblik";
  });
  $('#dkf_select_membership_form').on('submit', function () {                
    jQuery("body").addClass("loading");
    var modal_text = document.getElementById('modal-text');
    modal_text.innerHTML = "Vent et øjeblik";
  });
});
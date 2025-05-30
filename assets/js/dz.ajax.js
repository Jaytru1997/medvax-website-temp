function contactForm() {
  var s;
  (window.verifyRecaptchaCallback = function (a) {
    $("input[data-recaptcha]").val(a).trigger("change");
  }),
    (window.expiredRecaptchaCallback = function () {
      $("input[data-recaptcha]").val("").trigger("change");
    }),
    $(".dzForm").on("submit", function (a) {
      a.preventDefault(),
        $(".dzFormMsg").html(
          '<div class="gen alert alert-success">Submitting..</div>'
        );
      var a = $(this).attr("action"),
        t = $(this).serialize();
      $.ajax({
        method: "POST",
        url: a,
        data: t,
        dataType: "json",
        success: function (a) {
          1 == a.status &&
            (s = '<div class="gen alert alert-success">' + a.msg + "</div>"),
            0 == a.status &&
              (s = '<div class="err alert alert-danger">' + a.msg + "</div>"),
            $(".dzFormMsg").html(s),
            setTimeout(function () {
              $(".dzFormMsg .alert").hide(1e3);
            }, 1e4),
            $(".dzForm")[0].reset(),
            grecaptcha.reset();
        },
      });
    }),
    $(".dzSubscribe").on("submit", function (a) {
      a.preventDefault();
      var t = $(this),
        a = t.attr("action"),
        e = t.serialize();
      t.addClass("dz-ajax-overlay"),
        $.ajax({
          method: "POST",
          url: a,
          data: e,
          dataType: "json",
          success: function (a) {
            t.removeClass("dz-ajax-overlay"),
              1 == a.status &&
                (s =
                  '<div class="gen alert alert-success">' + a.msg + "</div>"),
              0 == a.status &&
                (s = '<div class="err alert alert-danger">' + a.msg + "</div>"),
              $(".dzSubscribeMsg").html(s),
              setTimeout(function () {
                $(".dzSubscribeMsg .alert").hide(1e3);
              }, 1e4),
              $(".dzSubscribe")[0].reset();
          },
        });
    });
}
jQuery(document).ready(function () {
  contactForm();
});

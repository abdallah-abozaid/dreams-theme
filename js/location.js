$("#provincesSelectLIist").change(function () {
  const $this = $(this);
  const selectedValue = $this.val();
  ChangeProvincesFunction(selectedValue);
});

function ChangeProvincesFunction(provinceId) {
  const $elNewgh = $("#neighborhoodtsSelectLIist");
  $elNewgh.prop("disabled", "disabled");
  $elNewgh.append(
    $("<option class='lableFormColor'></option>")
      .attr("value", "")
      .text("اختاري الحي")
  );

  const request = $.ajax({
    url: "/Location/GetCitiesByProvince",
    type: "GET",
    data: {
      ProvinceId: provinceId,
    },
  });

  request.done(function (data) {
    var $el = $("#citiesSelectLIist");
    $el.empty(); // remove old options
    if (data.status) {
      $el.prop("disabled", false);
      $el.append(
        $("<option class='lableFormColor'></option>")
          .attr("value", "")
          .text("اختاري المدينة")
      );
      $.each(data.result, function (index, item) {
        $el.append(
          $("<option></option>").attr("value", item.value).text(item.text)
        );
      });
    } else {
      $el.prop("disabled", "disabled");
      $el.append(
        $("<option class='lableFormColor'></option>")
          .attr("value", "")
          .text("اختاري المدينة")
      );
      alert(data.message);
    }
  });

  request.fail(function (jqXHR, textStatus) {
    window.location.reload();
  });
}

$("#citiesSelectLIist").change(function () {
  const $this = $(this);
  const selectedValue = $this.val();
  ChangeCitiFunction(selectedValue);
});

function ChangeCitiFunction(cityId) {
  const request = $.ajax({
    url: "/Location/GetNeighborhoodtsByCity",
    type: "GET",
    data: {
      cityId: cityId,
    },
  });

  request.done(function (data) {
    var $el = $("#neighborhoodtsSelectLIist");
    $el.empty(); // remove old options
    if (data.status) {
      $el.prop("disabled", false);
      $el.append(
        $("<option class='lableFormColor'></option>")
          .attr("value", "")
          .text("اختاري الحي")
      );
      $.each(data.result, function (index, item) {
        $el.append(
          $("<option></option>")
            .attr("value", item.id)
            .attr("data-location-latitude", item.latitude)
            .attr("data-location-longitude", item.longitude)
            .text(item.nameAr)
        );
      });
    } else {
      $el.prop("disabled", "disabled");
      $el.append(
        $("<option class='lableFormColor'></option>")
          .attr("value", "")
          .text("اختاري الحي")
      );
      alert(data.message);
    }
  });

  request.fail(function (jqXHR, textStatus) {
    window.location.reload();
  });
}

$("#neighborhoodtsSelectLIist").change(function () {
  ChangeNeighborhoodFunction($(this));
});

function ChangeNeighborhoodFunction(neighborhoodSelectOptionItem) {
  var neighborhoodSelectOptionItem = $(
    "#neighborhoodtsSelectLIist option:selected"
  );
  const latitude = neighborhoodSelectOptionItem.attr("data-location-latitude");
  const longitude = neighborhoodSelectOptionItem.attr(
    "data-location-longitude"
  );
  initMap(longitude, latitude);
}

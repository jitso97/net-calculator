var nets = { 
  golf: [ 
    ["No.18 Twisted & Knotted Polyethylene with 7/8\" mesh (Black)", {cost: 0.23, weight: 0.03, rate: 1.35}],
    ["No.18 Twisted & Knotted Nylon with 7/8\" mesh (Black/White)", {cost: 0.28, weight: 0.04, rate: 1.4}],
    ["No.18 Twisted & Knotted Nylon with 3/4\" mesh (Black/White)", {cost: 0.35, weight: 0.045, rate: 1.35}],
    ["No.24 Twisted & Knotted Nylon with 3/4\" mesh (Black/White)", {cost: 0.58, weight: 0.068, rate: 1.35}],
    ["No.18 Braided Knotless Polyester with 7/8\" mesh (Black)", {cost: 0.32, weight: 0.04, rate: 1.35}] 
  ],
  baseball: [
    ["No.18 Twisted & Knotted Polyethylene with 1-7/8\" mesh (Black, Green)", {cost:0.20, weight:0.019, rate:1.35}],
    ["No.18 Twisted & Knotted Nylon with 1-7/8\" mesh (Black, Green)", {cost:0.23, weight:0.019, rate:1.35}],
    ["No.21 Twisted & Knotted Polyethylene with 1-7/8\" mesh (Black)", {cost:0.21, weight:0.019, rate:1.35}],
    ["No.21 Twisted & Knotted Nylon with 1-7/8\" mesh (Black, White)", {cost:0.24, weight:0.022, rate:1.35}],
    ["No.24 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.25, weight:0.023, rate:1.35}],
    ["No.30 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.27, weight:0.035, rate:1.35}],
    ["No.36 Twisted & Knotted Polyethylene with 1-7/8\" mesh (Black)", {cost:0.24, weight:0.04, rate:1.35}],
    ["No.36 Twisted & Knotted Nylon with 1-7/8\" mesh (Black, Green, White)", {cost:0.29, weight:0.0425, rate:1.35}],
    ["No.42 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.37, weight:0.048, rate:1.35}],
    ["No.48 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.49, weight:0.055, rate:1.35}],
    ["No.60 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.60, weight:0.068, rate:1.35}],
    ["No.72 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:0.70, weight:0.075, rate:1.35}],
    ["No.96 Twisted & Knotted Nylon with 1-7/8\" mesh (Black)", {cost:1.05, weight:0.12, rate:1.35}]
  ],
  lacrosse: [
    ["0.9 mm Monofilament Hockey 1-7/8\” Netting (Clear)", {cost:0.27, weight:0.02, rate:1.35}],
    ["No.30 Twisted & Knotted Nylon with 1-1/2\” Mesh (Black)", {cost:0.32, weight:0.04, rate:1.35}]
  ],
  soccer: [
    ["No.36 Twisted & Knotted Nylon with 4\” Mesh (Black, White)", {cost:0.21, weight:0.02, rate:1.35}]
  ],
  windscreen: [
    ["Heavy Duty PVC Coated Windscreen (Navy Blue, Black, Forest Green, Green, Red, Royal Blue)", {cost: 0.35, weight: 0.12, rate: 1.42}]
  ]
};


var area;
var area_cage;
var area_baffle;
var cut_fee=0;
var type;
var user_input_content;
var result;

// section 1 submit - get dimension
$('.btn-get-dimension').click(function() {
  type = $(this).attr("data-type");
  user_input_content = "<h4>TYPE: " + type + "</h4>"
  $("#dimension .user-input").html(user_input_content);
  console.log (type);
  if(type == "panel" || type == "windscreen") { 
    $(".input-line-wrapper").hide();
    $("#dimension-input-height, #dimension-input-width").show();
  }
  if(type == "batting-cage") { 
    $(".input-line-wrapper").hide();
    $("#dimension-input-height, #dimension-input-width, #dimension-input-depth").show();
  }
  if(type == "golf-cage") { 
    $(".input-line-wrapper").hide();
    $("#dimension-input-height, #dimension-input-width, #dimension-input-depth").show();
  }
  if(type == "goal-netting") { 
    $(".input-line-wrapper").hide();
    $("#dimension-input-height, #dimension-input-width, #dimension-input-top, #dimension-input-base").show();
  }
  $('#type').slideUp("slow" );
  $('#dimension').slideDown();
});


// section 2 submit - show result
$('.btn-get-result').click(function() {
  var ht_ft = $("#height-ft").val();
  var ht_in = $("#height-in").val();
  var wd_ft = $("#width-ft").val();
  var wd_in = $("#width-in").val();
  var dp_ft = $("#depth-ft").val();
  var dp_in = $("#depth-in").val();
  var top_ft = $("#top-ft").val();
  var top_in = $("#top-in").val();
  var base_ft = $("#base-ft").val();
  var base_in = $("#base-in").val();
  var inputRegex = /^\d*$/; // numbers check
  if(!inputRegex.test( ht_ft ) ||
    !inputRegex.test( ht_in ) ||
    !inputRegex.test( wd_ft ) ||
    !inputRegex.test( wd_in ) ||
    !inputRegex.test( dp_ft ) ||
    !inputRegex.test( dp_in ) ||
    !inputRegex.test( top_ft ) ||
    !inputRegex.test( top_in ) ||
    !inputRegex.test( base_ft ) ||
    !inputRegex.test( base_in ) ) {
    alert("We need numbers ...")
    return false;
  }
  var height = (new Number( ht_ft )+ new Number( ht_in/12 )).toFixed(2);
  var width = (new Number( wd_ft ) + new Number( wd_in/12)).toFixed(2);
  var depth = (new Number( dp_ft) + new Number( dp_in/12)).toFixed(2);
  var top = (new Number( top_ft) + new Number( top_in/12)).toFixed(2);
  var base = (new Number( base_ft) + new Number( base_in/12)).toFixed(2);

  if(type == "panel") {
    //calculate area, reset result
    area = height * width;
    result = "";
    //populate user input div
    user_input_content = "<h4> Type: " + type + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dimension: " + height + "ft. x " + width + "ft." + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Area: " + area + "ft<sup>2</sup>";
    $("#result .user-input").html(user_input_content);

    //populate result #result-wrapper.  Need to go through all netting.

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Golf</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.golf.forEach(getResult);
    result += "</tbody></table>";

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Baseball</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.baseball.forEach(getResult);
    result += "</tbody></table>";

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Lacrosse/Hockey</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.lacrosse.forEach(getResult);
    result += "</tbody></table>";

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Soccer/Football</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.soccer.forEach(getResult);
    result += "</tbody></table>        <h4>Options:</h4>        <h6>Add vinyl: $0.45 per ft. with $7.50 minimum.</h6>";
  }

  if(type == "batting-cage"){
    //calculate area, reset result
    area = 2*(height * width) + 2*(height*depth) + (width*depth);
    result = "";
    //populate user input div
    user_input_content = "<h4> Type: " + type + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dimension: " + height + "ft.H x " + width + "ft.W x " + depth + "ft.D  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Area: " + area + "ft<sup>2</sup>";
    $("#result .user-input").html(user_input_content);

    //populate result #result-wrapper.  Need to go through all netting.

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Golf</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.golf.forEach(getResult);
    result += "</tbody></table>";

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Baseball</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.baseball.forEach(getResult);
    result += "</tbody></table>         <h4>Options:</h4>        <h6>Add vinyl: $0.45 per ft. with $7.50 minimum.</h6>";
  }
  if(type == "golf-cage") {
    //calculate area, reset result
    area_cage = (height * width) + 2*(height*depth) + (width*depth);
    area_baffle = height * width;

    area = area_cage + area_baffle; //cage

    result = "";
    //populate user input div WITH 2 PRICES ONE WITH SAME NETTING, ONE WITH HIGH IMPACT PRO BAFFLE
    user_input_content = "<h4> Type: " + type + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dimension: " + height + "ft.H x " + width + "ft.W x " + depth + "ft.D  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cage Area: " + area_cage + "ft<sup>2</sup> &nbsp;&nbsp;&nbsp; Baffle Area: "+area_baffle+"ft<sup>2</sup>&nbsp;&nbsp;&nbsp;Total Area: " + area + "ft<sup>2</sup>";
    $("#result .user-input").html(user_input_content);

    //populate result #result-wrapper. 3 tables: FIRST IS OPEN FRONT WITH DOUBLE REAR PANEL
    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Golf Cage with Baffle, Obviously...</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.golf.forEach(getResult);
    result += "</tbody></table>";

    // SECOND IS JUST CAGE, NO BAFFLE
    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Golf Cage Only</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.golf.forEach(getResultGolfCageOnly);
    result += "</tbody></table>";

    // THRID IS FOR BAFFLE ONLY
    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Golf Baffle Net Only</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.golf.forEach(getResultGolfBaffleOnly);
    result += "</tbody></table>";
    result += "<h4>Options:</h4>        <h6>Add leadcore (weighted bottom border): $0.00 per ft. with $0.00 minimum.</h6>";
  }

  if(type == "goal-netting") {
    // formula for goals with Top and Base dimension.  Works whether if they are have same or diffent value.
    area = (Math.ceil(width)*Math.ceil(top)) + (Math.ceil(width)* (Math.ceil( Math.sqrt( (Math.pow(height, 2)+Math.pow((base-top), 2)) ) ))) + 2*(Math.ceil(height)*Math.ceil(base)) ;
    console.log((Math.ceil(width)*Math.ceil(top)));
    console.log((Math.ceil(width)* (Math.ceil( Math.sqrt( (Math.pow(height, 2)+Math.pow((base-top), 2)) ) ))));
    console.log(2*(Math.ceil(height)*Math.ceil(base)));
    if(top !== base) {
      cut_fee = 20;
    }
    user_input_content = "<h4> Type: " + type + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dimension: " + height + "ft.H x " + width + "ft.W x " + top +"ft.T x "+base+"ft.B  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Area: " + area + "ft<sup>2</sup>.";
    $("#result .user-input").html(user_input_content);

    result = "<table class=\"table table-condensed table-hover\"><thead><tr><th>Soccer Goal Netting</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.soccer.forEach(getResultGoalNet);
    result += "</tbody></table>";

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Lacrosse Goal Netting</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.lacrosse.forEach(getResultGoalNet);
    result += "</tbody></table>";

    result += "<h4>Options:</h4>        <h6>Add leadcore (weighted bottom border): $0.00 per ft. with $0.00 minimum.</h6>";
    cut_fee = 0;
  }
  if(type == "windscreen") {

    area = height * width;
    result = "";
    //populate user input div
    user_input_content = "<h4> Type: " + type + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dimension: " + height + "ft. x " + width + "ft." + "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Area: " + area + "ft<sup>2</sup>";
    $("#result .user-input").html(user_input_content);

    //populate result #result-wrapper.  Need to go through all netting.

    result += "<table class=\"table table-condensed table-hover\"><thead><tr><th>Windscreens</th><th>Price</th><th>Weight</th></tr></thead><tbody>";
    nets.windscreen.forEach(getResult);
    result += "</tbody></table>";

  }


  $("#result-wrapper").html(result);
  $('#dimension').slideUp("slow" );
  $('#result').slideDown();

});


$('.do-another').click(function() {
  $('#result').slideUp("fast" );
  $('#type').slideDown();
});

// helper functions
function getWeight(sqft, rate) { return (sqft*rate).toFixed(0); }
function getPrice(sqft, rate) { return Math.floor(rate*sqft)+0.99; }

function getResult(current, index, array) {
  var name = current[0];
  var rate = current[1].rate;
  var sellAt = getPrice(area, (current[1].cost*rate));
  // console.log("cost: "+ cost + ", rate: " + rate);
  var weight = getWeight(area, current[1].weight);
  result += "<tr> <td>"+name+"</td><td>$"+ sellAt + "</td><td>"+ weight+" lb. </td></tr>";
}
function getResultGolfCageOnly(current, index, array) {
  var name = current[0];
  var rate = current[1].rate;
  var sellAt = getPrice(area_cage, (current[1].cost*rate));
  // console.log("cost: "+ cost + ", rate: " + rate);
  var weight = getWeight(area, current[1].weight);
  result += "<tr> <td>"+name+"</td><td>$"+ sellAt + "</td><td>"+ weight+" lb. </td></tr>";
}
function getResultGolfBaffleOnly(current, index, array) {
  var name = current[0];
  var rate = current[1].rate;
  var sellAt = getPrice(area_baffle, (current[1].cost*rate));
  // console.log("cost: "+ cost + ", rate: " + rate);
  var weight = getWeight(area, current[1].weight);
  result += "<tr> <td>"+name+"</td><td>$"+ sellAt + "</td><td>"+ weight+" lb. </td></tr>";
}
function getResultGoalNet(current, index, array) {
  var name = current[0];
  var rate = current[1].rate;
  var sellAt = Math.floor(cost*rate)+0.99;
  // console.log("cost: "+ cost + ", rate: " + rate);
  var weight = getWeight(area, current[1].weight);
  result += "<tr> <td>"+name+"</td><td>$"+ sellAt + "</td><td>"+ weight+" lb. </td></tr>";
}
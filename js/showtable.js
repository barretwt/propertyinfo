$(document).ready(function() {

 $(".date").datepicker({
        format: "yyyy-mm-dd",
      });
 
	var offset = 0;
	var lastentry = 0;
	var prevstring = "";
	var totstring = "";
	
	// adding search data
	$("#searchBtn").on("click",function()
	{
	
	
	var yearbuilt = new Array();
   var ownername = new Array();
     var street = new Array();
	  var lotsize = new Array();
	  var assessd = new Array();
	  var tvalue = new Array();
	   var zipvalue = new Array();
	   
	 var dstr = validate();
	 
	 var datastr = dstr.split(",");
	
	
	
	$.ajax({
   url: "php/getpcode.php", 
   type: "POST",
  data: {"zcode":datastr[0],"pyrfr":datastr[1],"pyrto":datastr[2],"lsizefr":datastr[3],"lsizeto":datastr[4],"assdfr":datastr[5],"assdto":datastr[6],"tvalmin":datastr[7],"tvalmax":datastr[8],"address":datastr[9],"frowner":datastr[10],"offs":0},
 dataType: 'json',
   success: function (result) {
  var datalen = result.length;
 if(datalen < 100)
 {
$(".recordinfo").text("Showing 1 to " + datalen + " Entries");
 offset = 0;
  $("#shownext").prop("disabled", true);
	$("#showprev").prop("disabled", true);
 }
	else
	{
	$(".recordinfo").text("Showing 1 to 100 Entries");
	offset += 100;
	$("#shownext").prop("disabled", false);
	$("#showprev").prop("disabled", false);
	}
for(var i=0;i<datalen;i++)
{
console.log(result[i].PropertyKey);
yearbuilt.push(result[i].PropertyYearBuilt);
ownername.push(result[i].FirstOwnerName);
street.push(result[i].PropertyStreetNbrNameText);
lotsize.push(result[i].LotSizeQty);
assessd.push(result[i].AssessmentDate);
tvalue.push(result[i].TotalValueAmt);
zipvalue.push(result[i].PropertyZipCode);

}
  
	  
 filltable(yearbuilt,ownername,street,lotsize,assessd,tvalue,zipvalue);

 
	
    },
    error: function (err) {
    // check the err for error details
    }
 }); // ajax call closing
	
	
	});

$("#shownext").on("click",function()
	{
	
	var key = new Array();
	var yearbuilt = new Array();
   var ownername = new Array();
     var street = new Array();
	  var lotsize = new Array();
	  var assessd = new Array();
	  var tvalue = new Array();
	   var zipvalue = new Array();
	   
	 var dstr = validate();
	 
	 var datastr = dstr.split(",");
	if(offset == 0)
	{
	offset = 100;
	}

	
	$.ajax({
   url: "php/getpcode.php", 
   type: "POST",
  data: {"zcode":datastr[0],"pyrfr":datastr[1],"pyrto":datastr[2],"lsizefr":datastr[3],"lsizeto":datastr[4],"assdfr":datastr[5],"assdto":datastr[6],"tvalmin":datastr[7],"tvalmax":datastr[8],"address":datastr[9],"frowner":datastr[10],"offs":offset},
 dataType: 'json',
   success: function (result) {
  var datalen = result.length;
if(datalen == 0)
{
$("#tNotice").text("There are no more entries");
lastentry = 0;
}
else if(datalen < 100)
{
lastentry = 1;
$("#tNotice").text("");
$(".recordinfo").text("Showing " + (offset + 1) + " to " + (offset + datalen) + " Entries");
offset += 100;	
for(var i=0;i<datalen;i++)
{
console.log(result[i].PropertyKey);
yearbuilt.push(result[i].PropertyYearBuilt);
ownername.push(result[i].FirstOwnerName);
street.push(result[i].PropertyStreetNbrNameText);
lotsize.push(result[i].LotSizeQty);
assessd.push(result[i].AssessmentDate);
tvalue.push(result[i].TotalValueAmt);
zipvalue.push(result[i].PropertyZipCode);

}
  
	  
 filltable(yearbuilt,ownername,street,lotsize,assessd,tvalue,zipvalue);
	}
else
{
lastentry = 0;
$("#tNotice").text("");
$(".recordinfo").text("Showing " + (offset + 1) + " to " + (offset + 100) + " Entries");
 	offset += 100;
for(var i=0;i<datalen;i++)
{
console.log(result[i].PropertyKey);
yearbuilt.push(result[i].PropertyYearBuilt);
ownername.push(result[i].FirstOwnerName);
street.push(result[i].PropertyStreetNbrNameText);
lotsize.push(result[i].LotSizeQty);
assessd.push(result[i].AssessmentDate);
tvalue.push(result[i].TotalValueAmt);
zipvalue.push(result[i].PropertyZipCode);

}
  
	  
 filltable(yearbuilt,ownername,street,lotsize,assessd,tvalue,zipvalue);
	}
    },
    error: function (err) {
    // check the err for error details
    }
 }); // ajax call closing
	
	
	});
	
	$("#showprev").on("click",function()
	{
	
	
	var yearbuilt = new Array();
   var ownername = new Array();
     var street = new Array();
	  var lotsize = new Array();
	  var assessd = new Array();
	  var tvalue = new Array();
	   var zipvalue = new Array();
	   
	 var dstr = validate();
	 
	 var datastr = dstr.split(",");
	
	if(offset == 0)
 {
 offset = 0;
}
else if(offset > 0)
{	
if(lastentry == 1)
{
offset -= 200;
lastentry = 0;
}
else
{
 offset -= 100;
}
}	
	$.ajax({
   url: "php/getpcode.php", 
   type: "POST",
  data: {"zcode":datastr[0],"pyrfr":datastr[1],"pyrto":datastr[2],"lsizefr":datastr[3],"lsizeto":datastr[4],"assdfr":datastr[5],"assdto":datastr[6],"tvalmin":datastr[7],"tvalmax":datastr[8],"address":datastr[9],"frowner":datastr[10],"offs":offset},
 dataType: 'json',
   success: function (result) {
  var datalen = result.length;
console.log("off: " + offset);
 
$(".recordinfo").text("Showing " + (offset + 1) + " to " + (offset + 100) + " Entries");
 
for(var i=0;i<datalen;i++)
{

yearbuilt.push(result[i].PropertyYearBuilt);
ownername.push(result[i].FirstOwnerName);
street.push(result[i].PropertyStreetNbrNameText);
lotsize.push(result[i].LotSizeQty);
assessd.push(result[i].AssessmentDate);
tvalue.push(result[i].TotalValueAmt);
zipvalue.push(result[i].PropertyZipCode);

}
  
	  
 filltable(yearbuilt,ownername,street,lotsize,assessd,tvalue,zipvalue);
	
    },
    error: function (err) {
    // check the err for error details
    }
 }); // ajax call closing
	
	
	});
	
	
	function filltable(yearbuilt,fowner,street,lotsz,assd,totval,zip)
{
$("#propdata tbody").empty();

var tablestr = "";
	for(var i=0;i<yearbuilt.length;i++)
	{
	//tablestr += "<tr><td>"+ i + "</td>";
		tablestr += "<tr><td>"+ street[i] + "</td>";
		tablestr += "<td>"+ zip[i] + "</td>";
		tablestr += "<td>"+ lotsz[i] + "</td>";
		tablestr += "<td>"+ yearbuilt[i] + "</td>";
		tablestr += "<td>"+ fowner[i] + "</td>";
		tablestr += "<td>"+ assd[i] + "</td>";
		tablestr += "<td>"+ totval[i] + "</td></tr>";
	}
	
	$("#propdata tbody").append(tablestr);
}

function validate()
{
var pcode = $("#propertyzip").val(); // zip code
	var propyrfr = $("#propyrfrom").val(); // property year from
	var propyrto = $("#propyrto").val(); // property year to
	var lotsizefr = $("#lotsizefrom").val(); // lot size from
	var lotsizeto = $("#lotsizeto").val(); // lot size to
	var assessfr = $("#assdfrom").val(); // assessment date from
	var assessto = $("#assdto").val(); // assessment date to
	var totvalmin = $("#totalvalueamtmin").val(); // total value minimum
	var totvalmax = $("#totalvalueamtmax").val(); // total value maximum
	var addr = $("#addresstxt").val(); // address
	var fowner = $("#ownername").val(); // first owner
	var dataarr = new Array();
	
	if(pcode != "") 
	{
	totstring += "prop";
	dataarr.push(pcode);
	}
	else
	{
	dataarr.push("" );
	}
	if((propyrfr != "") && (propyrto != ""))
	{
	totstring += "propyrfr";
	dataarr.push(propyrfr);
	dataarr.push(propyrto);
	}
	else
	{
	dataarr.push("");
	dataarr.push("");
	}
	if((lotsizefr != "") && (lotsizeto != ""))
	{
	totstring += "lotsizefr";
	dataarr.push(lotsizefr);
	dataarr.push(lotsizeto);
	}
	else
	{
	dataarr.push("");
	dataarr.push("");
	}
	if((assessfr != "") && (assessto != ""))
	{
	totstring += "assessfr";
	dataarr.push(assessfr.toString() + " 00:00:00");
	dataarr.push(assessto.toString() + " 00:00:00");
	}
	else
	{
	dataarr.push("");
	dataarr.push("");
	}
	if((totvalmin != "") && (totvalmax != ""))
	{
	totstring += "totvalmin";
	dataarr.push(totvalmin);
	dataarr.push(totvalmax);
	}
	else
	{
	dataarr.push("");
	dataarr.push("");
	}
	if(addr != "")
	{
	totstring += "adress";
	dataarr.push(addr);
	}
	else
	{
	dataarr.push("");
	}
	if(fowner != "")
	{
	totstring += "firstowner";
	dataarr.push(fowner);
	}
	else
	{
	dataarr.push("");
	}
	/*
		var prevstring = "";
	var totstring = "";
	// code for the records shown
	if(prevstring == "")
	{
	offset = 0;
	}
	else
	{
	  if(prevstring == totstring)
	  {
	    offset += 100;
		
		}
		else
		{
		  offset = 0;
		  prevstring = totstring;
		 }
	}
	*/
	
return dataarr.toString();
}
	
} );
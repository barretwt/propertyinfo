<?php

include("connect.php");

$zcode = ($_POST["zcode"]);
$yrbuiltfr = ($_POST["pyrfr"]);
$yrbuiltto = ($_POST["pyrto"]);
$lotszfr = ($_POST["lsizefr"]);
$lotszto = ($_POST["lsizeto"]);
$assdfr = $_POST["assdfr"];
$assdto = $_POST["assdto"];
$tvalmin = ($_POST["tvalmin"]);
$tvalmax = ($_POST["tvalmax"]);
$addr = ($_POST["address"]);
$frown = ($_POST["frowner"]);

$assdfr = str_replace("+"," ",$assdfr);
$assdto = str_replace("+"," ",$assdto);

$offset = intval($_POST["offs"]);

$farray = array();

if($zcode != "")
{
	$zsql = " and p.PropertyZipCode = ".$zcode;
}

else
{
	$zsql = "";
}

if($yrbuiltfr != "")
{
	$pyf = " and p.PropertyYearBuilt between ".$yrbuiltfr." and ".$yrbuiltto;
}

else
{
	$pyf = "";
}

if($lotszfr != "")
{
	$lsize = " and p.LotSizeQty between ".$lotszfr." and ".$lotszto;
}

else
{
	$lsize = "";
}

if($assdfr != "")
{
	$asd = " and a.AssessmentDate between '".$assdfr."' and '".$assdto."'";
}

else
{
	$asd = "";
}

if($tvalmin != "")
{
	$tvl = " and a.TotalValueAmt between ".$tvalmin." and ".$tvalmax;
}

else
{
	$tvl = "";
}

if($frown != "")
{
	$fro = " and p.FirstOwnerName LIKE '%".$frown."%'";
}

else
{
	$fro = "";
}

if($addr != "")
{
	$ads = " and p.PropertyStreetNbrNameText LIKE '%".$addr."%'";
}

else
{
	$ads = "";
}


$sql = "SELECT p.PropertyKey, p.PropertyStreetNbrNameText, p.PropertyZipCode, p.LotSizeQty, p.PropertyYearBuilt, p.FirstOwnerName, a.AssessmentDate, a.TotalValueAmt FROM property p ,assessment a WHERE p.RealEstatePropertyCode = a.RealEstatePropertyCode".$zsql.$pyf.$lsize.$asd.$tvl.$fro.$ads." ORDER BY a.TotalValueAmt ASC LIMIT 100 OFFSET ".$offset;
$result = mysqli_query($conn,$sql);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
	{
	array_push($farray,$row);
	}
	
echo json_encode($farray);
mysqli_free_result($result);
mysqli_close($conn);
	
echo mysqli_num_rows($result);

?>

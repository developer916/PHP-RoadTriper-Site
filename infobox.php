<div id="infobox"></div>
<div class="infobox-wrapper">
    <div id="cloneInfobox">
    	<input type="hidden" id="infoboxLocationId"/>    
    	<div id="infoboxContainer">
	        <div class="floatleft marginRight10">
	        	<img src="" id="infoboxPhoto"/>
	        </div>
	    	<div class="floatleft">
	    		<div id="infoboxLocationTitle">Location Title</div>
	    		<div id="infoboxLocationSubTitle">Location SubTitle</div>
	    	</div>
	        <div class="clearboth"></div>
	        <a id="infoboxBodyAreaOverlay" class="js-link"></a>
	        <div id="infoboxBtnArea">
	        	<div style="width:100%;border:none;font-weight:bold;" id="btnRemoveToTrip" class="btn btn-danger btn-rectangle hide floatleft" onclick="onClickRemoveToTrip(this)"><i class="icon-remove icon-white"></i>&nbsp;<?php echo _lang("REMOVE TO TRIP");?></div>
	        	<div style="width:50%;border:none;font-weight:bold;" id="btnAddToTrip" class="btn btn-success btn-rectangle btnAddToTrip floatleft" onclick="onClickAddToTrip(this)"><i class="icon-plus icon-white"></i>&nbsp;<?php echo _lang("ADD TO TRIP");?></div>
	        	<div style="width:50%;border:none;font-weight:bold;" id="btnBucketList" class="btn btn-info btn-rectangle btnBucketList floatleft" onclick="onClickBucketList(this)"><i class="icon-align-justify icon-white"></i>&nbsp;<?php echo _lang("BUCKET LIST");?></div>
	        	<div class="clearboth"></div>
	        </div>
        </div>
    </div>
</div>
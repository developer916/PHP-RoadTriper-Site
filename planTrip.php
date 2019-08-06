	<div id="panelPlanTrip" class="panel hide">
		<div style="background:url('/img/panel01.png');height: 75px;text-align:center;">
			<br>
			<span class="panelTopLabel"><?php echo _lang("Plan Trips");?></span>
		</div>
		<div id="planTripSaveShare">
			<div id="planTripSaveShareItem" class="floatleft">
				<a onclick="onSavedTrip()"><i class="icon-tags icon-white" style="background-position: -25px -48px;"></i>&nbsp;&nbsp;&nbsp;<?php echo _lang("saved trips");?></a>
				&nbsp;
				<span id="cntPlanTrip" <?php echo $isLogin=="Y"?"":"style='display:none;'";?>><?php echo $cntPlanTrip;?></span>
			</div>
			<div id="planTripSaveShareItem" class="floatleft">
				<a onclick="onShareTrip()"><i class="icon-share icon-white"></i>&nbsp;&nbsp;&nbsp;<?php echo _lang("share trips");?></a>
			</div>
			<div class="clearboth"></div>
		</div>
		<div id="planTripAdvanced" class="hide">
			<a onclick="onAdvancedMode()"><i class="icon-filter"></i>&nbsp;&nbsp;&nbsp;<?php echo _lang("advanced modes");?></a>
		</div>
		<div id="planTripLocationList">

		</div>
		<div id="planTripButtonArea">
			<button class="btn btn-small btn-info" onclick="onClickPlanTripNew()"><?php echo _lang("NEW");?></button>
			<button class="btn btn-small btn-success" onclick="onClickPlanTripSavePopup()"><?php echo _lang("SAVE TRIP");?></button>			
		</div>

	</div>

	<!-- CLONE AREA START -->
	<div id="clonePlanTripLocationItem" class="hide">
		<div id="itemSearch" style="margin-left: 10px;">
			<span class="badge" id="itemNo">0</span>
			<input type="text" id="txtTripLocation">
			<a id="tripItemDelete" onclick="onClickTripItemDelete(this)"><i class="icon-remove"></i></a>
		</div>
		<div id="itemAction">
			<input type="hidden" id="tripItemDistanceValue" value="0"/>
			<input type="hidden" id="tripItemTimeValue" value="0"/>
			<input type="hidden" id="tripItemFuelCostValue" value="0"/>		
			<!-- a id="tripItemRoadType" onclick="onClickTripItemRoadType(this)" class="floatleft"><i class="icon-road"></i></a -->
			<div class="floatleft" style="margin-left: 10px;"><i class="icon-road"></i></div>
			<div id="tripItemDistance" class="floatleft">&nbsp;</div>
			<div class="floatleft"><i class="icon-time"></i></div>
			<div id="tripItemTime" class="floatleft">&nbsp;</div>
			<div class="floatleft"><i class="icon-asterisk"></i></div>
			<div id="tripItemFuelCost" class="floatleft">&nbsp;</div>			
			<a id="tripItemAdd" class="floatleft" onclick="onClickTripItemAdd(this, true)"><i class="icon-plus-sign"></i></a>
			<div class="clearboth"></div>
		</div>
		<input type="hidden" id="planTripLocationLat"/>
		<input type="hidden" id="planTripLocationLon"/>
		<input type="hidden" id="planTripLocationId"/>
		<input type="hidden" id="planTripLocationType"/>
		
	</div>
	<!-- CLONE AREA END -->	
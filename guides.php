	<div id="panelGuides" class="panel hide">
		<div style="background:url('/img/panel01.png');height: 75px;text-align:center;">
			<br>
			<span class="panelTopLabel"><?php echo _lang("Guides"); ?></span>
		</div>
		<div id="panelGuideList">
		  
		  <?php 
		  $sql="select * from ua_guide";
		  $guideList=$db->queryArray($sql);
		  for($j=0; $j< count($guideList); $j++)
		  {
		  	
		  ?>
			<div id="panelGuideItem" >
				<div id="panelGuideItemParent" onclick="onClickPanelGuideItem( this )">
					<div class="floatleft marginLeft10" style="margin-top: 9px;"><i id="panelGuideItemimage" class="icon-chevron-right"></i></div>
					<h5 style="margin-left:10px;"  class="floatleft marginLeft10"><?php echo $guideList[$j]['ua_guide_title'];?></h5>				
					<i class="icon-ok floatright marginRight10" id="topLevelMenu"></i>
				</div>	
				<div id="panelGuideItemList" class="hide">
				   <div id="panelGuideItemBucketHeader"> 
						<div  class= "floatleft marginLeft10 "><i class=" icon-map-marker icon-white" style="background-position: -24px -72px;"></i></div>
						<h6 style="color: white; margin:auto;">&nbsp; <?php echo _lang("BUCKET LIST"); ?></h6>			
					</div>
					<div id="panelGuideItemBucketList">
						<?php 
							  $sql="select * from ua_guide_bucket where ua_guide='".$guideList[$j]['ua_guide']."' ";
							  $bucketList=$db->queryArray($sql);
							  for($i=0; $i<count($bucketList); $i++){
						?>
					 		<div id="panelGuideItemBucketItem" style="padding-left:35px;" onclick="onClickBucketItem(this)">
					 			<?php echo _lang($bucketList[$i]['ua_bucket_title']);?>
					 			<i class="icon-ok floatright marginRight10 hide"></i>
					 			<input type="hidden" id="guideBucketId" value="<?php echo $bucketList[$i]['ua_guide_bucket'];?>"/> 
					 		</div>
					 	<?php }?>
				 	</div>
				 	
				 	<div id="panelGuideItemTripHeader"> 
						<div  class= "floatleft marginLeft10 "><i class=" icon-print icon-white"></i></div>
						<h6 style="color: white; margin:auto;">&nbsp; <?php echo _lang("Trip LIST"); ?></h6>			
				   </div>
				   <div id="panelGuideItemTripList">
					 	<?php 
						  	$sql="select * from ua_guide_trip  where ua_guide='".$guideList[$j]['ua_guide']."'";
						  	$tripList=$db->queryArray($sql);
						  	for($i=0; $i<count($tripList); $i++){
					  	?>
				 		 	<div id="panelGuideItemTripItem" style="padding-left:35px;" onclick="onClickTripItem(this)">
				 		 		<?php echo _lang($tripList[$i]['ua_trip_title']);?>
				 		 		<i id="tripSelectMark" class="icon-ok floatright marginRight10 hide"></i>
					 			<input type="hidden" id="guideTripId" value="<?php echo $tripList[$i]['ua_guide_trip'];?>"/>
				 		 	</div>
				 		<?php }?>
				 	</div>
				</div>		
				
			</div>
		<?php }?>
			

		</div>					
	</div>
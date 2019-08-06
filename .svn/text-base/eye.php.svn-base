<div id="panelEye" class="panel hide">

	<div style="background:url('/img/panel_eye.png');height: 75px;text-align:center;">

		<br>

		<span class="panelTopLabel">Ukraine-1</span>

	</div>

	<div id="panelEyeList">

		<?php 

			$sql = "select * from ua_eye_category order by ua_title";

			$categoryList = $db->queryArray($sql);

			for ( $i = 0 ; $i < count($categoryList); $i++ ){

		?>

			<a class="js-display" href="<?php echo "/eyeCategory/".str_replace(" ", "-", UA_translateEn($categoryList[$i]['ua_title']) )."/".base64_encode($categoryList[$i]['ua_eye_category'])?>">

				<div id="panelEyeItem" onclick="onClickPanelEyeItem( this )" data="<?php echo $categoryList[$i]['ua_eye_category'];?>">

					<h5 id="eyeCategoryTitle" class="floatleft"><?php echo _lang($categoryList[$i]['ua_title']);?></h5>

					<div id="findplacesiconback"><img class="floatright" src="<?php echo $categoryList[$i]['ua_category_image'];?>" style="width: 49px; height: 49px;"/></div>

					<div class="floatright hide" id="eyeCount">0</div>

					<div class="clearboth"></div>

				</div>

			</a>		

		<?php }?>	
		<div id="panelFindPlacesItem">
			<a style="display:block" onclick="onOpenRightBarEye()">
			<div id="panelFindPlacesItemParent" >
				<div id="panelFindCategoryTitle">
					<div class="floatleft marginLeft10" style="margin-top: 14px;" >
						<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>
					</div>
					<h5 style="margin-left:10px; margin-top: 15px; text-transform: uppercase;"  class="floatleft marginLeft10" ><?php echo _lang("Open Eye List");?></h5>		
				</div>
			</div>
			</a>
		</div>	

	</div>

</div>
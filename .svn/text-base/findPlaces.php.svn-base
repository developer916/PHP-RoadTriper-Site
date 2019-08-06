	<div id="panelFindPlaces" class="panel hide">

		<div style="background:url('/img/panel02.png');height: 75px;text-align:center;">

			<br>

			<span class="panelTopLabel">Україна-1</span>

		</div>

					

		<div id="panelFindPlacesList">

			<div id="panelFindPlacesListOverlay" class="hide"></div>

			 <div id="panelFindPlacesItem">

				<div id="panelFindPlacesItemParent"  >

					<div id="panelFindCategoryTitle" onclick="onClickPanelFindPlacesItem(this)">	

						<div class="floatleft marginLeft10" style="margin-top: 14px;" >

							<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>

						</div>

						<h5 style="font-family: 'Lobster', cursive; font-size: 18px; font-weight: 100; margin-left:10px; margin-top: 15px;"  class="floatleft marginLeft10" ><?php echo _lang("Saved Places");?></h5>	

					</div>			

					<div class="floatright" onclick="onClickFindMainCategory( this );">

						<a class="marginRight10" id="SubCategoryCheckCount" onclick="onCountFindSubCategory(this)"><i id="findPlacesAllcheck" class="icon-ok"></i></a>

						<div id="findplacesiconback"><img src="/img/savedPlaces.png" style="width: 49px; height: 49px;"></div>

					</div>

				</div>	

				<div id="panelFindPlacesItemList" class="hide" onclick="fnBucketList(-1)">

					<div id="panelFindPlacesItemListItem" style = "color:rgb(88, 214, 88);"><?php echo _lang("+ Creat New Bucket List");?> 				

						<div id="findCountPlaces" class="floatright hide" >0</div>

						<i id="findPlacesCheck"  class=" icon-ok floatright hide"></i>

					</div>

				</div>

				

				<?php 

					if($isLogin == "Y"){

						$findPlacesUaUserId = UA_getCookie("UA_USER");

				?>

				  <input type="hidden" id="findPlacesUaUserId" value="<?php echo $findPlacesUaUserId;?>">

				<?php 

						$sql = "select * from ua_user_bucket where ua_user = $findPlacesUaUserId";

						$dataBucketList = $db->queryArray( $sql );

						for( $i = 0 ; $i < count($dataBucketList); $i ++ ){

				?>

					

				<div id="panelFindPlacesItemList" class="hide" onclick="onClickFindLocationItem(this)">

					<div id="panelFindPlacesItemListItem" ><?php echo _lang($dataBucketList[$i]['ua_bucket_title']);?>

						<input type="hidden" id="findPlacesUaBucketId" value="<?php echo $dataBucketList[$i]['ua_user_bucket']; ?>">

						

						<i id="findPlacesBucketItem" title="Delete bucket list" class="icon-trash floatright" onclick="onDeleteBucketItem(this, event)"></i>

						<div id="findCountPlaces" class="floatright hide" >0</div>

						<i id="findPlacesCheck"   class=" icon-ok floatright hide"></i>

					</div>

				</div>			

			<?php 

					}

				}

			 ?>

			 		

			</div>

		<?php 

			$sql1 = "select * from ua_place_category order by ua_name";

			$row1 = $db->queryArray($sql1);

			

			for ($i = 0 ; $i < count($row1) ; $i ++)

			{	

		?>

			<a class="js-display" href="<?php echo "/group/".str_replace(" ", "-", UA_translateEn($row1[$i]['ua_name']))."/".base64_encode($row1[$i]['ua_place_category']);?>">

				<div id="panelFindPlacesItem">

					<div id="panelFindPlacesItemParent"  >

						<div id="panelFindCategoryTitle" onclick="onClickPanelFindPlacesItem(this)">

							<input type="hidden" id="placeCategory" value="<?php echo $row1[$i]['ua_place_category']?>">

							<div class="floatleft marginLeft10" style="margin-top: 14px;" >

								<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>

							</div>

							<h5 style="margin-left:10px; margin-top: 15px;"  class="floatleft marginLeft10" ><?php echo _lang($row1[$i]['ua_name']);?></h5>	

						</div>			

						<div class="floatright" onclick="onClickFindMainCategory( this );">

							<a class="marginRight10" id="SubCategoryCheckCount"><i class="icon-ok" id="findPlacesAllcheck"></i></a>

							<div id="findplacesiconback"><img src="<?php echo $row1[$i]['ua_category_image']?>" style="width: 49px; height: 49px;"></div>

						</div>

					</div>	

					<?php 	

						$sql2 = "select * from ua_place_subcategory where ua_place_category = '".$row1[$i]['ua_place_category']."' order by ua_name";

		 				$row2 = $db->queryArray($sql2);

		 				for ($ii = 0 ; $ii < count($row2) ; $ii ++)

		 				{

						?>

						<a class="js-display" style="text-decoration:none;" href="<?php echo "/places/".str_replace(" ", "-", UA_translateEn($row2[$ii]['ua_name']))."/".base64_encode($row2[$ii]['ua_place_subcategory']);?>">

							<div id="panelFindPlacesItemList" class="hide" onclick="onClickFindLocationItem(this)">

								<div id="panelFindPlacesItemListItem"><?php echo _lang($row2[$ii]['ua_name']);?>

								<input type="hidden" id="placeSubCategory" value="<?php echo $row2[$ii]['ua_place_subcategory']?>">

								<input type="hidden" id="placeCategory" value="<?php echo $row1[$i]['ua_place_category']?>"> 

									<div id="findCountPlaces" class="floatright hide" >0</div>

									<i id="findPlacesCheck"  class=" icon-ok floatright hide"></i>

								</div>

							</div>

						</a>

					<?php }?>

				</div>

			</a>

		<?php 

			

			}

		?>

		<div id="panelFindPlacesItem">

		<a style="display:block" class="js-link" href="/addPlace">

		<div id="panelFindPlacesItemParent"  >

		<div id="panelFindCategoryTitle">

		<div class="floatleft marginLeft10" style="margin-top: 14px;" >

								<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>

							</div>

		<h5 style="margin-left:10px; margin-top: 15px; text-transform: uppercase;"  class="floatleft marginLeft10" ><?php echo _lang("Add Place");?></h5>		

		</div>

		<div class="floatright" onclick="onClickFindMainCategory( this );">

		<div id="findplacesiconback"><img style="width: 49px; height: 49px;" src="/img/category/addplaceicon.png"></div>

		</div>

		</div>

		</a>

		</div>

		<div id="panelFindPlacesItem" style="background: #fff;">
			<a style="display:block" onclick="onOpenRightBarPlace()">
			<div id="panelFindPlacesItemParent" >
				<div id="panelFindCategoryTitle">
					<div class="floatleft marginLeft10" style="margin-top: 14px;" >
						<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>
					</div>
					<h5 style="margin-left:10px; margin-top: 15px; text-transform: uppercase;"  class="floatleft marginLeft10" ><?php echo _lang("Open Places List");?></h5>		
				</div>
			</div>
			</a>
		</div>


		</div>			

	</div>

	

<!-- 	clone start		 -->

				<div id="clonePanelFindPlacesItemList" class="hide" onclick="onClickFindLocationItem(this)">

					<div id="panelFindPlacesItemListItem" >

						<span id="findPlacesBucketName"></span>

						<input type="hidden" id="findPlacesUaBucketId" >

						

						<i id="findPlacesBucketItem" title="Delete bucket list" class="icon-trash floatright" onclick="onDeleteBucketItem(this, event)"></i>

						<div id="findCountPlaces" class="floatright hide" >0</div>

						<i id="findPlacesCheck"   class=" icon-ok floatright hide"></i>

					</div>

				</div>			

<!-- 	clone end -->



	
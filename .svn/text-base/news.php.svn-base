<div id="panelNews" class="panel hide">

	<div style="background:url('/img/news_panel.png');height: 75px;text-align:center;">

		<br>

		<span class="panelTopLabel">Украина-1</span>

	</div>



	<div id="newsDatePanel">		

		<div style="padding: 10px;">

			<i class="icon-time icon-blue"></i>&nbsp;&nbsp;<span style="font-weight:bold;color:#359FE6;"><?php echo _lang("Date"); ?></span>	

		</div>

		<div style="margin-left: 10px;">

			<input type="text" id="newsStartDate" class="floatleft" placeholder = "<?php echo _lang('Start Date'); ?>" readonly/>

			<input type="text" id="newsEndDate" class="floatleft" placeholder = "<?php echo _lang('End Date'); ?>" readonly/>

			<a class="btn btn-info btn-mini btn-rectangle" id="btnNewsDateSearch" onclick="onClickNewsSearch()"><?php echo _lang("Search");?></a>

			<a class="btn btn-danger btn-mini btn-rectangle" id="btnNewsDateReset" onclick="onClickNewsReset()"><?php echo _lang("Clear");?></a>

			<div class="clearboth"></div>							

		</div>

	</div>	

	<div id="newsAnalytics">

	<a class="js-link" id="btnNewsAnalystics" href="/newsAnalytics">

	<div id="btnNewsGraphs">

	<?php echo _lang("News Analytics");?>

	</div>

	</a>

	<a class="js-link" id="btnNewsAnalystics" href="/blogs/category/Nw==" data="7">

	<div id="btnNewsReports">

	<?php echo _lang("News Graphs");?>

	</div>

	</a>

	</div>

	<div id="panelNewsList">

		<div id="panelNewsListOverlay" class="hide"></div>

		<?php 

			$sql = "select * from ua_news_category order by ua_title";

			$categoryList = $db->queryArray($sql);

			for ( $i = 0 ; $i < count($categoryList); $i++ ){	

		?>

			<a class="js-display" href="<?php echo "/newsCategory/".str_replace(" ", "-", UA_translateEn($categoryList[$i]['ua_title']) )."/".base64_encode($categoryList[$i]['ua_news_category'])?>">

				<div id="panelNewsItem" onclick="onClickPanelNewsItem( this )" data="<?php echo $categoryList[$i]['ua_news_category'];?>">

				<div class="floatleft marginLeft10" style="margin-top: 14px;" >

							<i class="icon-ok" id="findPlacesAllcheck"></i>

						</div>

					<h5 id="newsCategoryTitle" class="floatleft"><?php echo _lang($categoryList[$i]['ua_title']);?></h5>

					<div id="findnewsiconback"><img class="floatright" src="<?php echo $categoryList[$i]['ua_category_image'];?>" style="width: 49px; height: 49px;"/></div>

					<div class="floatright hide" id="newsCount">0</div>

					<div class="clearboth"></div>

				</div>

			</a>

		<?php }?>
		<div id="panelFindPlacesItem" style="background: #EEEEEE;">
			<a style="display:block" onclick="onOpenRightBarNews()">
			<div id="panelFindPlacesItemParent" >
				<div id="panelFindCategoryTitle">
					<div class="floatleft marginLeft10" style="margin-top: 14px;" >
						<i id="panelFindPlacesItemParentImage" class="icon-chevron-right"></i>
					</div>
					<h5 style="margin-left:10px; margin-top: 15px; text-transform: uppercase;"  class="floatleft marginLeft10" ><?php echo _lang("Open News List");?></h5>		
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

			<div id="findCountPlaces" class="floatright hide" ><?php echo _lang("Count");?></div>

			<i id="findPlacesCheck"   class="icon-ok floatright hide"></i>

		</div>

	</div>			



	<div id="clonePanelNewsItemParent" onclick="onClickPanelNewsItem( this )" class="hide">

		<div class="floatleft marginLeft10" style="margin-top: 9px;"><i id="panelNewsItemimage" class="icon-chevron-right"></i></div>

		<h5 id="newsCategoryTitle" class="floatleft marginLeft10"></h5>

		<div class="floatright hide" id="newsCount">0</div>

		<div class="clearboth"></div>

	</div>

	

	<div id="clonePanelNewsItemChildItem" onclick="onClickPanelNewsItemChildItem( this )">

	</div>

	<div id="clonePanelNewsItemChildList" class="hide">

	</div>	

<!-- 	clone end -->
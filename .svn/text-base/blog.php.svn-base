	<div id="panelBlog" class="panel hide">
		<div style="background:url('/img/panel02.png');height: 75px;text-align:center;">
			<br>
			<span class="panelTopLabel"><?php echo _lang("Blog");?></span>
		</div>
		<div id="blogCategoryPanel">
			<div style="padding: 10px;">
				<i class="icon-list-alt icon-blue"></i>&nbsp;&nbsp;<span style="font-weight:bold;color:#359FE6;"><?php echo _lang("CATEGORIES");?></span>	
			</div>
			<div style="padding-bottom:10px;">
				<a href="/blogs/category/all" id="blogCategoryAll" class="btnBlogCategory js-link" style="width: 100%; margin: 0px;"><?php echo _lang("ALL");?></a>
				<div id="blogCategoryList">
					<?php
						$sql = "select * from ua_blog_category order by ua_title";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count( $result ); $i ++ ){
					?>
						<a href="/blogs/category/<?php echo base64_encode($result[$i]['ua_blog_category'])?>" id="blogCategoryItem" class="btnBlogCategory js-link" data="<?php echo $result[$i]['ua_blog_category'];?>"><?php echo _lang($result[$i]['ua_title']);?></a>				
					<?php } ?>
				</div>
			</div>
		</div>
	</div>
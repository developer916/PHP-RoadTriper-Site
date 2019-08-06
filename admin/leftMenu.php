		<div id="leftMenu" class="floatleft">
			<ul class="nav nav-list bs-docs-sidenav">
				<?php
				$adminId = $_SESSION['UA_ADMIN_USER'];
				$sql = "select ua_menu from ua_user_menu where ua_user = $adminId";
				$menuList = $db->queryArray( $sql );
				$menuIds = array();
				for( $i = 0; $i < count($menuList); $i ++ ){
					$menuIds[$i] = $menuList[$i]['ua_menu'];
				}
				?>
				<li class='hide'>FIRST</li>
				<?php if( in_array( 1, $menuIds )){?><li class='<?php if($pageType == "1") echo "active";?>'><a href="userList.php">User Management</a></li><?php }?>
				<?php if( in_array( 2, $menuIds )){?><li class='<?php if($pageType == "2") echo "active";?>'><a href="categoryList.php">Place Category Management</a></li><?php }?>
				<?php if( in_array( 3, $menuIds )){?><li class='<?php if($pageType == "3") echo "active";?>'><a href="guideList.php">Guide Management</a></li><?php }?>
				<?php if( in_array( 4, $menuIds )){?><li class='<?php if($pageType == "4") echo "active";?>'><a href="locationList.php">Location Management</a></li><?php }?>
				<?php if( in_array( 5, $menuIds )){?><li class='<?php if($pageType == "5") echo "active";?>'><a href="blogCategoryList.php">Blog Category Management</a></li><?php }?>
				<?php if( in_array( 6, $menuIds )){?><li class='<?php if($pageType == "6") echo "active";?>'><a href="blogList.php">Blog Management</a></li><?php }?>
				<?php if( in_array( 7, $menuIds )){?><li class='<?php if($pageType == "7") echo "active";?>'><a href="settingList.php">Setting Management</a></li><?php }?>
				<?php if( in_array( 8, $menuIds )){?><li class='<?php if($pageType == "8") echo "active";?>'><a href="pageList.php">Page Management</a></li><?php }?>
				<?php if( in_array( 9, $menuIds )){?><li class='<?php if($pageType == "9") echo "active";?>'><a href="notificationList.php">Notification Management</a></li><?php }?>
				<?php if( in_array( 10, $menuIds )){?><li class='<?php if($pageType == "10") echo "active";?>'><a href="newsCategoryList.php">News Category Management</a></li><?php }?>
				<?php if( in_array( 11, $menuIds )){?><li class='<?php if($pageType == "11") echo "active";?>'><a href="newsList.php">News Management</a></li><?php }?>
				<?php if( in_array( 12, $menuIds )){?><li class='<?php if($pageType == "12") echo "active";?>'><a href="regionList.php">Region Management</a></li><?php }?>
				<?php if( in_array( 13, $menuIds )){?><li class='<?php if($pageType == "13") echo "active";?>'><a href="eyeCategoryList.php">Eye Category Management</a></li><?php }?>
				<?php if( in_array( 14, $menuIds )){?><li class='<?php if($pageType == "14") echo "active";?>'><a href="eyeList.php">Eye Management</a></li><?php }?>
				<?php if( in_array( 15, $menuIds )){?><li class='<?php if($pageType == "15") echo "active";?>'><a href="commentList.php">Comment Management</a></li><?php }?>
				<?php if( in_array( 16, $menuIds )){?><li class='<?php if($pageType == "16") echo "active";?>'><a href="permissionList.php">Permission Management</a></li><?php }?>				
				<li class='hide'>LAST</li>
			</ul>
		</div>
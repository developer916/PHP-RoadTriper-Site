	<?php
		$sql="select ifnull(max(ua_notification),0) ua_notification from ua_notification";
		$row = $db->queryArray($sql); 
		$lastNotificationId = $row[0]['ua_notification'];
	?>	
	<input type="hidden" id="lastNotificationId" value="<?php echo $lastNotificationId?>"/>
	<div id="notificationList"></div>

	<div id="cloneNotificationItem" class="hide" onclick="onClickNotificationItem(this)">
		<div id="notificationContent"><span id="spanNotification"></span></div>
		<div id="closeNotificationPanelItem"><a onclick="onRemoveNotification(this)" style="color: white;">x</a></div>
		<input type="hidden" id="notificationTime">
		<input type="hidden" id="notificationId">
		<div class="clearboth"></div>
	</div>			
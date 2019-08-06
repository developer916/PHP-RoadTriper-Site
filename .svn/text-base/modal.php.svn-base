	<div id="modal-signIn" class="modal modal-game hide">
	<div id="LogoSignIn">
		<img style="width: 90px; height: 90px;" src="/img/LogoSignIn.png">
		</div>
        <div class="modal-body" style="max-height: 750px; padding-top: 44px;">
            <h4 style="font-size: 29.5px; font-family: 'Lobster', cursive; text-align: center; padding-bottom: 15px;"><?php echo _lang("Ukraine-1")?></h4>
            
            <p class="labelWarning" id="signInWarning"></p>
            <p style="padding-left: 23px;">
            	<input type="text" id="signInUsername" style="width: 85%;" placeholder = "<?php echo _lang("Enter Username")?>"/>
            </p>
            <p style="padding-left: 23px;">
            	<input type="password" id="signInPassword" style="width: 85%;" placeholder = "<?php echo _lang("Enter Password")?>" onkeyup="onKeyUpSignInPassword( event )"/>
            </p>
			<p style="margin: auto; width: 120px;">
	            <a id="locationInfoBtnSend" class="btn btn-primary" style="padding: 10px 40px; text-transform: uppercase;"  onclick="onSignInSubmit()"><?php echo _lang("Sign In")?></a>         			
			</p>
			<div class="clearboth"></div>
			<hr style="margin: 5px 0 20px;">
			<div style="text-align:center;">
				<p><a onclick="onFacebookLogin()"><img src="/img/signInFB.png"/></a></p>
                <div id="btnGoogleLogin" style="background:url('/img/signInGP.png');margin:0px auto;width: 207px;height:37px;cursor:pointer;"> 
                	<span class="icon"></span>
                </div>
                <div style="margin-top:10px;"><a id="btnVkLogin" onclick="VK.Auth.login(onVkLogin);"><img src="/img/signInVK.png"/></a></div>        				
			</div>
        </div>
    </div> 
    	
    <div id="modal-signUp" class="modal modal-game hide">
        <div class="modal-body" style="max-height: 750px;">
            <h4><?php echo _lang("User Sign Up")?></h4>
            
            <p class="labelWarning" id="signUpWarning"></p>
            <p>
            	<input type="text" id="signUpUsername" style="width: 96%;" placeholder = "<?php echo _lang("Enter Username")?>"/>
            </p>
            <p>
            	<input type="password" id="signUpPassword" style="width: 96%;" placeholder = "<?php echo _lang("Enter Password")?>"/>
            </p>
            <p>
            	<input type="text" id="signUpEmail" style="width: 96%;" placeholder = "<?php echo _lang("Enter Email Address")?>"/>
            </p>
            
			<div id="signUpCaptchaArea" class="floatleft">
				<div id="signUpCaptchaCode" class="floatleft" unselectable="on"><?php echo UA_generateRandom(7); ?></div>
				<i class="icon-refresh floatleft pointer" onclick="onReloadSignUpCaptcha()"></i>
				<input id="signUpCaptchaInput" class="floatleft" type="text">
				<div class="clearboth"></div>
			</div>
				            
			<p class="floatright">
	            <a class="btn btn-primary"  onclick="onSignUpSubmit()"><?php echo _lang("Sign Up")?></a>
	            &nbsp;&nbsp;&nbsp;
	            <a class="btn btn-danger"  onclick="onSignUpClose()"><?php echo _lang("Close")?></a>			
			</p>
			<div class="clearboth"></div>                        
        </div>
    </div>

    <div id="modal-profile" class="modal modal-game <?php if( $pageType != "profile" ) echo "hide"; ?>">
        <div class="modal-body" style="max-height: 750px;">
            <h4>User Profile</h4>
            
            <p class="labelWarning" id="signUpWarning"></p>
            <p>
            	<input type="text" id="profileUsername" style="width: 96%;" placeholder = "<?php echo _lang("Enter Username")?>" value="<?php echo $dataUser[0]['ua_username']?>"/>
            </p>
            <p>
            	<input type="text" id="profileEmail" style="width: 96%;" placeholder = "<?php echo _lang("Enter Email Address")?>" value="<?php echo $dataUser[0]['ua_email']?>"/>
            </p>            
            <p>
            	<input type="password" id="profilePassword" style="width: 96%;" placeholder = "<?php echo _lang("Enter Password")?>"/>
            </p>
            
            <div>
				<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
					<div id="previewProfileImage" class="previewImage" style="margin-right: 20px;">
						<img src="<?php echo $dataUser[0]['ua_photo'];?>" style="width:100%;height: 100%;"/>
					</div>				
					<input type="file" name="imageUpload" id="imageUpload"/>
					<input type="hidden" name="uploadType" value="profile">
					<input type="hidden" id="imagePrevDiv" value="previewProfileImage">
				</form>            
            </div>
			<div class="clearboth"></div>
			            
			<p class="floatright">
	            <a class="btn btn-primary"  onclick="onProfileSubmit()"><?php echo _lang("Save")?></a>
	            &nbsp;&nbsp;&nbsp;
	            <a class="btn btn-danger"  onclick="onProfileClose()"><?php echo _lang("Close")?></a>			
			</p>
			<div class="clearboth"></div>  
			<label class="floatleft marginRight10" style="height:30px; line-height: 30px;"><?php echo _lang("Deposit money on my account.");?></label>
			<input id="profileDepositAmount" type="text" placeholder="<?php echo _lang("Deposit Amount");?>" class="floatleft" style="width:120px;margin-right:5px;text-align:center;">
			<div class="floatleft" style="height:30px; line-height: 30px;font-weight:bold;">$</div>
			<div class="clearboth"></div>
			<div class="floatleft" id="divProfileCurrentAmount" ><?php echo _lang("Current Amount")?> : <?php echo "$".$dataUser[0]['ua_balance_amount']?></div>
			<button id="profileBtnDeposit" class="btn btn-success floatright" onclick="onAccountDeposit()"><?php echo _lang("Deposit")?></button>
			<div class="clearboth"></div>
        </div>
    </div>
        
    <div id="modal-planTrip" class="modal modal-game hide">
        <div class="modal-body" style="max-height: 750px;">
        	<button type="button" class="close" data-dismiss="modal" onclick="onClosePlanTripPopup()">&times;</button>
			<h4><?php echo _lang("Save Plan Trip")?></h4>
            <p>
            	<input type="text" id="txtPlanTripTitle" placeholder = "<?php echo _lang("Trip Title")?>" style="width: 96%;"/>
            </p>
            <p>
				<textarea id="txtPlanTripDescription" placeholder = "<?php echo _lang("Trip Description")?>" style="width: 96%;" rows="7"></textarea>
            </p>
            <input type="hidden" id="txtPlanTripPageTitle">
            <p style="text-align:center;">
            	<a onclick="onSavePlanTripSubmit()" class="btn btn-primary"><?php echo _lang("Save")?></a>
            	&nbsp;&nbsp;&nbsp;
            	<a onclick="onClosePlanTripPopup()" class="btn btn-danger"><?php echo _lang("Close")?></a>
            </p>
        </div>
    </div>
    
    <div id="modal-tripList" class="modal modal-game hide">
        <div class="modal-body" style="max-height: 750px;">
			<button type="button" class="close" data-dismiss="modal" onclick="onCloseTripList()">&times;</button>
			<h4><?php echo _lang("Trip List")?></h4>
            <div id="modalTripList">
							
            </div>
        </div>
    </div>          
    
    <div id="modal-bucketList" class="modal modal-game hide">
        <div class="modal-body" style="max-height: 750px;">
			    <button type="button" class="close" data-dismiss="modal" onclick="onCloseBucketList()">&times;</button>
			    <h4><?php echo _lang("Bucket List")?></h4>
            <p>
            	<input type="text" id="txtBucketName" placeholder = "Enter Bucket Name"/>
            	<button class="btn btn-primary btn-small" style="margin-top: -11px;" onclick="onClickAddBucketSubmit()"><?php echo _lang("Add Bucket")?></button>
            </p>
            <input type="hidden" id="locationIdBucket"/>
            <div id="modalBucketList">

            </div>
        </div>
    </div>
    
    <div id="modal-shareLink" class="modal modal-game hide">
    	<div class="modal-body" style="max-height: 750px;">
    		<button type="button" class="close" data-dismiss="modal" onclick="onCloseShareLink()">&times;</button>
    		<h4><?php echo _lang("Share Trips")?></h4>
    		<div>
    			<div>
	    			<span><?php echo _lang("Share URL")?> : </span>
	    			<input type="text" readonly id="txtShareURL" value=""/>
    			</div>
    			<div class="floatright">
    				<div>
    					<span><?php echo _lang("Share this on")?>&nbsp;&nbsp;&nbsp;</span>
    					<a href="#" id="shareOnFB" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img src="/img/shareFB.png"></a>
    					<a href="#" id="shareOnGP" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img src="/img/shareGP.png" alt="Share on Google+"></a>
    					<a href="#" id="shareOnVK" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img src="/img/shareVK.png" alt="Share on Google+"></a>
    				</div>
    			</div>
    			<div class="clearboth"></div>
    			<div style="margin-top:10px;">
    				<input type="text" id="shareLinkEmailAddress" placeholder="<?php echo _lang("Enter Email Address")?>"/>
    				<textarea rows="4" id="shareLinkMessage" placeholder="<?php echo _lang("Enter Message")?>"></textarea>
    				<a onclick="onCloseShareLink()" class="btn btn-danger floatright marginRight10"><?php echo _lang("Close")?></a>
    				<a onclick="onSendEmailShareLink()" class="btn btn-primary floatright marginRight10"><?php echo _lang("Send")?></a>
    				<div class="clearboth"></div>
    			</div>
    		</div>
    	</div>
    </div>

	<div class="modal-backdrop fade in <?php if( $pageType != "profile" ) echo "hide"; ?>" id="modalBackground" onclick="fnCloseModal()"></div>
	<!-- div class="modal-backdrop fade in hide" id="modalBackgroundTransparent"></div -->	
	
	<?php $payPalUrl = 'https://'.PAYPAL_SERVER.'/cgi-bin/webscr'; ?>
	<form id="paymentForm" method="post" action="<?php echo $payPalUrl; ?>" class="hide">
		<input type="hidden" name="business" value="<?php echo htmlspecialchars(PAYPAL_BUSINESS); ?>">
		<input type="hidden" name="cmd" value="_xclick">
		<input type="hidden" name="item_name" value="UA-1 Payment">
		<input type="hidden" name="amount" id="amount">
		<input type="hidden" name="invoice" id="invoice" value="<?php echo time()."_".UA_generateRandom(24); ?>">
		<input type="hidden" name="currency_code" id="currency_code" value="USD">
		<input type="hidden" name="notify_url" value="<?php echo "http://".HOST_SERVER."/ipn.php"; ?>">
		<input type="hidden" name="return" id="return" value="<?php echo "http://".HOST_SERVER."/profile"; ?>">
		<input type="hidden" name="cancel_return" value="<?php echo "http://".HOST_SERVER."/failed.php"; ?>">
		<input type="hidden" name="no_shipping" value="1">
		<input type="hidden" name="email">
	</form>	
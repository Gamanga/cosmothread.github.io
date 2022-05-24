"use strict";try{(function(){var XHR_TIMEOUT=10;var ERROR_AUTOHIDE_TIMEOUT=7;var REFMAP_MAX_LINKS=7;var S={'2CH_IS_DOWN':'Двач лежит','2CH_IS_DOWN_OR_NETWORK_ERROR':'Двач лежит, либо нет сети','UNKNOWN_ERROR':'Неизвестная ошибка','VOTE_FAILED':'Голос не засчитан','ARCHIVED_THREAD':'Тред в архиве','ALREADY_VOTED':'Голос уже отдан','MHT_ARCHIVE':'Вы читаете офлайн-архив','LIKE':['лайк','лайка','лайков'],'DISLIKE':['дизлайк','дизлайка','дизлайков'],'POSTS':['пост','поста','постов'],'REPLY':['ответ','ответа','ответов'],'POST_LIKED':'Пост лайкнут','POST_DISLIKED':'Пост дизлайкнут','CLOSE_REPLIES_BRANCH':'Закрыть ветку ответов','SHOW_LINKS':'Показать ссылки на'};var handleUidClick=function me(event){var eventTarget=event.target||event.srcElement;if(!eventTarget.hasAttribute('data-uid')&&!eventTarget.parentElement.hasAttribute('data-uid'))return;var uid=eventTarget.getAttribute('data-uid')||eventTarget.parentElement.getAttribute('data-uid'),uidColor=eventTarget.style.borderColor||eventTarget.parentElement.style.borderColor||eventTarget.style.color,replies=document.getElementsByClassName('reply'),repliesLen=replies.length;for(var i=0;i<repliesLen;i++){if(replies[i].querySelector('[data-uid="'+me.highlightedUid+'"]')){replies[i].className=replies[i].className.replace(/(?:^| )uid-hl(?= |$)/g,'');replies[i].removeAttribute('style');}else if(uid!==me.highlightedUid&&replies[i].querySelector('[data-uid="'+uid+'"]')){replies[i].className+=' uid-hl';replies[i].style.boxShadow=me.currentShadow.replace(/(,\s*)rgb.+?\)/g,'$1'+uidColor);}}
me.highlightedUid=(me.highlightedUid!==uid)?uid:null;}
handleUidClick.highlightedUid=null;handleUidClick.currentShadow=(function(){try{var sheets=document.styleSheets,rules;for(var i=0;i<sheets.length;i++){rules=sheets[i].cssRules;for(var j=0;j<rules.length;j++){if(rules[j].selectorText==='.uid-hl'&&rules[j].style.boxShadow)
return rules[j].style.boxShadow;}}}
catch(e){return 'rgb(255, 107, 0) 0px 0px 1em inset, rgb(255, 107, 0) 0px 0px 0.5em';}})();function showReplyPreview(replyId,x,y){var reply=document.getElementById(replyId);if(!reply)return;var replyPreview=cloneReply(reply);replyPreview.className+=' fast-reply';replyPreview.style.left=x+'px';replyPreview.style.top=y+'px';replyPreview.setAttribute('aria-hidden','true');document.body.appendChild(replyPreview);return replyPreview;}
var highlightReply=function me(replyId){var replyForHighlight=document.getElementById(replyId);if(!replyForHighlight||(' '+replyForHighlight.className+' ').indexOf(' reply ')===-1)return;if(replyForHighlight===document.activeElement||window.location.hash.substring(1)===replyId){replyForHighlight.className+=' double-fake-hl';setTimeout(function(){replyForHighlight.className=replyForHighlight.className.replace(/(?:^| )double-fake-hl(?= |$)/g,'');},750);return;}
replyForHighlight.className+=' fake-hl';clearTimeout(me.replyTimers[replyId]);me.replyTimers[replyId]=setTimeout(function(){replyForHighlight.className=replyForHighlight.className.replace(/(?:^| )fake-hl(?= |$)/g,'');},1500);}
highlightReply.replyTimers=[];function handleThumbsClick(event){}
function handleAnswersClick(event){var eventTarget=event.target||event.srcElement;if((' '+eventTarget.className+' ').indexOf(' ans-lnk ')===-1&&(' '+eventTarget.parentElement.className+' ').indexOf(' ans-lnk ')===-1)return;var answersEl,answersCont=document.createElement('div'),hash,parentReply,answersHider,hiderClickFunction,replyEl;answersEl=eventTarget.parentElement;if((' '+answersEl.className+' ').indexOf(' ans-lnk ')!==-1)
answersEl=answersEl.parentElement;parentReply=answersEl.parentElement;answersEl=answersEl.getElementsByTagName('a');while((' '+parentReply.className+' ').indexOf(' reply ')===-1&&(' '+parentReply.className+' ').indexOf(' thread ')===-1&&(parentReply!=document.body)){parentReply=parentReply.parentElement;}
if(parentReply==document.body)return;if(parentReply.nextElementSibling&&(' '+parentReply.nextElementSibling.className+' ').indexOf(' ans-cont ')!==-1){parentReply.parentElement.removeChild(parentReply.nextElementSibling);return;}
answersCont.className='ans-cont';for(var i=0;i<answersEl.length;i++){if(!answersEl[i].hash)continue;hash=answersEl[i].hash.substr(1);replyEl=document.getElementById(hash);if(replyEl){answersCont.appendChild(cloneReply(replyEl));}}
if(answersCont.childNodes.length==0)return;answersHider=document.createElement('button');answersHider.className='btn-reset ans-hide hand';answersHider.setAttribute('aria-label',S['CLOSE_REPLIES_BRANCH']);hiderClickFunction=function(event){var eventTarget=event.target||event.srcElement;var answersContainer=eventTarget.parentElement;var parentPost=answersContainer.previousElementSibling;if(parentPost.getBoundingClientRect().top<0){var postHeight=parentPost.getBoundingClientRect().bottom-parentPost.getBoundingClientRect().top,viewportHeight=Math.max(document.documentElement.clientHeight,window.innerHeight||0);if(postHeight<viewportHeight*0.7)
parentPost.scrollIntoView();else if(parentPost.getBoundingClientRect().bottom<viewportHeight*0.3)
window.scroll(window.scrollX,window.scrollY+parentPost.getBoundingClientRect().bottom-viewportHeight*0.3);highlightReply(parentPost.id);}
answersContainer.parentElement.removeChild(answersContainer);}
if(answersHider.addEventListener){answersHider.addEventListener('click',hiderClickFunction,false);}else if(answersHider.attachEvent){answersHider.attachEvent('onclick',hiderClickFunction);}
answersCont.appendChild(answersHider);parentReply.parentElement.insertBefore(answersCont,parentReply.nextElementSibling);}
function cloneReply(replyEl){var reply=replyEl.cloneNode(true);reply.id=reply.id+'sub';while(document.getElementById(reply.id)){reply.id=reply.id+'sub';}
var shortPost=reply.getElementsByClassName('short-post')[0],fullPost=reply.getElementsByClassName('full-post')[0],showMoar=reply.getElementsByClassName('show-moar')[0];if(shortPost&&fullPost&&showMoar){shortPost.id='sh'+reply.id;fullPost.id='full'+reply.id;showMoar.id='moar'+reply.id;shortPost.style.display='';fullPost.style.display='none';showMoar.style.display='';showMoar.onclick=(function(shortPost,fullPost){return function(){shortPost.style.display='none';fullPost.style.display='';this.style.display='none';}})(shortPost,fullPost);showMoar.setAttribute('mini:onclick','fold:'+showMoar.id+','+shortPost.id+';'+fullPost.id);}
reply.className=reply.className.replace(/(?:^| )fake-hl(?= |$)/g,'');reply.className=reply.className.replace(/(?:^| )double-fake-hl(?= |$)/g,'');return reply;}
var handleLikesClick=function me(event){var eventTarget=event.target||event.srcElement;if((' '+eventTarget.className+' ').indexOf(' vote-btn ')===-1&&(' '+eventTarget.parentElement.className+' ').indexOf(' vote-btn ')===-1)return;if((' '+eventTarget.className+' ').indexOf(' vote-btn ')===-1){eventTarget=eventTarget.parentElement;}
event.preventDefault?event.preventDefault():event.returnValue=false;var task,board,replyId,replyEl,originReplyEl;replyEl=eventTarget;while((' '+replyEl.className+' ').indexOf(' reply ')===-1&&(' '+replyEl.className+' ').indexOf(' thread ')===-1&&(replyEl!=document.body)){replyEl=replyEl.parentElement;}
if(replyEl==document.body)return;replyId=parseInt(replyEl.id,10);originReplyEl=document.getElementById(replyId);if(!originReplyEl)return;if((' '+originReplyEl.className+' ').indexOf(' proceed ')!==-1)return;showReplyBindedError(replyEl,null);if(isArchived){showReplyBindedError(replyEl,S['ARCHIVED_THREAD']);return;}else if(location.protocol==='file:'||location.protocol==='attachment:'||location.protocol==='mhtml:'){showReplyBindedError(replyEl,S['MHT_ARCHIVE']);return;}else if(isDown){showReplyBindedError(replyEl,S['2CH_IS_DOWN']);return;}else if(originReplyEl.className.indexOf('voted')>-1){showReplyBindedError(replyEl,S['ALREADY_VOTED']);return;}
originReplyEl.className+=' proceed';replyEl.className+=' proceed-spinner';task=((' '+eventTarget.className+' ').indexOf(' likes ')!==-1)?'like':'dislike';board=document.location.pathname.substr(1);board=(board.indexOf('/')!=-1)?board.substr(0,board.indexOf('/')):board;var XHR=((new XMLHttpRequest()).withCredentials!==undefined)?XMLHttpRequest:XDomainRequest;var whatsWithMyVote=function(likesBefore,dislikesBefore,likesAfter,dislikesAfter){var likesBeforeOnPage=parseInt(originReplyEl.getElementsByClassName('qty-likes')[0].innerHTML);var dislikesBeforeOnPage=parseInt(originReplyEl.getElementsByClassName('qty-dislikes')[0].innerHTML);likesBefore=(likesBefore!==null)?parseInt(likesBefore):likesBeforeOnPage;dislikesBefore=(dislikesBefore!==null)?parseInt(dislikesBefore):dislikesBeforeOnPage;likesAfter=(likesAfter!==null)?parseInt(likesAfter):null;dislikesAfter=(dislikesAfter!==null)?parseInt(dislikesAfter):null;var votesBefore=(task==='like')?likesBefore:dislikesBefore;var votesAfter=(task==='like')?likesAfter:dislikesAfter;var successfullyVoted;if(votesBefore===votesAfter){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['VOTE_FAILED']);successfullyVoted=false;}else{originReplyEl.className+=' voted';successfullyVoted=true;}
var likesNow=(likesAfter!==null)?likesAfter:(likesBefore+((task==='like')?1:0));var dislikesNow=(dislikesAfter!==null)?dislikesAfter:(dislikesBefore+((task==='dislike')?1:0));var allElements=document.getElementsByTagName('*'),regExp=new RegExp('^'+replyId);for(var i=0;allElements[i-1]!==originReplyEl;i++){if(regExp.test(allElements[i].id)){allElements[i].getElementsByClassName('qty-likes')[0].innerHTML=likesNow;allElements[i].getElementsByClassName('qty-dislikes')[0].innerHTML=dislikesNow;var likeAriaLabel=allElements[i].getElementsByClassName('likes')[0].getAttribute('aria-label'),dislikeAriaLabel=allElements[i].getElementsByClassName('dislikes')[0].getAttribute('aria-label'),likesNowString=likesNow+' '+getWordByNum(likesNow,S['LIKE']),dislikesNowString=dislikesNow+' '+getWordByNum(dislikesNow,S['DISLIKE']);likeAriaLabel=likeAriaLabel.replace(likesBeforeOnPage+' '+getWordByNum(likesBeforeOnPage,S['LIKE']),likesNowString);dislikeAriaLabel=dislikeAriaLabel.replace(dislikesBeforeOnPage+' '+getWordByNum(dislikesBeforeOnPage,S['DISLIKE']),dislikesNowString);if(successfullyVoted){allElements[i].className+=(' voted-'+task);if(task=='like'){likeAriaLabel=S['POST_LIKED']+', '+likesNowString;dislikeAriaLabel=dislikesNowString;}else{likeAriaLabel=likesNowString;dislikeAriaLabel=S['POST_DISLIKED']+', '+dislikesNowString;}}
allElements[i].getElementsByClassName('likes')[0].setAttribute('aria-label',likeAriaLabel);allElements[i].getElementsByClassName('dislikes')[0].setAttribute('aria-label',dislikeAriaLabel);}}
originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');}
var sendVote=function(likesBefore,dislikesBefore){var xhrPM=new XHR();var xhrHK=new XHR();xhrPM.open('GET','https://2ch.life/api/'+task+'?board='+board+'&num='+replyId,true);xhrHK.open('GET','https://2ch.hk/api/'+task+'?board='+board+'&num='+replyId,true);xhrHK.onload=xhrHK.onerror=xhrPM.onload=xhrPM.onerror=function(){var xhrButThen=new XHR();xhrButThen.open('GET',location.protocol+'//'+location.host+'/api/votes?brd='+board+'&num='+replyId);xhrButThen.onload=function(){var responseText=xhrButThen.responseText;if(responseText==='ERR404'){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['ARCHIVED_THREAD']);isArchived=true;return;}else{var votes;if(votes=/^([\d]+)\|([\d]+)$/g.exec(responseText)){whatsWithMyVote(likesBefore,dislikesBefore,votes[1],votes[2]);}else{whatsWithMyVote(likesBefore,dislikesBefore,null,null);}}}
xhrButThen.ontimeout=xhrButThen.onerror=function(){whatsWithMyVote(likesBefore,dislikesBefore,null,null);}
xhrButThen.timeout=XHR_TIMEOUT*1000;xhrButThen.send(null);}
xhrHK.ontimeout=function(){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['2CH_IS_DOWN_OR_NETWORK_ERROR']);}
xhrPM.ontimeout=function(){xhrHK.send(null);}
xhrHK.timeout=xhrPM.timeout=XHR_TIMEOUT*1000;xhrPM.send(null);}
var xhrAtFirstIWasLike=new XHR();xhrAtFirstIWasLike.open('GET',location.protocol+'//'+location.host+'/api/votes?brd='+board+'&num='+replyId);xhrAtFirstIWasLike.onload=function(){var responseText=xhrAtFirstIWasLike.responseText;if(responseText==='ERR'){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['UNKNOWN_ERROR']);return;}else if(responseText==='ERR404'){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['ARCHIVED_THREAD']);isArchived=true;return;}else if(responseText==='BAD_GATEWAY'){originReplyEl.className=originReplyEl.className.replace(/(?:^| )proceed(?= |$)/g,'');replyEl.className=replyEl.className.replace(/(?:^| )proceed-spinner(?= |$)/g,'');showReplyBindedError(replyEl,S['2CH_IS_DOWN']);return;}else{var votes;if(votes=/^([\d]+)\|([\d]+)$/g.exec(responseText)){sendVote(votes[1],votes[2]);}else{sendVote(null,null);}}}
xhrAtFirstIWasLike.ontimeout=xhrAtFirstIWasLike.onerror=function(){sendVote(null,null);}
xhrAtFirstIWasLike.timeout=XHR_TIMEOUT*1000;xhrAtFirstIWasLike.send(null);}
var showReplyBindedError=function me(replyEl,errorText){var errorEl=replyEl.getElementsByClassName('pst-err')[0],replyId=replyEl.id;if(errorText===null)errorText='';clearTimeout(me.errorTimeouts[replyId]);errorEl.innerHTML=errorText;errorEl.setAttribute('aria-label',errorText);me.errorTimeouts[replyId]=setTimeout(function(){errorEl.innerHTML='';errorEl.removeAttribute('aria-label');},ERROR_AUTOHIDE_TIMEOUT*1000);}
showReplyBindedError.errorTimeouts=[];function getWordByNum(num,wordForms){var lastDigit=num%10,twoLastDigits=num%100;if((twoLastDigits>=11&&twoLastDigits<=14)||(lastDigit>=5&&lastDigit<=9)||lastDigit===0)
return wordForms[2];else if(lastDigit==1)
return wordForms[0];else
return wordForms[1];}
function preventGettingFocusForReplies(event){var clickedReply=event.target||event.srcElement;if((' '+clickedReply.className+' ').indexOf(' reply ')===-1)return;if(window.location.hash.substring(1)!==clickedReply.id)
setTimeout(function(){clickedReply.blur();},1);}
function getRandId(){return Math.random().toString(36).replace(/[^a-z]+/g,'').substr(2,10);}
(function wrapLongRefmaps(){if(!isOperaMini)return;var refmaps=document.getElementsByClassName('ans');if(!refmaps)return;for(var i=0;i<refmaps.length;i++){if(refmaps[i].children.length>REFMAP_MAX_LINKS+1){var replyQty=refmaps[i].children.length-1;var container=document.createElement('div');if(isOperaMini)
container.appendChild(refmaps[i].children[0].cloneNode(true));for(var j=replyQty;j>0;j--){container.appendChild(refmaps[i].children[1]);}
if(!isOperaMini)
container.style.display='none';container.className='om-folded';container.id=getRandId();var button=document.createElement('a');button.className='al hand om-unfolded ll-h';button.id=getRandId();button.setAttribute('aria-label',S['SHOW_LINKS']+' '+replyQty+' '+getWordByNum(replyQty,S['REPLY']));button.setAttribute('aria-role','button');button.setAttribute('mini:onclick','fold:'+button.id+';'+container.id);var likelink=document.createElement('span');likelink.className='likelink';likelink.appendChild(document.createTextNode(replyQty+' '+getWordByNum(replyQty,S['POSTS'])));button.appendChild(likelink);refmaps[i].appendChild(button);refmaps[i].appendChild(container);}}})();if(window.addEventListener){window.addEventListener('load',function(){document.body.addEventListener('click',handleUidClick,false);document.body.addEventListener('click',handleAnswersClick,false);document.body.addEventListener('click',handleLikesClick,false);document.body.addEventListener('click',handleThumbsClick,false);document.body.addEventListener('focus',preventGettingFocusForReplies,true);},false);if(document.readyState){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){document.body.addEventListener('click',handleUidClick,false);document.body.addEventListener('click',handleAnswersClick,false);document.body.addEventListener('click',handleLikesClick,false);document.body.addEventListener('click',handleThumbsClick,false);document.body.addEventListener('focus',preventGettingFocusForReplies,true);},false);}else{document.body.addEventListener('click',handleUidClick,false);document.body.addEventListener('click',handleAnswersClick,false);document.body.addEventListener('click',handleLikesClick,false);document.body.addEventListener('click',handleThumbsClick,false);document.body.addEventListener('focus',preventGettingFocusForReplies,true);}}}else if(window.attachEvent){window.attachEvent('onload',function(){document.body.attachEvent('onclick',handleUidClick);document.body.attachEvent('onclick',handleAnswersClick);document.body.attachEvent('onclick',handleLikesClick);document.body.attachEvent('onclick',handleThumbsClick);document.body.attachEvent('onfocusin',preventGettingFocusForReplies);});}else if(document.addEventListener){document.addEventListener('load',function(){document.body.addEventListener('click',handleUidClick,false);document.body.addEventListener('click',handleAnswersClick,false);document.body.addEventListener('click',handleLikesClick,false);document.body.addEventListener('click',handleThumbsClick,false);document.body.addEventListener('focus',preventGettingFocusForReplies,true);},false);}else{(new Image(1,1)).src='../jslog?m='+encodeURIComponent('Can\'t add Event Listener');}})();}
catch(e){(new Image(1,1)).src='../jslog?m=name%20'+encodeURIComponent(e.name)+'%20mess%20'+encodeURIComponent(e.message)+(e.stack?('%20stack%20'+encodeURIComponent(e.stack)):'');if(Object.prototype.toString.call(window.opera)==="[object Opera]"&&location.protocol==='attachment:'){console.log('Name\n'+e.name+'\nMessage\n'+e.message+'\nStack\n'+e.stack);}}
$(function(){
  include(); //header,footer
  fn_scrollGap(); //스크롤바 여백
  fn_filter(); //차량 검색 필터
  //fn_slideW(); //가로 슬라이드 스크롤
  fn_sildeH(); //세로 슬라이드 스크롤
  fn_programList(); // 프로그램 목록
  fn_layerPop(); //레이어팝업

  $(window).resize(function () {
  });
});

$(window).on('load', function(){
  //fn_scrollGap();
});

//header,footer
const include = function(){
  $('[data-include]').each(function(){
    const target = $(this);
    const href = target.data('include');
    
    target.load(href,function(){
      target.removeAttr('data-include');
    })
  });
};


//스크롤바 여백
function fn_scrollGap() {
  //(function($) {
    $.fn.hasScrollBar = function() {
      return this.get(0).scrollHeight > this.innerHeight();
    }
  //})($);

  // 스크롤바가 있을 경우 우측 여백
  if($('.programList > ul').length) {
    //console.log(0);
    $('.programList > ul').each(function(){
      if($(this).hasScrollBar()){
        $(this).children().css('margin-right','2rem'); 
      } 
    });
  }

  if($('.scrollWarp').length) {
    //console.log(1);
    $('.scrollWarp').each(function(){
      if($(this).hasScrollBar()){
        $(this).children().css('margin-right','2rem'); 
      } 
    });
  }
}


//차량 검색 필터
function fn_filter() {
  $(document).on('click','.filterBox button',function(){
    $(this).addClass('on').siblings().removeClass('on');
    
    if(!$(this).hasClass('all')){
      console.log(0);
      $(this).parent().next('.seriesBox').show();
    } else {
      $(this).parent().next('.seriesBox').hide();
    }
  });

  $(document).on('click','.seriesBox .swiper-slide',function(){
    $(this).addClass('on').siblings().removeClass('on');
  });
}


//슬라이드 탭
function fn_slideW() {
	if ($('.slideW').length) {
    $('.slideW').each(function(){
      const $this = $(this);
      let li = $this.find('ul li');
      let w = $this.find('>ul').outerWidth(); 
      let totalWidth = 0;
      li.each(function(){
        totalWidth += $(this).outerWidth(true);
      }) //li 넓이 총합
      totalWidth = Math.floor(totalWidth);

      // 클릭 버튼
      tabCheck($this.find('.on a'),true);
      $this.find('a').on('click',function(){
        tabCheck($(this));
      });

      //좌우 스크롤시 양쪽 블러 발생
      sclslideTab();
      $this.find('>ul').scroll(function(){
        sclslideTab();
      });

      function tabCheck(t,motion){
        const target = $this.find('ul');
        t.parent().addClass('on').siblings().removeClass('on');
        
        let tabL = target.offset().left;
        let offsetL = target.find('.on').offset().left - tabL;
        let sclL = target.scrollLeft();
        let gapL = parseInt(li.first().css('margin-left'));
        if(motion){
          //true : 최초로딩
          target.scrollLeft(offsetL + sclL - gapL);
        }else{
          //false : 클릭
          target.stop().animate({scrollLeft: offsetL + sclL - gapL}, 300);
        }
      }

      function sclslideTab(){
        let sclL = $this.find('>ul').scrollLeft();
        $this.addClass('before after');
        if($this.find('ul').scrollLeft() == 0){// 스크롤이 0일 때
          //console.log('스크롤 처음');
          $this.removeClass('before');
        }
        if(sclL + w >= totalWidth){
          //console.log('스크롤 끝');
          $this.removeClass('after');
        }
      }
    })
	} 
}

//세로 슬라이드 스크롤
function fn_sildeH() {
  if ($('.sildeH').length) {
    $('.sildeH').each(function(){
      const $this = $(this);
      let li = $this.find('ul li');
      let h = $this.find('>ul').outerHeight();
      let totalHeight = 0;
      li.each(function(){
        totalHeight += $(this).outerHeight(true);
      }) //li 높이 총합
      totalHeight = Math.floor(totalHeight);

      // 클릭 버튼
      //topCheck($this.find('.on a'),true);
      $this.find('a').on('click',function(){
        topCheck($(this));
      });

      //스크롤시 상하 블러 발생
      /* scttimeTable();
      $this.find('>ul').scroll(function(){
        scttimeTable();
      }); */

      function topCheck(t,motion){
        const target = $this.find('ul');
        t.parent().addClass('on').siblings().removeClass('on');
        
        let topH = target.offset().top;
        let offset = target.find('.on').offset().top - topH;
        let sct = target.scrollTop();
        let gap = parseInt(li.first().css('margin-top'));
        if(motion){
          //true : 최초로딩
          target.scrollTop(offset + sct - gap);
        }else{
          //false : 클릭
          target.stop().animate({scrollTop: offset + sct - gap}, 400);
        }
      }

      function scttimeTable(){
        let sct = $this.find('>ul').scrollTop();
        $this.addClass('before after');
        if($this.find('ul').scrollTop() == 0){// 스크롤이 0일 때
          //console.log('스크롤 처음');
          $this.removeClass('before');
        }
        if(sct + h >= totalHeight){
          //console.log('스크롤 끝');
          $this.removeClass('after');
        }
      }
    })
  } 
}


// 프로그램 목록
function fn_programList() {
  $(document).on('click','.programList.onClk li>a',function(){
    $(this).parent().addClass('on').siblings().removeClass('on');
  });
}


//레이어팝업
function fn_layerPop(){
  $(document).on('click','.openPop',function(){
    let href = $(this).attr('href');
    $(href).find('.popCon').scrollTop(0);
    $(href).addClass('on').removeClass('off');
    return false;
  });
  $(document).on('click','.popWrap .btnClosePop',function(){
    const $this = $(this);
    //$this.prev('.popCon').scrollTop(0);
    $this.closest('.popWrap').addClass('off').removeClass('on');
  });
}
